import { Link } from 'wouter';
import {
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Monitor,
  Briefcase,
  Target,
  Users,
  Search,
  Rocket,
  Shield,
  Award,
  CheckCircle,
} from 'lucide-react';
// Logo served from /public/logo.svg (the committed brand asset).
const talproLogo = '/logo.svg';
import NewsletterSignup from './NewsletterSignup';

/* ────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────── */

const serviceLinks = [
  { href: '/services/it-staffing', label: 'IT Staffing', icon: Monitor },
  { href: '/services/engineering-staffing', label: 'Engineering Staffing', icon: Briefcase },
  { href: '/services/sales-staffing', label: 'Sales Staffing', icon: Target },
  { href: '/services/direct-hiring-it', label: 'Direct Hiring', icon: Users },
  { href: '/services/executive-search', label: 'Executive Search', icon: Search },
  { href: '/services/gcc-accelerator', label: 'GCC Accelerator', icon: Rocket },
];

const companyLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Insights' },
  { href: '/salary-guide', label: 'Salary Guide' },
  { href: '/careers', label: 'Careers' },
];

const legalLinks = [
  { href: '/contact', label: 'Contact Us' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms-of-service', label: 'Terms of Service' },
];

const socialLinks = [
  { href: 'https://www.linkedin.com/company/3007934/', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://x.com/talproindia', label: 'X (Twitter)', icon: Twitter },
  { href: 'https://www.youtube.com/@TalProIndia', label: 'YouTube', icon: Youtube },
  { href: 'https://www.instagram.com/indiatalpro/', label: 'Instagram', icon: Instagram },
  { href: 'https://www.facebook.com/TalproIndia', label: 'Facebook', icon: Facebook },
];

/* ────────────────────────────────────────────────
   Footer
   ──────────────────────────────────────────────── */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer aria-label="Site footer" className="bg-[hsl(222,47%,11%)] text-white">
      {/* ── CTA Band ── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Ready to build your dream team?
            </h3>
            <p className="text-white/60 mt-1 text-sm md:text-base">
              First shortlisted profiles in under 48 hours.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[hsl(38,92%,50%)] hover:bg-[hsl(38,92%,45%)] text-[hsl(222,47%,11%)] font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Get Talent
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand column — wider */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={talproLogo}
                alt="TALPRO – India's Specialist IT Staffing Partner"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              India's specialist IT staffing partner — connecting top tech talent with companies that move fast, since 2010.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center h-9 w-9 rounded-md bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5 text-white/30 group-hover:text-[hsl(187,92%,41%)] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Legal */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              Get in touch
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-white/30 shrink-0" />
                <span>Bengaluru, India</span>
              </li>
              <li>
                <a
                  href="tel:+918040948407"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 text-white/30 shrink-0" />
                  080 4094 8407
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@talproindia.com"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 text-white/30 shrink-0" />
                  hello@talproindia.com
                </a>
              </li>
            </ul>

            {/* Legal links */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <ul className="space-y-2">
                {legalLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-xs text-white/50 hover:text-white/80 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-4">
            <h4 className="text-sm font-semibold text-white mb-1">
              Get weekly IT hiring insights
            </h4>
            <p className="text-xs text-white/50">
              Salary trends, market reports, and staffing tips for India tech leaders.
            </p>
          </div>
          <NewsletterSignup variant="dark" />
        </div>
      </div>

      {/* ── Trust Badges ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/40">
            <div className="flex items-center gap-2 text-xs">
              <Shield className="h-4 w-4" />
              <span>MSME Registered</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="h-4 w-4" />
              <span>PF & ESI Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Award className="h-4 w-4" />
              <span>14+ Years in IT Staffing</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Users className="h-4 w-4" />
              <span>500+ Placements</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <CheckCircle className="h-4 w-4" />
              <span>50+ Active Clients</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {currentYear} Talpro Solutions Private Limited. All rights reserved.</p>
          <p>Made in India</p>
        </div>
      </div>
    </footer>
  );
}
