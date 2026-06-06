/**
 * TalPro India — Email Notifications (Cycle 1)
 *
 * SendGrid integration for:
 * 1. Contact form submissions → notify Bhaskar + team
 * 2. Newsletter signup confirmations → subscriber
 * 3. Job application alerts (future)
 *
 * Falls back gracefully if SENDGRID_API_KEY is not set.
 */

import sgMail from "@sendgrid/mail";

// ── Configuration ──────────────────────────────────────────────

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@talproindia.com";
const FROM_NAME = "TalPro India";
const NOTIFY_EMAILS = (process.env.NOTIFY_EMAILS || "bhaskar@talproindia.com").split(",").map((e) => e.trim());

let emailEnabled = false;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
  emailEnabled = true;
  console.log("[email] SendGrid configured. Notifications will be sent to:", NOTIFY_EMAILS.join(", "));
} else {
  console.log("[email] SENDGRID_API_KEY not set. Email notifications disabled (will log only).");
}

// ── Email Templates ────────────────────────────────────────────

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

function buildContactNotificationHtml(data: ContactFormData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 24px; }
    .header h1 { margin: 0; font-size: 20px; }
    .header p { margin: 4px 0 0; opacity: 0.9; font-size: 14px; }
    .body { padding: 24px; }
    .field { margin-bottom: 16px; }
    .field-label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .field-value { font-size: 15px; color: #1f2937; }
    .message-box { background: #f9fafb; border-left: 3px solid #3b82f6; padding: 16px; border-radius: 0 4px 4px 0; margin: 16px 0; }
    .footer { padding: 16px 24px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; }
    .cta { display: inline-block; background: #1e40af; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Inquiry</h1>
      <p>Someone just filled out the contact form on talproindia.com</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Name</div>
        <div class="field-value">${data.firstName} ${data.lastName}</div>
      </div>
      <div class="field">
        <div class="field-label">Email</div>
        <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      ${data.company ? `<div class="field"><div class="field-label">Company</div><div class="field-value">${data.company}</div></div>` : ""}
      ${data.service ? `<div class="field"><div class="field-label">Service Interested In</div><div class="field-value">${data.service}</div></div>` : ""}
      <div class="field">
        <div class="field-label">Message</div>
        <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
      </div>
      <a href="mailto:${data.email}?subject=Re: Your inquiry to TalPro India&body=Hi ${data.firstName}," class="cta">Reply to ${data.firstName}</a>
    </div>
    <div class="footer">
      This notification was sent by TalPro India's contact form system.
      <a href="https://talproindia.com/api/contact">View all inquiries</a>
    </div>
  </div>
</body>
</html>`;
}

function buildNewsletterWelcomeHtml(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .body { padding: 32px 24px; text-align: center; }
    .body p { font-size: 15px; color: #4b5563; line-height: 1.6; }
    .topics { text-align: left; margin: 24px 0; }
    .topic { display: flex; align-items: center; padding: 8px 0; font-size: 14px; color: #374151; }
    .topic::before { content: '✓'; color: #3b82f6; font-weight: bold; margin-right: 12px; }
    .footer { padding: 16px 24px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to TalPro Insights</h1>
    </div>
    <div class="body">
      <p>You're now subscribed to TalPro India's newsletter. We share actionable insights on IT staffing, hiring trends, and talent market intelligence.</p>
      <div class="topics">
        <div class="topic">GCC hiring trends and expansion updates</div>
        <div class="topic">IT salary benchmarks across Indian cities</div>
        <div class="topic">Labour compliance updates (DPDPA, new codes)</div>
        <div class="topic">Recruitment best practices for tech roles</div>
        <div class="topic">Market intelligence and staffing reports</div>
      </div>
      <p>We respect your inbox — expect 2-4 emails per month, always valuable.</p>
    </div>
    <div class="footer">
      You received this because ${email} was subscribed to TalPro India's newsletter.
      <br>
      <a href="https://talproindia.com">talproindia.com</a> · Bangalore, India
    </div>
  </div>
</body>
</html>`;
}

// ── Send Functions ──────────────────────────────────────────────

/**
 * Notify team about a new contact form submission.
 */
export async function notifyContactSubmission(data: ContactFormData): Promise<boolean> {
  const subject = `[TalPro Lead] ${data.firstName} ${data.lastName}${data.company ? ` from ${data.company}` : ""} — ${data.service || "General Inquiry"}`;

  if (!emailEnabled) {
    console.log(`[email] Would send contact notification: ${subject}`);
    return false;
  }

  try {
    await sgMail.send({
      to: NOTIFY_EMAILS,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      replyTo: { email: data.email, name: `${data.firstName} ${data.lastName}` },
      subject,
      html: buildContactNotificationHtml(data),
      text: `New contact inquiry from ${data.firstName} ${data.lastName} (${data.email})${data.company ? ` at ${data.company}` : ""}.\n\nService: ${data.service || "Not specified"}\n\nMessage:\n${data.message}`,
    });
    console.log(`[email] Contact notification sent for ${data.email}`);
    return true;
  } catch (error) {
    console.error("[email] Failed to send contact notification:", error);
    return false;
  }
}

/**
 * Send welcome email to new newsletter subscriber.
 */
export async function sendNewsletterWelcome(email: string): Promise<boolean> {
  if (!emailEnabled) {
    console.log(`[email] Would send newsletter welcome to: ${email}`);
    return false;
  }

  try {
    await sgMail.send({
      to: email,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: "Welcome to TalPro Insights — India's IT Staffing Intelligence",
      html: buildNewsletterWelcomeHtml(email),
      text: "Welcome to TalPro India's newsletter! You'll receive 2-4 emails per month with IT staffing insights, salary benchmarks, GCC hiring trends, and recruitment best practices.",
    });
    console.log(`[email] Newsletter welcome sent to ${email}`);
    return true;
  } catch (error) {
    console.error("[email] Failed to send newsletter welcome:", error);
    return false;
  }
}

/**
 * Notify team about daily summary (call from cron or N8N).
 */
export async function sendDailySummary(stats: {
  newInquiries: number;
  newSubscribers: number;
  activeJobs: number;
  blogViews?: number;
}): Promise<boolean> {
  if (!emailEnabled) {
    console.log("[email] Would send daily summary:", stats);
    return false;
  }

  try {
    await sgMail.send({
      to: NOTIFY_EMAILS,
      from: { email: FROM_EMAIL, name: FROM_NAME },
      subject: `[TalPro Daily] ${stats.newInquiries} inquiries, ${stats.newSubscribers} subscribers — ${new Date().toLocaleDateString("en-IN")}`,
      html: `
        <h2>TalPro India Daily Summary</h2>
        <p>Date: ${new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
        <ul>
          <li><strong>${stats.newInquiries}</strong> new contact inquiries</li>
          <li><strong>${stats.newSubscribers}</strong> new newsletter subscribers</li>
          <li><strong>${stats.activeJobs}</strong> active job listings</li>
          ${stats.blogViews ? `<li><strong>${stats.blogViews}</strong> blog page views</li>` : ""}
        </ul>
        <p><a href="https://talproindia.com/api/contact">View inquiries</a></p>
      `,
      text: `TalPro Daily: ${stats.newInquiries} inquiries, ${stats.newSubscribers} subscribers, ${stats.activeJobs} active jobs.`,
    });
    console.log("[email] Daily summary sent");
    return true;
  } catch (error) {
    console.error("[email] Failed to send daily summary:", error);
    return false;
  }
}
