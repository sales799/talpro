import type { Express } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { insertContactInquirySchema, jobsResponseSchema, jobSchema, webhookBlogPostSchema, insertBlogPostSchema, newsletterSubscribers } from "@shared/schema";
import { db } from "./db";
import { z, type ZodIssue } from "zod";
import * as cheerio from "cheerio";
import OpenAI from "openai";
import { generateAndPublish, selectTopic } from "./blog-generator";
import { requireAdmin } from "./security-middleware";
import { problemFromError, sendProblem, type ProblemErrors } from "./problem-details";

// Helper: escape XML entities for SVG generation
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper function to normalize employment types from various ATS formats
function normalizeEmploymentType(type?: string): string {
  if (!type) return 'full-time';
  
  const normalized = type.toLowerCase().trim();
  const mappings: Record<string, string> = {
    'full-time': 'full-time',
    'fulltime': 'full-time', 
    'full time': 'full-time',
    'permanent': 'full-time',
    'part-time': 'part-time',
    'parttime': 'part-time',
    'part time': 'part-time',
    'contract': 'contract',
    'contractor': 'contract',
    'temporary': 'contract',
    'temp': 'contract',
    'internship': 'internship',
    'intern': 'internship',
    'apprentice': 'internship'
  };
  
  return mappings[normalized] || 'full-time';
}

// Helper function to normalize experience levels from various ATS formats
function normalizeExperienceLevel(level?: string): string | undefined {
  if (!level) return undefined;
  
  const normalized = level.toLowerCase().trim();
  const mappings: Record<string, string> = {
    'entry': 'entry',
    'entry-level': 'entry',
    'entry level': 'entry',
    'junior': 'entry',
    'graduate': 'entry',
    'fresher': 'entry',
    'mid': 'mid',
    'mid-level': 'mid',
    'mid level': 'mid',
    'intermediate': 'mid',
    'experienced': 'mid',
    'senior': 'senior',
    'senior-level': 'senior',
    'senior level': 'senior',
    'lead': 'senior',
    'principal': 'senior',
    'executive': 'executive',
    'director': 'executive',
    'manager': 'executive',
    'head': 'executive'
  };
  
  return mappings[normalized];
}

// Function to scrape jobs from PyjamaHR
async function scrapePayjamaJobs(): Promise<any[]> {
  try {
    const url = 'https://app.pyjamahr.com/careers?company=CVPRO%20-%20Powered%20By%20TALPRO&company_uuid=EB02C8BFDF';
    console.log('Fetching jobs from PyjamaHR:', url);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    const jobs: any[] = [];
    
    // Look for job listings on the PyjamaHR page
    // Inspect the page structure and adjust selectors as needed
    $('.job-listing, .position-item, .career-item, [class*="job"], [class*="position"], [class*="career"]').each((index, element) => {
      const $job = $(element);
      
      // Extract job details with multiple selector attempts
      const title = $job.find('.job-title, .position-title, .title, h3, h4, .job-name').first().text().trim() ||
                   $job.find('[class*="title"]').first().text().trim();
      
      const location = $job.find('.location, .job-location, [class*="location"]').first().text().trim();
      const department = $job.find('.department, .team, [class*="department"], [class*="team"]').first().text().trim();
      const experience = $job.find('.experience, [class*="experience"], [class*="year"]').first().text().trim();
      
      // Try to find job ID from data attributes or href
      const jobId = $job.attr('data-id') || 
                   $job.find('a').attr('href')?.match(/\d+/)?.[0] ||
                   $job.find('[class*="id"]').text().match(/\d+/)?.[0] ||
                   `pj_${Date.now()}_${index}`;
      
      // Extract application URL
      const applicationUrl = $job.find('a').attr('href') || 
                           $job.find('[class*="apply"], [class*="view"]').attr('href') ||
                           `https://app.pyjamahr.com/careers/apply/${jobId}`;
      
      // Only include jobs with meaningful titles, not page headers
      if (title && title.length > 3 && title.length < 100 && 
          !title.toLowerCase().includes('cvpro') && 
          !title.toLowerCase().includes('careers at') &&
          !title.toLowerCase().includes('powered by')) {
        jobs.push({
          id: jobId,
          title: title,
          department: department || null,
          location: location || 'Remote',
          experience: experience || null,
          applicationUrl: applicationUrl.startsWith('http') ? applicationUrl : `https://app.pyjamahr.com${applicationUrl}`
        });
      }
    });
    
    // If no meaningful jobs found, try more specific patterns for real job titles
    if (jobs.length === 0) {
      // Try alternative selectors based on common job board patterns
      $('div, article, section').each((index, element) => {
        const $element = $(element);
        const text = $element.text();
        
        // Look for specific job titles mentioned in the requirements
        if (text.includes('Python Full-Stack') || text.includes('Talent Acquisition') || text.includes('Network Engineer')) {
          const title = $element.find('h1, h2, h3, h4, h5, h6').first().text().trim() || 
                       $element.children().first().text().trim();
          
          if (title && title.length > 5 && title.length < 100 && 
              !title.toLowerCase().includes('cvpro') && 
              !title.toLowerCase().includes('careers at')) {
            const jobId = title.includes('276665') ? '276665' : 
                         title.includes('268270') ? '268270' :
                         title.includes('262861') ? '262861' :
                         `scraped_${Date.now()}_${index}`;
            jobs.push({
              id: jobId,
              title: title,
              department: null,
              location: 'India',
              experience: null,
              applicationUrl: `https://app.pyjamahr.com/careers/apply/${jobId}`
            });
          }
        }
      });
    }
    
    // Filter out any remaining generic page content
    const validJobs = jobs.filter(job => 
      job.title && 
      job.title.length > 5 && 
      job.title.length < 150 &&
      !job.title.toLowerCase().includes('cvpro') &&
      !job.title.toLowerCase().includes('careers at') &&
      !job.title.toLowerCase().includes('powered by') &&
      !job.title.toLowerCase().includes('company')
    );
    
    console.log(`Scraped ${validJobs.length} valid jobs from PyjamaHR`);
    return validJobs;
    
  } catch (error) {
    console.error('Error scraping PyjamaHR jobs:', error);
    throw error;
  }
}

// Helper function to transform ATS job data to our schema
function transformJobData(job: any): any {
  return {
    id: job.id || job.job_id || `job_${Date.now()}_${Math.random()}`,
    title: job.title || job.job_title || 'Position Available',
    department: job.department || job.team || null,
    location: job.location || job.job_location || 'Remote',
    employmentType: normalizeEmploymentType(job.employment_type || job.job_type || job.type),
    experienceLevel: normalizeExperienceLevel(job.experience_level || job.seniority_level),
    description: job.description || job.job_description || '',
    requirements: job.requirements || job.qualifications || [],
    benefits: job.benefits || job.perks || [],
    salaryMin: job.salary_min || job.min_salary || null,
    salaryMax: job.salary_max || job.max_salary || null,
    salaryCurrency: job.salary_currency || job.currency || 'USD',
    remote: job.remote || job.is_remote || false,
    applicationUrl: job.application_url || job.apply_url || `${process.env.VITE_BASE_URL || 'https://nirantar.talpro.in'}/careers/apply/${job.id}`,
    postedDate: job.posted_date || job.created_at || new Date().toISOString(),
    updatedDate: job.updated_date || job.updated_at || null,
    isActive: job.is_active !== false && job.status !== 'closed'
  };
}

// Initialize OpenAI client with graceful fallback
let openai: OpenAI | null = null;
try {
  if (process.env.OPENAI_API_KEY) {
    // Using GPT-4o for blog content enhancement
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
} catch (error) {
  console.warn('OpenAI initialization failed:', error);
}

// Helper function to generate URL-friendly slugs
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with dashes
    .replace(/-+/g, '-') // Replace multiple dashes with single dash
    .trim()
    .substring(0, 100); // Limit length
}

// Helper function to ensure unique slug
async function generateUniqueSlug(title: string): Promise<string> {
  let baseSlug = generateSlug(title);
  let slug = baseSlug;
  let counter = 1;
  
  while (await storage.getBlogPostBySlug(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// Helper function to extract og:image from URL
async function extractImageFromUrl(url: string): Promise<{ imageUrl?: string; imageAlt?: string }> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Try to get og:image
    const ogImage = $('meta[property="og:image"]').attr('content') || 
                   $('meta[name="og:image"]').attr('content');
    
    // Try to get og:image:alt or fallback to og:title
    const ogImageAlt = $('meta[property="og:image:alt"]').attr('content') || 
                      $('meta[name="og:image:alt"]').attr('content') ||
                      $('meta[property="og:title"]').attr('content') || 
                      $('meta[name="og:title"]').attr('content') ||
                      $('title').text();
    
    return {
      imageUrl: ogImage,
      imageAlt: ogImageAlt || undefined
    };
  } catch (error) {
    console.error('Error extracting image from URL:', error);
    return {};
  }
}

// Helper function to process content with OpenAI (optional enhancement)
async function enhanceContentWithAI(content: string, title: string): Promise<{ content: string; excerpt?: string }> {
  if (!openai) {
    // Graceful fallback: create simple excerpt
    const excerpt = content.substring(0, 200).replace(/\n/g, ' ').trim() + '...';
    return { content, excerpt };
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a professional technical blog editor. Your task is to enhance the given content while maintaining its technical accuracy and tone. Also create a compelling excerpt (150-200 characters). Return JSON with 'content' and 'excerpt' fields."
        },
        {
          role: "user",
          content: `Title: ${title}\n\nContent: ${content}\n\nPlease enhance this content for better readability and engagement, and create an excerpt.`
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return {
      content: result.content || content,
      excerpt: result.excerpt || content.substring(0, 200).replace(/\n/g, ' ').trim() + '...'
    };
  } catch (error) {
    console.error('Error enhancing content with AI:', error);
    // Graceful fallback
    const excerpt = content.substring(0, 200).replace(/\n/g, ' ').trim() + '...';
    return { content, excerpt };
  }
}

// Helper function to send webhook notification for social media distribution
async function sendSocialMediaWebhook(blogPost: any): Promise<void> {
  const webhookUrl = process.env.SOCIAL_MEDIA_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('No social media webhook URL configured, skipping notification');
    return;
  }
  
  try {
    const payload = {
      type: 'blog_published',
      data: {
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        url: `${process.env.VITE_BASE_URL || 'https://nirantar.talpro.in'}/blog/${blogPost.slug}`,
        imageUrl: blogPost.imageUrl,
        tags: blogPost.tags,
        publishedAt: blogPost.publishedAt
      }
    };
    
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'TalPro-Blog-System/1.0'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`);
    }
    
    console.log('Social media webhook sent successfully');
  } catch (error) {
    console.error('Error sending social media webhook:', error);
    // Don't throw - webhook failure shouldn't prevent blog publishing
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ── Rate limiter (in-memory, per IP) ──────────────────────
  const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
  const RATE_LIMIT_MAX = 5;       // max submissions per window
  const RATE_LIMIT_WINDOW = 3600000; // 1 hour in ms

  function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);
    if (!entry || now > entry.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
      return false;
    }
    entry.count++;
    return entry.count > RATE_LIMIT_MAX;
  }

  const contactRateLimit = rateLimit({
    windowMs: 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => sendProblem(
      res,
      problemFromError(429, "Too many requests", "Too many contact submissions. Please try again shortly.", req.originalUrl),
    ),
  });

  function fieldErrors(issues: ZodIssue[]): ProblemErrors {
    return issues.reduce<ProblemErrors>((acc, issue) => {
      const key = issue.path.join(".") || "form";
      acc[key] = [...(acc[key] || []), issue.message];
      return acc;
    }, {});
  }

  // Contact form submission endpoint
  app.post("/api/contact", contactRateLimit, async (req, res) => {
    try {
      // Rate limiting — max 5 submissions per IP per hour
      const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown';
      if (isRateLimited(clientIp)) {
        return sendProblem(
          res,
          problemFromError(429, "Too many submissions", "Too many submissions. Please try again later.", req.originalUrl),
        );
      }

      // Server-side honeypot check
      if (req.body.website) {
        // Silently accept to avoid tipping off bots
        return res.status(201).json({
          success: true,
          message: "Thank you for your inquiry. We'll get back to you within 8 business hours.",
        });
      }

      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);

      if (process.env.NODE_ENV !== "test") {
        // Forward to LeadHunter N8N webhook (non-blocking)
        const leadhunterWebhookUrl = process.env.LEADHUNTER_WEBHOOK_URL || 'https://n8n.hcitalks.com/webhook/lead-capture';
        fetch(leadhunterWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            company: validatedData.company || 'Unknown',
            contact_name: `${validatedData.firstName} ${validatedData.lastName}`,
            email: validatedData.email,
            source: validatedData.source || 'website',
            utm_source: validatedData.utmSource || '',
            utm_medium: validatedData.utmMedium || '',
            utm_campaign: validatedData.utmCampaign || '',
            message: `Service: ${validatedData.service || 'Not specified'}. Message: ${validatedData.message}`,
          }),
        }).then(r => {
          if (r.ok) console.log('[leadhunter] Contact forwarded to N8N webhook');
          else console.warn(`[leadhunter] Webhook returned ${r.status}`);
        }).catch(err => {
          console.error('[leadhunter] Failed to forward to N8N:', err.message);
        });
      }

      res.status(201).json({
        success: true,
        message: "Thank you for your inquiry. We'll get back to you within 8 business hours.",
        id: inquiry.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return sendProblem(res, {
          type: "https://nirantar.talpro.in/problems/invalid-contact-submission",
          title: "Invalid contact submission",
          status: 400,
          detail: "Please correct the highlighted fields and try again.",
          instance: req.originalUrl,
          errors: fieldErrors(error.errors),
        });
      } else {
        console.error("Contact form submission error:", error);
        return sendProblem(
          res,
          problemFromError(500, "Contact submission failed", "An error occurred while processing your request. Please try again.", req.originalUrl),
        );
      }
    }
  });

  // Get contact inquiries (for admin use)
  app.get("/api/contact", requireAdmin, async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json(inquiries);
    } catch (error) {
      console.error("Error fetching contact inquiries:", error);
      res.status(500).json({ message: "Error fetching inquiries" });
    }
  });

  // ── Newsletter signup (persisted to DB) ───────────────────
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email, source } = req.body;
      if (!email || typeof email !== 'string' || !email.includes('@')) {
        return res.status(400).json({ success: false, message: "Valid email is required." });
      }
      const normalizedEmail = email.toLowerCase().trim();

      // Persist to database
      try {
        await db.insert(newsletterSubscribers).values({
          email: normalizedEmail,
          source: source || "website",
        });
      } catch (dbError: any) {
        // Handle unique constraint (already subscribed)
        if (dbError?.code === '23505' || dbError?.message?.includes('unique')) {
          return res.status(200).json({ success: true, message: "Already subscribed." });
        }
        throw dbError;
      }

      console.log(`Newsletter signup: ${normalizedEmail} (persisted to DB)`);
      res.status(201).json({ success: true, message: "Subscribed successfully." });
    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(500).json({ success: false, message: "An error occurred." });
    }
  });

  // In-memory cache for jobs data
  let jobsCache: { data: any; timestamp: number } | null = null;
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  // Jobs endpoint - fetch from Payjama ATS
  app.get("/api/jobs", async (req, res) => {
    try {
      const { 
        department, 
        location, 
        employmentType, 
        experienceLevel, 
        page = 1, 
        limit = 10, 
        search 
      } = req.query;

      // Check cache first
      if (jobsCache && Date.now() - jobsCache.timestamp < CACHE_DURATION) {
        let allJobs = jobsCache.data.jobs;

        // Apply consistent filtering logic to cached data
        let filteredJobs = allJobs.filter((job: any) => {
          // Department filter
          if (department && job.department && 
              !job.department.toLowerCase().includes((department as string).toLowerCase())) {
            return false;
          }
          
          // Location filter
          if (location && job.location && 
              !job.location.toLowerCase().includes((location as string).toLowerCase())) {
            return false;
          }
          
          // Employment type filter (exact match)
          if (employmentType && job.employmentType !== employmentType) {
            return false;
          }
          
          // Experience level filter (exact match)
          if (experienceLevel && job.experienceLevel !== experienceLevel) {
            return false;
          }
          
          // Search filter (title and description)
          if (search) {
            const searchLower = (search as string).toLowerCase();
            const titleMatch = job.title?.toLowerCase().includes(searchLower);
            const descMatch = job.description?.toLowerCase().includes(searchLower);
            if (!titleMatch && !descMatch) {
              return false;
            }
          }
          
          return true;
        });

        // Apply pagination
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const startIndex = (pageNum - 1) * limitNum;
        const paginatedJobs = filteredJobs.slice(startIndex, startIndex + limitNum);

        console.log(`Returning cached data: ${filteredJobs.length} jobs found, showing page ${pageNum}`);

        return res.json({
          jobs: paginatedJobs,
          total: filteredJobs.length,
          page: pageNum,
          limit: limitNum
        });
      }

      // NOTE: PyjamaHR is a React SPA that can't be scraped with Cheerio (returns empty HTML).
      // Using curated fallback job listings instead. These are real active mandates.
      // To restore scraping: uncomment the block below and fix with Puppeteer or PyjamaHR API.
      console.log("Loading curated job listings");

      let scrapedJobs: any[] = [];

      try {
        // Scraper disabled — PyjamaHR SPA returns no HTML to Cheerio
        // const rawJobs = await scrapePayjamaJobs();
        const rawJobs: any[] = []; // Skip scraping, go straight to fallback
        
        // Transform scraped jobs to match our schema
        scrapedJobs = rawJobs.map((job, index) => {
          // Parse experience from various formats
          let experienceLevel = undefined;
          if (job.experience) {
            const exp = job.experience.toLowerCase();
            if (exp.includes('15-25') || exp.includes('head') || exp.includes('senior')) {
              experienceLevel = 'senior';
            } else if (exp.includes('8-15') || exp.includes('7-15')) {
              experienceLevel = 'senior';
            } else if (exp.includes('3-8')) {
              experienceLevel = 'mid';
            } else {
              experienceLevel = 'mid';
            }
          }
          
          // Determine employment type based on title
          let employmentType = 'full-time';
          if (job.title && job.title.toLowerCase().includes('contract')) {
            employmentType = 'contract';
          }
          
          // Set department based on job title and department
          let department = job.department;
          if (!department && job.title) {
            const title = job.title.toLowerCase();
            if (title.includes('python') || title.includes('developer') || title.includes('engineer')) {
              department = 'Engineering';
            } else if (title.includes('talent') || title.includes('hr')) {
              department = 'HR';
            } else if (title.includes('network')) {
              department = 'IT';
            }
          }
          
          return {
            id: job.id,
            title: job.title,
            department: department,
            location: job.location || 'India',
            employmentType: employmentType,
            experienceLevel: experienceLevel,
            description: `Join our team as a ${job.title}. This position offers excellent opportunities for professional growth and development in a dynamic work environment.`,
            requirements: job.title.toLowerCase().includes('python') 
              ? ["Python", "Full Stack Development", "React", "Node.js", "Experience with web frameworks"]
              : job.title.toLowerCase().includes('talent')
              ? ["HR Management", "Talent Acquisition", "Recruiting", "People Management", "Strategic Planning"]
              : job.title.toLowerCase().includes('network')
              ? ["Network Administration", "Network Security", "Cisco", "TCP/IP", "Network Troubleshooting"]
              : ["Relevant experience", "Strong communication skills", "Problem solving", "Team collaboration"],
            benefits: ["Health Insurance", "Professional Development", "Flexible Work Arrangements", "Career Growth"],
            salaryMin: null,
            salaryMax: null,
            salaryCurrency: "INR",
            remote: job.location && (job.location.toLowerCase().includes('remote') || job.location.toLowerCase().includes('hybrid')),
            applicationUrl: job.applicationUrl,
            postedDate: new Date().toISOString(),
            updatedDate: null,
            isActive: true
          };
        });
        
        console.log(`Successfully transformed ${scrapedJobs.length} jobs from PyjamaHR`);
        
      } catch (error) {
        console.error('Failed to scrape PyjamaHR jobs:', error);
        scrapedJobs = []; // Reset to empty array
      }
      
      // If no valid jobs were scraped, return an honest empty state. We do not
      // fabricate listings without CEO/HR-supplied live mandates.
      if (scrapedJobs.length === 0) {
        console.log('No valid jobs scraped; returning empty jobs response');
        // Clear cache to force fresh data
        jobsCache = null;
        scrapedJobs = [];
      }
      
      // Apply filters to scraped data
      let filteredJobs = scrapedJobs.filter((job) => {
        if (department && job.department && 
            !job.department.toLowerCase().includes((department as string).toLowerCase())) {
          return false;
        }
        
        if (location && job.location && 
            !job.location.toLowerCase().includes((location as string).toLowerCase())) {
          return false;
        }
        
        if (employmentType && job.employmentType !== employmentType) {
          return false;
        }
        
        if (experienceLevel && job.experienceLevel !== experienceLevel) {
          return false;
        }
        
        if (search) {
          const searchLower = (search as string).toLowerCase();
          const titleMatch = job.title?.toLowerCase().includes(searchLower);
          const descMatch = job.description?.toLowerCase().includes(searchLower);
          if (!titleMatch && !descMatch) {
            return false;
          }
        }
        
        return true;
      });

      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 20;
      const startIndex = (pageNum - 1) * limitNum;
      const paginatedJobs = filteredJobs.slice(startIndex, startIndex + limitNum);

      const jobsData = {
        jobs: paginatedJobs,
        total: filteredJobs.length,
        page: pageNum,
        limit: limitNum
      };

      // Cache the scraped data
      jobsCache = {
        data: jobsData,
        timestamp: Date.now()
      };

      console.log(`Returning ${filteredJobs.length} jobs from PyjamaHR`);
      return res.json(jobsData);

    } catch (error) {
      console.error("Error fetching jobs:", error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      
      // Return cached data if available during errors
      if (jobsCache) {
        console.log("Returning cached data due to fetch error");
        return res.json(jobsCache.data);
      }
      
      res.status(500).json({ 
        message: "Unable to fetch job listings at this time",
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : "Internal server error"
      });
    }
  });

  // Job detail endpoint - Using mock data
  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if we have the job in cache
      if (jobsCache) {
        const job = jobsCache.data.jobs.find((j: any) => j.id === id);
        if (job) {
          return res.json(job);
        }
      }

      // If not found, return 404
      return res.status(404).json({ 
        message: "Job not found" 
      });
      
    } catch (error) {
      console.error("Error fetching job detail:", error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
      res.status(500).json({ 
        message: "Unable to fetch job details" 
      });
    }
  });

  // Blog Routes - Public endpoints
  
  // Get published blog posts with pagination and filtering
  app.get("/api/blog/posts", async (req, res) => {
    try {
      const { 
        tags, 
        page = 1, 
        limit = 10,
        search 
      } = req.query;

      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 20;
      const offset = (pageNum - 1) * limitNum;

      // Parse tags if provided
      const tagsArray = tags ? (Array.isArray(tags) ? tags : [tags]) as string[] : undefined;

      const filters = {
        published: true, // Only get published posts
        tags: tagsArray,
        limit: limitNum,
        offset: offset
      };

      let posts = await storage.getBlogPosts(filters);

      // Apply search filter if provided
      if (search) {
        const searchTerm = (search as string).toLowerCase();
        posts = posts.filter(post => 
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      }

      res.json({
        posts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: posts.length
        }
      });
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  });

  // Get a specific published blog post by slug
  app.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const post = await storage.getBlogPostBySlug(slug);
      
      if (!post || !post.publishedAt) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Error fetching blog post" });
    }
  });

  // Automated blog publishing webhook endpoint
  app.post("/api/blog/webhook", async (req, res) => {
    try {
      // Validate webhook shared secret
      const secret = req.headers["x-webhook-secret"] || req.query.secret;
      const expectedSecret = process.env.BLOG_WEBHOOK_SECRET;
      if (expectedSecret && secret !== expectedSecret) {
        return res.status(401).json({ error: "Invalid webhook secret" });
      }

      const validatedData = webhookBlogPostSchema.parse(req.body);
      console.log('Received blog webhook:', { title: validatedData.title, source_url: validatedData.source_url });

      // Generate unique slug
      const slug = await generateUniqueSlug(validatedData.title);

      // Extract image from source URL if provided
      let imageUrl = validatedData.image_url;
      let imageAlt = validatedData.image_alt;
      
      if (validatedData.source_url && !imageUrl) {
        console.log('Extracting image from source URL...');
        const extracted = await extractImageFromUrl(validatedData.source_url);
        imageUrl = extracted.imageUrl;
        imageAlt = extracted.imageAlt;
      }

      // Use default hero image if no image found
      if (!imageUrl) {
        imageUrl = '/hero-default.jpg'; // Default hero image path
        imageAlt = validatedData.title;
      }

      // Enhance content with AI if available, or create simple excerpt
      console.log('Processing content...');
      const { content, excerpt } = await enhanceContentWithAI(
        validatedData.content_markdown, 
        validatedData.title
      );

      // Estimate reading time (~200 words per minute)
      const wordCount = content.replace(/<[^>]+>/g, '').split(/\s+/).length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      // Create blog post data
      const blogPostData = {
        title: validatedData.title,
        slug,
        content,
        excerpt: validatedData.excerpt || excerpt || content.substring(0, 200).replace(/\n/g, ' ').trim() + '...',
        imageUrl,
        imageAlt,
        tags: validatedData.tags || [],
        publishedAt: new Date(),
        sourceUrl: validatedData.source_url,
        author: "TalPro Editorial",
        authorRole: "Market Intelligence Team",
        readingTime,
        generationSource: "webhook" as const,
      };

      // Save the blog post
      const createdPost = await storage.createBlogPost(blogPostData);
      console.log('Blog post created:', { id: createdPost.id, slug: createdPost.slug });

      // Send social media webhook notification
      console.log('Sending social media webhook...');
      await sendSocialMediaWebhook(createdPost);

      res.status(201).json({
        success: true,
        message: "Blog post published successfully",
        post: {
          id: createdPost.id,
          title: createdPost.title,
          slug: createdPost.slug,
          publishedAt: createdPost.publishedAt,
          url: `${process.env.VITE_BASE_URL || 'https://nirantar.talpro.in'}/blog/${createdPost.slug}`
        }
      });
    } catch (error) {
      console.error("Blog webhook error:", error);
      
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid webhook data",
          errors: error.errors
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Error publishing blog post",
          error: process.env.NODE_ENV === 'development' ? (error as Error).message : "Internal server error"
        });
      }
    }
  });

  // Blog Admin Routes - For content management
  
  // Get all blog posts including drafts (admin)
  app.get("/api/blog/admin/posts", requireAdmin, async (req, res) => {
    try {
      const { published, page = 1, limit = 20 } = req.query;
      
      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 20;
      const offset = (pageNum - 1) * limitNum;

      const filters = {
        published: published === 'true' ? true : published === 'false' ? false : undefined,
        limit: limitNum,
        offset: offset
      };

      const posts = await storage.getBlogPosts(filters);

      res.json({
        posts,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total: posts.length
        }
      });
    } catch (error) {
      console.error("Error fetching admin blog posts:", error);
      res.status(500).json({ message: "Error fetching blog posts" });
    }
  });

  // Get blog post by ID (admin)
  app.get("/api/blog/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const post = await storage.getBlogPost(id);
      
      if (!post) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.json(post);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ message: "Error fetching blog post" });
    }
  });

  // Update blog post (admin)
  app.put("/api/blog/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Validate that the post exists
      const existingPost = await storage.getBlogPost(id);
      if (!existingPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      // If slug is being updated, ensure it's unique
      if (updates.slug && updates.slug !== existingPost.slug) {
        const existingSlug = await storage.getBlogPostBySlug(updates.slug);
        if (existingSlug && existingSlug.id !== id) {
          return res.status(400).json({ message: "Slug already exists" });
        }
      }

      const updatedPost = await storage.updateBlogPost(id, updates);
      
      if (!updatedPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.json({
        success: true,
        message: "Blog post updated successfully",
        post: updatedPost
      });
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: "Error updating blog post" });
    }
  });

  // Delete blog post (admin)
  app.delete("/api/blog/admin/posts/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      
      const deleted = await storage.deleteBlogPost(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Blog post not found" });
      }

      res.json({
        success: true,
        message: "Blog post deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: "Error deleting blog post" });
    }
  });

  // ── Blog post count (for frontend pagination) ──
  app.get("/api/blog/count", async (_req, res) => {
    try {
      const posts = await storage.getBlogPosts({ published: true });
      res.json({ total: posts.length });
    } catch (error) {
      console.error("Error counting blog posts:", error);
      res.status(500).json({ message: "Error counting blog posts" });
    }
  });

  // ── Seed static blog posts into database ──
  app.post("/api/blog/seed", requireAdmin, async (_req, res) => {
    try {
      // Check if posts already exist
      const existing = await storage.getBlogPosts({ published: true });
      if (existing.length > 0) {
        return res.json({
          success: true,
          message: `Database already has ${existing.length} posts. Skipping seed.`,
          count: existing.length,
        });
      }

      // Import static posts and insert them
      const seedPosts = [
        {
          title: "The State of IT Hiring in India: 2026 Market Report",
          slug: "state-of-it-hiring-india-2026",
          excerpt: "An in-depth look at India's IT talent market — which skills are surging, how compensation is shifting, and what hiring managers need to know to compete for top engineers.",
          category: "Market Intelligence",
          tags: ["Hiring Trends", "Salary Data", "India IT Market", "2026"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 8,
          featured: true,
          generationSource: "manual",
          publishedAt: new Date("2026-03-10"),
        },
        {
          title: "Contract vs Permanent: Which IT Staffing Model Is Right for Your Team?",
          slug: "contract-vs-permanent-staffing",
          excerpt: "A practical comparison of contract staffing, permanent hiring, and contract-to-hire models — with real cost analysis and decision frameworks for Indian IT teams.",
          category: "Hiring Strategy",
          tags: ["Contract Staffing", "Permanent Hiring", "C2H", "Cost Analysis"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 7,
          featured: false,
          generationSource: "manual",
          publishedAt: new Date("2026-03-08"),
        },
        {
          title: "How to Set Up a GCC in India: A Step-by-Step Guide",
          slug: "gcc-setup-guide-india",
          excerpt: "A practical playbook for US and European companies establishing Global Capability Centers in India — from entity setup to hiring your first 25 engineers.",
          category: "GCC Playbook",
          tags: ["GCC", "Global Capability Center", "India Operations", "Offshore"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 10,
          featured: true,
          generationSource: "manual",
          publishedAt: new Date("2026-03-05"),
        },
        {
          title: "5 Signs Your IT Recruitment Process Is Broken (And How to Fix It)",
          slug: "signs-it-recruitment-process-broken",
          excerpt: "If your engineering roles take 60+ days to fill, your offer acceptance rate is below 80%, or your hiring managers are frustrated — your process needs fixing. Here's how.",
          category: "Hiring Strategy",
          tags: ["Recruitment Process", "Time to Hire", "Offer Acceptance", "Best Practices"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 6,
          featured: false,
          generationSource: "manual",
          publishedAt: new Date("2026-03-01"),
        },
        {
          title: "India's Top Tech Hubs: City-by-City Talent Guide",
          slug: "india-top-tech-hubs-talent-guide",
          excerpt: "A recruiter's guide to hiring in Bangalore, Hyderabad, Pune, Chennai, and NCR — talent pool sizes, salary benchmarks, strengths, and what each city does best.",
          category: "Market Intelligence",
          tags: ["Bangalore", "Hyderabad", "Pune", "Chennai", "NCR", "Talent Pool"],
          author: "TalPro Research",
          authorRole: "Market Intelligence Team",
          readingTime: 9,
          featured: false,
          generationSource: "manual",
          publishedAt: new Date("2026-02-25"),
        },
      ];

      // We need to include content for the seed posts
      // For now, insert with placeholder content — the full content comes from blogPosts.ts on the client
      // The client will merge DB posts with static content during the transition period
      let seeded = 0;
      for (const post of seedPosts) {
        await storage.createBlogPost({
          ...post,
          content: `<p>${post.excerpt}</p><p>Full article content will be populated during the next deployment.</p>`,
        });
        seeded++;
      }

      res.status(201).json({
        success: true,
        message: `Seeded ${seeded} blog posts successfully`,
        count: seeded,
      });
    } catch (error) {
      console.error("Error seeding blog posts:", error);
      res.status(500).json({ message: "Error seeding blog posts" });
    }
  });

  // ── Auto Blog Generator — trigger content generation + publish ──
  app.post("/api/blog/generate", requireAdmin, async (req, res) => {
    try {
      const { topic, pillar, dayIndex, dryRun, apiKey } = req.body || {};

      // Optional: simple bearer token auth for external callers (N8N, cron)
      const authHeader = req.headers.authorization;
      const expectedToken = process.env.BLOG_GENERATE_TOKEN;
      if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
        return res.status(401).json({ message: "Unauthorized — provide valid Bearer token" });
      }

      console.log('[BlogGen] Generate request received:', { topic, pillar, dayIndex, dryRun });

      const result = await generateAndPublish({
        topic,
        pillar,
        dayIndex,
        dryRun: dryRun === true,
        apiKey: apiKey || process.env.ANTHROPIC_API_KEY,
        publishUrl: `http://localhost:${process.env.PORT || 5000}/api/blog/webhook`,
      });

      res.json(result);
    } catch (error) {
      console.error("[BlogGen] Error:", error);
      res.status(500).json({
        success: false,
        message: "Error generating blog post",
        error: process.env.NODE_ENV === 'development' ? (error as Error).message : "Internal error",
      });
    }
  });

  // ── Blog topic preview (returns next topic without generating) ──
  app.get("/api/blog/next-topic", (_req, res) => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    const topic = selectTopic(dayOfYear);
    res.json({ ...topic, dayIndex: dayOfYear });
  });

  // ── AI Chatbot for lead qualification ──
  app.post("/api/chatbot", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Messages required" });
      }

      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return res.status(503).json({ reply: "Our AI assistant is being set up. Please reach us at hello@talproindia.com or call 080-4094-8407." });
      }

      const Anthropic = (await import("@anthropic-ai/sdk")).default;
      const client = new Anthropic({ apiKey });

      const systemPrompt = `You are TalPro's AI hiring assistant on talproindia.com. TalPro is India's specialist IT staffing firm with 15+ years experience, 500+ placements, and 90%+ client retention.

Your role: Qualify inbound hiring leads in a friendly, concise conversational style.

RULES:
- Keep responses SHORT (2-4 sentences max). Be warm but professional.
- Ask ONE qualifying question at a time to understand their need.
- Gather: company type (startup/enterprise/GCC), role(s) needed, tech stack, urgency, team size.
- After 2-3 exchanges, recommend a specific TalPro service and suggest they book a call or fill the contact form.
- If they're a job seeker, warmly redirect them to /for-candidates or /careers.
- Mention specific TalPro strengths: 48-hour shortlists, pre-vetted talent, GCC expertise.
- Never invent facts about TalPro. Only reference services that exist: IT Staffing, Engineering Staffing, Executive Search, GCC Accelerator, Contract Staffing, RPO.
- If asked about salary, point them to /salary-guide or /salary-calculator.`;

      const anthropicMessages = messages.map((m: any) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }));

      const response = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system: systemPrompt,
        messages: anthropicMessages,
      });

      const reply = response.content[0]?.type === 'text'
        ? response.content[0].text
        : "I'd love to help! Could you tell me more about the role you're looking to fill?";

      res.json({ reply });
    } catch (error) {
      console.error("Chatbot error:", error);
      res.status(500).json({ reply: "I'm having a moment — please try again or email hello@talproindia.com." });
    }
  });

  // ── Static OG image + logo fallbacks (redirect to dynamic generator) ──────────
  app.get("/og-image.png", (_req, res) => {
    res.redirect(301, "/api/og?title=India%27s+Specialist+IT+Staffing+Partner&subtitle=Pre-vetted+developers+%C2%B7+48hr+first+shortlist&type=page");
  });
  app.get("/logo.png", (_req, res) => {
    res.header("Content-Type", "image/svg+xml");
    res.header("Cache-Control", "public, max-age=604800");
    res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="50" viewBox="0 0 200 50">
  <rect width="200" height="50" rx="8" fill="hsl(222,47%,11%)"/>
  <text x="14" y="35" font-family="Inter,system-ui,sans-serif" font-weight="800" font-size="28" fill="hsl(38,92%,50%)">TALPRO</text>
</svg>`);
  });

  // ── Dynamic OG Image Generator ──────────────────────────────────────────────────
  // Generates branded SVG images per page for social sharing (LinkedIn, X, WhatsApp)
  // Usage: /api/og?title=Your+Title&subtitle=Category&type=blog
  app.get("/api/og", (req, res) => {
    const title = (req.query.title as string || "TalPro India").slice(0, 80);
    const subtitle = (req.query.subtitle as string || "India's Specialist IT Staffing Partner").slice(0, 60);
    const type = (req.query.type as string || "page");

    // Brand colors
    const bgGradient = type === 'blog'
      ? 'url(#blogGrad)'
      : type === 'salary'
        ? 'url(#salaryGrad)'
        : 'url(#defaultGrad)';

    const badge = type === 'blog' ? '📝 INSIGHTS'
      : type === 'salary' ? '💰 SALARY GUIDE 2026'
      : type === 'case-study' ? '📊 CASE STUDY'
      : type === 'gcc' ? '🏢 GCC ACCELERATOR'
      : '🚀 TALPRO INDIA';

    // Word-wrap title (approx 30 chars per line for 1200px width at 48px font)
    const words = title.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      if ((currentLine + ' ' + word).trim().length > 32) {
        lines.push(currentLine.trim());
        currentLine = word;
      } else {
        currentLine = currentLine ? currentLine + ' ' + word : word;
      }
    }
    if (currentLine.trim()) lines.push(currentLine.trim());

    const titleLines = lines.slice(0, 3).map((line, i) =>
      `<text x="80" y="${320 + i * 60}" font-family="system-ui, -apple-system, sans-serif" font-size="48" font-weight="700" fill="white">${escapeXml(line)}</text>`
    ).join('\n      ');

    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="defaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#16213e"/>
    </linearGradient>
    <linearGradient id="blogGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
    <linearGradient id="salaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a2e"/>
      <stop offset="100%" style="stop-color:#2d1b4e"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="1200" height="630" fill="${bgGradient}"/>
  <!-- Gold accent bar -->
  <rect x="0" y="0" width="1200" height="6" fill="#D4AF37"/>
  <!-- Badge -->
  <rect x="80" y="220" width="${badge.length * 14 + 32}" height="36" rx="18" fill="#D4AF37" opacity="0.9"/>
  <text x="96" y="244" font-family="system-ui, sans-serif" font-size="16" font-weight="600" fill="#1a1a2e">${escapeXml(badge)}</text>
  <!-- Title -->
  ${titleLines}
  <!-- Subtitle -->
  <text x="80" y="${320 + lines.slice(0, 3).length * 60 + 20}" font-family="system-ui, sans-serif" font-size="22" fill="#94a3b8">${escapeXml(subtitle)}</text>
  <!-- Footer bar -->
  <rect x="0" y="570" width="1200" height="60" fill="rgba(0,0,0,0.3)"/>
  <text x="80" y="606" font-family="system-ui, sans-serif" font-size="20" font-weight="600" fill="#D4AF37">TALPRO</text>
  <text x="185" y="606" font-family="system-ui, sans-serif" font-size="18" fill="#64748b">talproindia.com</text>
  <!-- Decorative dots -->
  <circle cx="1080" cy="120" r="60" fill="#D4AF37" opacity="0.08"/>
  <circle cx="1120" cy="180" r="40" fill="#D4AF37" opacity="0.05"/>
</svg>`;

    res.header("Content-Type", "image/svg+xml");
    res.header("Cache-Control", "public, max-age=86400, s-maxage=604800");
    res.send(svg);
  });

  // ── RSS Feed for blog syndication to social tools (Buffer, Hootsuite, LinkedIn) ──
  app.get("/api/rss", async (_req, res) => {
    try {
      const baseUrl = "https://nirantar.talpro.in";
      const posts = await storage.getBlogPosts();
      const items = (Array.isArray(posts) ? posts : [])
        .slice(0, 50)
        .map((post: any) => {
          const pubDate = post.publishedAt || post.published_at || post.createdAt || post.created_at;
          return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${pubDate ? new Date(pubDate).toUTCString() : new Date().toUTCString()}</pubDate>
      <category>${post.category || 'Insights'}</category>
    </item>`;
        })
        .join("\n");

      const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TalPro India — IT Staffing Insights</title>
    <link>${baseUrl}/blog</link>
    <description>Hiring trends, salary data, and staffing insights from India's specialist IT staffing partner.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/api/rss" rel="self" type="application/rss+xml"/>
    <image>
      <url>${baseUrl}/logo.png</url>
      <title>TalPro India</title>
      <link>${baseUrl}</link>
    </image>
${items}
  </channel>
</rss>`;

      res.header("Content-Type", "application/rss+xml; charset=utf-8");
      res.send(rss);
    } catch (error) {
      console.error("RSS feed error:", error);
      res.status(500).send("Error generating RSS feed");
    }
  });

  // ── robots.txt ──
  app.get("/robots.txt", (_req, res) => {
    const robotsTxt = `# TalPro India — robots.txt
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Allow: /api/jobs
Allow: /api/blog/posts

Disallow: /.env
Disallow: /.git
Disallow: /wp-admin

Sitemap: https://nirantar.talpro.in/sitemap.xml

User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Crawl-delay: 10

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: BLEXBot
Disallow: /
`;
    res.type("text/plain").send(robotsTxt);
  });

  // ── Dynamic Sitemap with blog posts ──
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const baseUrl = "https://nirantar.talpro.in";
      const today = new Date().toISOString().split("T")[0];

      // Static pages
      const staticPages = [
        { loc: "/", changefreq: "weekly", priority: "1.0" },
        { loc: "/about", changefreq: "monthly", priority: "0.8" },
        { loc: "/contact", changefreq: "monthly", priority: "0.8" },
        { loc: "/how-we-work", changefreq: "monthly", priority: "0.8" },
        { loc: "/services", changefreq: "weekly", priority: "0.9" },
        { loc: "/industries", changefreq: "weekly", priority: "0.9" },
        { loc: "/gcc-hub", changefreq: "weekly", priority: "0.9" },
        { loc: "/careers", changefreq: "weekly", priority: "0.7" },
        { loc: "/blog", changefreq: "daily", priority: "0.7" },
        { loc: "/case-studies", changefreq: "monthly", priority: "0.7" },
        { loc: "/salary-guide", changefreq: "monthly", priority: "0.8" },
        { loc: "/salary-calculator", changefreq: "monthly", priority: "0.7" },
        { loc: "/staffing-quiz", changefreq: "monthly", priority: "0.7" },
        { loc: "/for-candidates", changefreq: "monthly", priority: "0.7" },
        { loc: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
        { loc: "/terms-of-service", changefreq: "yearly", priority: "0.3" },
      ];

      // Service pages
      const serviceSlugs = [
        "it-staffing", "engineering-staffing", "sales-staffing",
        "direct-hiring-functions", "direct-hiring-it", "executive-search",
        "gcc-accelerator", "cloud-devops-staffing", "data-ai-staffing",
        "sap-enterprise-staffing", "cybersecurity-staffing",
      ];
      const servicePages = serviceSlugs.map((s) => ({
        loc: `/services/${s}`, changefreq: "weekly", priority: "0.8",
      }));

      // Industry pages
      const industrySlugs = [
        "fintech-financial-services", "media-entertainment-technology",
        "healthcare-medical-technology", "ecommerce-retail-solutions",
        "education-edtech-solutions",
      ];
      const industryPages = industrySlugs.map((s) => ({
        loc: `/industries/${s}`, changefreq: "weekly", priority: "0.8",
      }));

      // Location pages
      const locationSlugs = [
        "bengaluru", "hyderabad", "pune", "chennai", "mumbai", "delhi-ncr",
      ];
      const locationPages = locationSlugs.map((s) => ({
        loc: `/locations/${s}`, changefreq: "weekly", priority: "0.8",
      }));

      const allStaticPages = [...staticPages, ...servicePages, ...industryPages, ...locationPages];

      // Fetch published blog posts from DB
      let blogPosts: { slug: string; publishedAt: Date | null }[] = [];
      try {
        blogPosts = await storage.getBlogPosts({ published: true, limit: 500 });
      } catch {
        // If DB fails, continue with static-only sitemap
      }

      const staticEntries = allStaticPages
        .map(
          (p) => `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
        )
        .join("\n");

      const blogEntries = blogPosts
        .filter((p) => p.publishedAt)
        .map(
          (p) => `  <url>
    <loc>${baseUrl}/blog/${p.slug}</loc>
    <lastmod>${p.publishedAt ? new Date(p.publishedAt).toISOString().split("T")[0] : today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
        )
        .join("\n");

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${blogEntries}
</urlset>`;

      res.header("Content-Type", "application/xml");
      res.send(xml);
    } catch (error) {
      console.error("Error generating sitemap:", error);
      res.status(500).send("Error generating sitemap");
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
