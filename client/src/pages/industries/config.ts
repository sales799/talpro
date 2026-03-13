import { LucideIcon, CreditCard, Monitor, Heart, ShoppingCart, GraduationCap, Building2 } from 'lucide-react';

// Icon map for industry pages (prevents importing entire lucide-react library)
export const industryIconMap: Record<string, LucideIcon> = {
  'CreditCard': CreditCard,
  'Monitor': Monitor,
  'Heart': Heart,
  'ShoppingCart': ShoppingCart,
  'GraduationCap': GraduationCap,
  'Building2': Building2,
};

// TypeScript interfaces for industry configuration
export interface Challenge {
  id: string;
  title: string;
  description: string;
}

export interface Solution {
  id: string;
  module: string;
  title: string;
  description: string;
  challengeIds: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
}

export interface IndustryConfig {
  title: string;
  shortName: string; // Short name for navigation display
  heroHeadline: string;
  heroSubheading: string;
  metaDescription: string;
  challenges: Challenge[];
  solutions: Solution[];
  services: Service[];
  relatedCaseStudyIds: number[];
  userGuideTitle: string;
  userGuideContent: string;
  ctaText: string;
  icon: string; // Lucide icon name
  tagline: string; // New tagline field for mega menu
}

export type IndustrySlug = 'fintech-financial-services' | 'media-entertainment-technology' | 'healthcare-medical-technology' | 'ecommerce-retail-solutions' | 'education-edtech-solutions';

export type IndustryConfigMap = Record<IndustrySlug, IndustryConfig>;

// Industry configurations — staffing & recruitment focus
export const industriesConfig: IndustryConfigMap = {
  'fintech-financial-services': {
    title: 'FinTech & Financial Services',
    shortName: 'FinTech',
    tagline: 'Compliance-Ready Tech Talent',
    heroHeadline: 'IT Staffing for FinTech & Financial Services',
    heroSubheading: 'Hire developers, architects and data engineers who understand PCI-DSS, real-time transactions and regulatory frameworks — pre-vetted and ready to start.',
    metaDescription: 'Specialist IT staffing for FinTech and financial services. Hire compliance-aware developers, security engineers and data specialists with 48-hour shortlists.',
    challenges: [
      {
        id: 'compliance-hiring',
        title: 'Compliance-Aware Hiring',
        description: 'FinTech teams need engineers who understand PCI-DSS, SOX, RBI guidelines and data-residency rules from day one — not after a costly compliance incident.'
      },
      {
        id: 'niche-skills',
        title: 'Niche Skill Scarcity',
        description: 'Roles like payment-gateway architects, fraud-ML engineers and core-banking specialists have tiny talent pools and aggressive counter-offers.'
      },
      {
        id: 'speed-vs-quality',
        title: 'Speed vs. Quality Trade-off',
        description: 'Fast-moving FinTech roadmaps demand quick ramp-up, but a mis-hire in a regulated environment carries outsized risk.'
      },
      {
        id: 'security-clearance',
        title: 'Security & Background Screening',
        description: 'Financial institutions require thorough background verification, credit checks and reference validation before granting system access.'
      },
      {
        id: 'retention-pressure',
        title: 'Retention in a Hot Market',
        description: 'FinTech engineers are heavily poached. Teams need hiring partners who benchmark compensation and position roles for long-term retention.'
      },
      {
        id: 'multi-geography',
        title: 'Multi-Geography Teams',
        description: 'Global FinTech firms need talent across time zones with consistent quality standards, local employment compliance and cross-border collaboration skills.'
      }
    ],
    solutions: [
      {
        id: 'compliance-screening',
        module: 'Compliance-First Screening',
        title: 'Regulatory-Aware Talent Vetting',
        description: 'Every candidate is screened for domain certifications (PCI-DSS, ISO 27001), background verified and assessed on regulatory awareness before shortlisting.',
        challengeIds: ['compliance-hiring', 'security-clearance']
      },
      {
        id: 'fintech-talent-pool',
        module: 'Pre-Built FinTech Pool',
        title: 'Ready-to-Deploy FinTech Specialists',
        description: 'Thousands of pre-vetted payment, blockchain, core-banking and risk-analytics professionals tagged and benchmarked for rapid shortlisting.',
        challengeIds: ['niche-skills', 'speed-vs-quality']
      },
      {
        id: 'retention-consulting',
        module: 'Retention & Comp Intel',
        title: 'Market-Benchmarked Hiring',
        description: 'Real-time compensation data and offer-strategy consulting so your offers land first time and new hires stay beyond the first year.',
        challengeIds: ['retention-pressure', 'niche-skills']
      },
      {
        id: 'global-delivery',
        module: 'Multi-Geo Staffing',
        title: 'Cross-Border Talent Delivery',
        description: 'Coordinated hiring across India, SEA and Middle East with local compliance, payroll and onboarding handled by TalPro.',
        challengeIds: ['multi-geography', 'compliance-hiring']
      }
    ],
    services: [
      {
        id: 'contract-fintech',
        title: 'Contract & Staff Augmentation',
        description: 'On-demand FinTech contractors for payment integrations, regulatory sprints, migration projects and security hardening.'
      },
      {
        id: 'permanent-fintech',
        title: 'Permanent Hiring',
        description: 'Full-time engineers, architects and data leaders for core-banking, lending, insurance-tech and wealth-management teams.'
      },
      {
        id: 'team-build-fintech',
        title: 'Team Build-Outs',
        description: 'End-to-end hiring for new FinTech products — from founding engineer through to QA, DevOps and product management.'
      },
      {
        id: 'executive-fintech',
        title: 'FinTech Leadership Search',
        description: 'CTO, VP Engineering, Head of Data and CISO searches for banks, NBFCs, payment firms and crypto startups.'
      }
    ],
    relatedCaseStudyIds: [1, 3],
    userGuideTitle: 'Hiring for FinTech: What Engineering Leaders Need to Know',
    userGuideContent: 'A practical guide to hiring compliant, high-performance tech talent for financial services — covering screening frameworks, compensation benchmarks and retention strategies.',
    ctaText: 'Hire FinTech Talent',
    icon: 'CreditCard'
  },

  'media-entertainment-technology': {
    title: 'Media & Entertainment Technology',
    shortName: 'Media',
    tagline: 'Creative Tech Talent, Fast',
    heroHeadline: 'IT Staffing for Media & Entertainment',
    heroSubheading: 'Hire streaming engineers, content-platform developers and immersive-experience specialists who ship fast in creative, deadline-driven environments.',
    metaDescription: 'IT staffing for media and entertainment companies. Hire streaming, OTT, gaming and content-platform engineers with rapid shortlists from TalPro.',
    challenges: [
      {
        id: 'creative-tech-blend',
        title: 'Creative + Technical Blend',
        description: 'Media teams need engineers who can collaborate with designers, producers and content creators — not just write code in isolation.'
      },
      {
        id: 'streaming-expertise',
        title: 'Streaming & CDN Expertise',
        description: 'Video engineers with OTT, adaptive bitrate, DRM and CDN experience are rare and concentrated in a handful of companies.'
      },
      {
        id: 'deadline-culture',
        title: 'Launch-Driven Deadlines',
        description: 'Content launches, live events and season drops create immovable deadlines where delayed hiring directly impacts revenue.'
      },
      {
        id: 'gaming-ar-vr',
        title: 'Gaming, AR & VR Talent',
        description: 'Immersive-experience roles (Unity, Unreal, WebXR) are among the hardest to fill due to cross-industry demand from gaming, retail and defence.'
      },
      {
        id: 'content-security',
        title: 'Content Security Awareness',
        description: 'Engineers handling pre-release content, DRM and anti-piracy systems need security mindsets and NDAs baked into the hiring process.'
      },
      {
        id: 'scale-burst-teams',
        title: 'Burst Hiring for Projects',
        description: 'Media companies often need to scale teams up for a production cycle and down afterward — requiring flexible engagement models.'
      }
    ],
    solutions: [
      {
        id: 'media-talent-pool',
        module: 'Media-Specialist Pool',
        title: 'Pre-Vetted Media Tech Talent',
        description: 'Streaming, OTT, CMS and content-platform engineers pre-assessed on video tech fundamentals, ready for shortlisting within 48 hours.',
        challengeIds: ['streaming-expertise', 'deadline-culture']
      },
      {
        id: 'creative-fit-screening',
        module: 'Creative-Fit Assessment',
        title: 'Beyond Technical Skills',
        description: 'Behavioral assessments designed to evaluate collaboration with creative teams, adaptability to deadline-driven culture and communication under pressure.',
        challengeIds: ['creative-tech-blend', 'deadline-culture']
      },
      {
        id: 'burst-staffing',
        module: 'Flex-Scale Staffing',
        title: 'Project-Based Team Scaling',
        description: 'Contract and pod models that let you staff up for launches and scale down between production cycles without long-term overhead.',
        challengeIds: ['scale-burst-teams', 'gaming-ar-vr']
      },
      {
        id: 'nda-security',
        module: 'Content Security Hiring',
        title: 'Security-Cleared Placements',
        description: 'NDA-ready hiring process with background checks and content-security awareness screening for pre-release and DRM roles.',
        challengeIds: ['content-security', 'streaming-expertise']
      }
    ],
    services: [
      {
        id: 'contract-media',
        title: 'Contract & Augmentation',
        description: 'On-demand video engineers, frontend developers and mobile specialists for streaming launches, app rebuilds and content migrations.'
      },
      {
        id: 'permanent-media',
        title: 'Permanent Placement',
        description: 'Full-time hires for OTT platforms, gaming studios, digital agencies and publishing-tech teams.'
      },
      {
        id: 'pod-media',
        title: 'Dedicated Engineering Pods',
        description: 'Self-managed squads (frontend + backend + QA + DevOps) for content platform builds, deployed as a unit.'
      },
      {
        id: 'leadership-media',
        title: 'Media Tech Leadership',
        description: 'VP Engineering, Director of Platform and Head of Product searches for media, OTT and gaming companies.'
      }
    ],
    relatedCaseStudyIds: [2, 4],
    userGuideTitle: 'Hiring Tech Talent for Media: A Practical Guide',
    userGuideContent: 'How to hire engineers who thrive in creative, deadline-driven environments — covering assessment strategies, flexible engagement models and retention in media tech.',
    ctaText: 'Hire Media Tech Talent',
    icon: 'Monitor'
  },

  'healthcare-medical-technology': {
    title: 'Healthcare & Medical Technology',
    shortName: 'Healthcare',
    tagline: 'HIPAA-Ready Tech Talent',
    heroHeadline: 'IT Staffing for Healthcare & MedTech',
    heroSubheading: 'Hire engineers who understand HIPAA, HL7/FHIR and clinical workflows — rigorously screened for regulated healthcare environments.',
    metaDescription: 'Healthcare IT staffing specialists. Hire HIPAA-aware developers, EHR integration engineers and health-data analysts. Pre-vetted, compliance-screened talent.',
    challenges: [
      {
        id: 'hipaa-awareness',
        title: 'HIPAA & Compliance Awareness',
        description: 'Every engineer touching patient data must understand HIPAA, HITECH and state-level privacy rules — non-compliance means seven-figure fines.'
      },
      {
        id: 'ehr-interop',
        title: 'EHR & Interoperability Skills',
        description: 'HL7, FHIR, DICOM and Epic/Cerner integration expertise is extremely niche, and most generalist recruiters cannot evaluate it.'
      },
      {
        id: 'credentialing-delays',
        title: 'Credentialing & Onboarding Delays',
        description: 'Healthcare orgs have lengthy credentialing, background-check and training processes that delay time-to-productivity if not managed proactively.'
      },
      {
        id: 'clinical-empathy',
        title: 'Clinical Workflow Understanding',
        description: 'The best health-tech engineers understand how clinicians actually work — not just the API spec but the human workflow behind it.'
      },
      {
        id: 'data-sensitivity',
        title: 'Data-Sensitivity Culture',
        description: 'Healthcare hires must demonstrate a security-first mindset — not just pass a checkbox but genuinely prioritize patient data protection.'
      },
      {
        id: 'telehealth-surge',
        title: 'Telehealth & Remote Monitoring Demand',
        description: 'Post-pandemic telehealth expansion created surging demand for video, IoT and RPM engineers that outstrips traditional healthcare-IT talent pools.'
      }
    ],
    solutions: [
      {
        id: 'compliance-vetting',
        module: 'Healthcare Compliance Screening',
        title: 'HIPAA-First Candidate Vetting',
        description: 'Structured compliance screening covering HIPAA awareness, data-handling practices and certification verification before any candidate reaches your desk.',
        challengeIds: ['hipaa-awareness', 'data-sensitivity']
      },
      {
        id: 'health-it-pool',
        module: 'Health-IT Talent Pool',
        title: 'Specialist Healthcare Engineers',
        description: 'Pre-vetted EHR developers, FHIR specialists, health-data analysts and telehealth engineers mapped by sub-domain and clearance level.',
        challengeIds: ['ehr-interop', 'telehealth-surge']
      },
      {
        id: 'credentialing-support',
        module: 'Credentialing Acceleration',
        title: 'Fast-Track Onboarding',
        description: 'Proactive document collection, background screening and compliance training coordination to reduce credentialing timelines by weeks.',
        challengeIds: ['credentialing-delays', 'hipaa-awareness']
      },
      {
        id: 'clinical-assessment',
        module: 'Clinical-Fit Assessment',
        title: 'Beyond Code: Clinical Empathy',
        description: 'Scenario-based assessments evaluating how engineers approach patient-safety edge cases and collaborate with clinical stakeholders.',
        challengeIds: ['clinical-empathy', 'data-sensitivity']
      }
    ],
    services: [
      {
        id: 'contract-health',
        title: 'Contract & Staff Augmentation',
        description: 'HIPAA-screened contractors for EHR integrations, telehealth builds, clinical-data pipelines and compliance remediation projects.'
      },
      {
        id: 'permanent-health',
        title: 'Permanent Placement',
        description: 'Full-time engineers, data scientists and product managers for hospitals, health-tech startups, payers and pharma-tech teams.'
      },
      {
        id: 'team-health',
        title: 'Healthcare Team Build-Outs',
        description: 'Complete engineering teams for new health products — from backend and frontend through to QA, DevOps and clinical informatics.'
      },
      {
        id: 'leadership-health',
        title: 'Health-Tech Leadership Search',
        description: 'CTO, VP Engineering, CISO and Chief Medical Informatics Officer searches for health systems and MedTech companies.'
      }
    ],
    relatedCaseStudyIds: [3, 5],
    userGuideTitle: 'Hiring Engineers for Healthcare: A Compliance-First Guide',
    userGuideContent: 'How to build HIPAA-compliant engineering teams — from screening frameworks and credentialing timelines to retention strategies in health-tech.',
    ctaText: 'Hire Healthcare IT Talent',
    icon: 'Heart'
  },

  'ecommerce-retail-solutions': {
    title: 'E-commerce & Retail Solutions',
    shortName: 'E-commerce',
    tagline: 'Scale-Ready Commerce Talent',
    heroHeadline: 'IT Staffing for E-commerce & Retail',
    heroSubheading: 'Hire engineers who have shipped at scale — Shopify, Magento, headless commerce, marketplace and logistics-tech specialists ready to drive revenue.',
    metaDescription: 'E-commerce IT staffing specialists. Hire Shopify, Magento, headless-commerce and marketplace engineers. Peak-season scaling and rapid shortlists.',
    challenges: [
      {
        id: 'peak-season',
        title: 'Peak-Season Scaling',
        description: 'Diwali, Black Friday and flash-sale events require burst hiring of performance engineers, QA and DevOps — weeks, not months, before go-live.'
      },
      {
        id: 'platform-diversity',
        title: 'Platform Fragmentation',
        description: 'Commerce stacks span Shopify, Magento, Salesforce Commerce Cloud, headless (Next.js + Medusa/Saleor) and custom — each needing specialist talent.'
      },
      {
        id: 'conversion-focus',
        title: 'Revenue-Driven Engineering',
        description: 'E-commerce teams need engineers who think in conversion rate, page speed and AOV — not just feature completion.'
      },
      {
        id: 'omnichannel-complexity',
        title: 'Omnichannel Integration',
        description: 'Unified commerce across web, app, POS and marketplaces requires engineers comfortable with inventory sync, OMS and payment orchestration.'
      },
      {
        id: 'logistics-tech',
        title: 'Logistics & Fulfilment Tech',
        description: 'Last-mile, warehouse-management and supply-chain visibility tools need engineers who understand operational logistics, not just APIs.'
      },
      {
        id: 'data-personalisation',
        title: 'Personalisation & Analytics',
        description: 'Product recommendations, search ranking and customer-data platforms require ML engineers and data analysts with e-commerce domain context.'
      }
    ],
    solutions: [
      {
        id: 'commerce-talent-pool',
        module: 'Commerce-Specialist Pool',
        title: 'Pre-Vetted E-commerce Engineers',
        description: 'Shopify, Magento, headless-commerce and marketplace developers pre-assessed on platform fundamentals and performance best practices.',
        challengeIds: ['platform-diversity', 'conversion-focus']
      },
      {
        id: 'peak-staffing',
        module: 'Peak-Season Staffing',
        title: 'Rapid Scale-Up for Sales Events',
        description: 'On-call bench of performance engineers, QA and DevOps professionals deployable within 1-2 weeks for peak-traffic preparation.',
        challengeIds: ['peak-season', 'conversion-focus']
      },
      {
        id: 'omni-expertise',
        module: 'Omnichannel Expertise',
        title: 'Unified Commerce Hiring',
        description: 'Engineers evaluated on cross-channel integration experience — OMS, POS, marketplace connectors and inventory sync systems.',
        challengeIds: ['omnichannel-complexity', 'logistics-tech']
      },
      {
        id: 'data-commerce',
        module: 'Commerce Data & ML',
        title: 'Analytics & Personalisation Talent',
        description: 'Data engineers, ML specialists and analytics leads with hands-on e-commerce experience in recommendations, search and CDP implementation.',
        challengeIds: ['data-personalisation', 'conversion-focus']
      }
    ],
    services: [
      {
        id: 'contract-ecom',
        title: 'Contract & Staff Augmentation',
        description: 'On-demand Shopify, Magento and headless-commerce developers for migrations, integrations, peak-season scaling and performance optimisation.'
      },
      {
        id: 'permanent-ecom',
        title: 'Permanent Placement',
        description: 'Full-time engineers, tech leads and product managers for D2C brands, marketplaces, quick-commerce and retail-tech companies.'
      },
      {
        id: 'pod-ecom',
        title: 'Commerce Engineering Pods',
        description: 'Self-managed squads for platform rebuilds, marketplace launches and omnichannel rollouts — frontend, backend, QA and DevOps as a unit.'
      },
      {
        id: 'leadership-ecom',
        title: 'E-commerce Tech Leadership',
        description: 'CTO, VP Engineering and Head of Product searches for D2C, marketplace and retail-tech companies scaling fast.'
      }
    ],
    relatedCaseStudyIds: [1, 2],
    userGuideTitle: 'Hiring Engineers for E-commerce: A Revenue-First Guide',
    userGuideContent: 'How to hire engineers who think in conversion rate and customer experience — covering platform-specific screening, peak-season strategies and retention.',
    ctaText: 'Hire E-commerce Talent',
    icon: 'ShoppingCart'
  },

  'education-edtech-solutions': {
    title: 'Education & EdTech Solutions',
    shortName: 'Education',
    tagline: 'EdTech Builders, On Demand',
    heroHeadline: 'IT Staffing for Education & EdTech',
    heroSubheading: 'Hire LMS developers, learning-experience engineers and education-data specialists who build products that actually improve learning outcomes.',
    metaDescription: 'EdTech IT staffing specialists. Hire LMS developers, learning engineers and education-platform specialists. Pre-vetted talent with 48-hour shortlists.',
    challenges: [
      {
        id: 'edtech-domain',
        title: 'EdTech Domain Knowledge',
        description: 'Engineers building learning platforms need to understand pedagogy, accessibility standards (WCAG) and learner engagement — not just CRUD features.'
      },
      {
        id: 'lms-expertise',
        title: 'LMS & Learning-Tool Expertise',
        description: 'Moodle, Canvas, custom LMS and xAPI/LTI integration skills are niche and rarely found through general tech recruitment channels.'
      },
      {
        id: 'budget-constraints',
        title: 'Budget-Sensitive Hiring',
        description: 'Education organisations and ed-tech startups often operate with tighter budgets, requiring cost-efficient staffing without compromising quality.'
      },
      {
        id: 'accessibility-mandate',
        title: 'Accessibility Compliance',
        description: 'Educational platforms must meet WCAG 2.1 AA, Section 508 and regional accessibility mandates — requiring engineers who build accessible-first.'
      },
      {
        id: 'content-engineering',
        title: 'Content & Media Engineering',
        description: 'Interactive content, video, gamification and adaptive-learning features need engineers who bridge media tech and learning science.'
      },
      {
        id: 'data-privacy-education',
        title: 'Student Data Privacy',
        description: 'FERPA, COPPA and regional student-data protection laws require privacy-aware engineering practices throughout the development lifecycle.'
      }
    ],
    solutions: [
      {
        id: 'edtech-talent-pool',
        module: 'EdTech-Specialist Pool',
        title: 'Pre-Vetted EdTech Engineers',
        description: 'LMS developers, learning-experience designers and education-data analysts pre-assessed on domain knowledge and accessibility best practices.',
        challengeIds: ['edtech-domain', 'lms-expertise']
      },
      {
        id: 'accessibility-screening',
        module: 'Accessibility-First Screening',
        title: 'WCAG-Aware Talent Vetting',
        description: 'Technical assessments that evaluate accessibility implementation skills, ARIA usage and assistive-technology testing as core competencies.',
        challengeIds: ['accessibility-mandate', 'edtech-domain']
      },
      {
        id: 'cost-efficient-models',
        module: 'Budget-Optimised Staffing',
        title: 'Flexible Cost Models',
        description: 'Contract, part-time and offshore-hybrid models designed for education-sector budgets without compromising on talent quality.',
        challengeIds: ['budget-constraints', 'lms-expertise']
      },
      {
        id: 'privacy-screening',
        module: 'Privacy Compliance',
        title: 'Student-Data Privacy Screening',
        description: 'FERPA and COPPA awareness evaluation built into the screening process for every education-sector placement.',
        challengeIds: ['data-privacy-education', 'edtech-domain']
      }
    ],
    services: [
      {
        id: 'contract-edtech',
        title: 'Contract & Staff Augmentation',
        description: 'On-demand LMS developers, frontend engineers and QA specialists for platform builds, migrations and feature sprints.'
      },
      {
        id: 'permanent-edtech',
        title: 'Permanent Placement',
        description: 'Full-time engineers, product managers and data analysts for EdTech startups, universities and corporate-learning platforms.'
      },
      {
        id: 'team-edtech',
        title: 'EdTech Team Build-Outs',
        description: 'Complete engineering teams for new learning products — from LMS backend through to gamification, video and analytics.'
      },
      {
        id: 'leadership-edtech',
        title: 'EdTech Leadership Search',
        description: 'CTO, VP Product and Head of Engineering searches for EdTech companies, university digital-transformation offices and L&D platforms.'
      }
    ],
    relatedCaseStudyIds: [4, 6],
    userGuideTitle: 'Hiring Engineers for EdTech: An Accessibility-First Guide',
    userGuideContent: 'How to build engineering teams for learning platforms — covering domain-specific screening, accessibility compliance and cost-efficient staffing models.',
    ctaText: 'Hire EdTech Talent',
    icon: 'GraduationCap'
  }
};

// Export individual configurations for easier access
export const fintechConfig = industriesConfig['fintech-financial-services'];
export const mediaConfig = industriesConfig['media-entertainment-technology'];
export const healthcareConfig = industriesConfig['healthcare-medical-technology'];
export const ecommerceConfig = industriesConfig['ecommerce-retail-solutions'];
export const educationConfig = industriesConfig['education-edtech-solutions'];

// Helper function to get industry config by slug
export const getIndustryConfig = (slug: IndustrySlug): IndustryConfig | undefined => {
  return industriesConfig[slug];
};

// Helper function to get all industry slugs
export const getIndustrySlugs = (): IndustrySlug[] => {
  return Object.keys(industriesConfig) as IndustrySlug[];
};

// Helper function to get all industries for navigation
export const getIndustriesForNavigation = () => {
  return Object.entries(industriesConfig).map(([slug, config]) => ({
    slug: slug as IndustrySlug,
    title: config.title,
    shortName: config.shortName,
    icon: config.icon,
    tagline: config.tagline
  }));
};
