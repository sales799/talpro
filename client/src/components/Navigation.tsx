import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Users,
  Briefcase,
  Building2,
  Search,
  Target,
  Rocket,
  CreditCard,
  Monitor,
  Heart,
  ShoppingCart,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Newspaper,
  UserCircle,
  BarChart3,
  Globe,
  Calculator,
  Mail,
  Cog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { getIndustriesForNavigation } from '@/pages/industries/config';
// Logo served from /public/logo.svg (the committed brand asset).
// The previous import pointed at attached_assets/ which is gitignored —
// it resolved only on developer machines that had a local copy.
const talproLogo = '/logo.svg';

// ─── Types ──────────────────────────────────────────
type DropdownId = 'solutions' | 'resources' | 'company' | null;

// ─── Icon mapping for industries ────────────────────
const industryIconMap: Record<string, React.ElementType> = {
  CreditCard,
  Monitor,
  Heart,
  ShoppingCart,
  GraduationCap,
  Building2,
};

function getIndustryIcon(iconName: string) {
  return industryIconMap[iconName] || Building2;
}

// ─── Dropdown animation variants ────────────────────
const dropdownVariants = {
  hidden: { opacity: 0, y: -4, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.12, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// ─── Static nav data ────────────────────────────────

const staffingSolutions = [
  { href: '/services/it-staffing', label: 'IT Staffing', icon: Monitor, desc: 'Software engineers, architects & DevOps' },
  { href: '/services/engineering-staffing', label: 'Engineering Staffing', icon: Briefcase, desc: 'Hardware, mechanical & electrical engineers' },
  { href: '/services/sales-staffing', label: 'Sales Staffing', icon: Target, desc: 'SDRs, AEs & sales leadership' },
  { href: '/services/direct-hiring-it', label: 'Direct Hiring', icon: Users, desc: 'Permanent placements, IT & functions' },
];

const specializedServices = [
  { href: '/services/executive-search', label: 'Executive Search', icon: Search, desc: 'C-suite & VP-level retained search' },
  { href: '/services/gcc-accelerator', label: 'GCC Accelerator', icon: Rocket, desc: 'Build & scale your India GCC' },
];

const resourceLinks = [
  { href: '/blog', label: 'Insights', icon: Newspaper, desc: 'Industry trends & hiring guides' },
  { href: '/salary-guide', label: 'Salary Guide', icon: BarChart3, desc: 'IT compensation benchmarks' },
  { href: '/case-studies', label: 'Case Studies', icon: BookOpen, desc: 'Client success stories' },
  { href: '/gcc-hub', label: 'GCC Intelligence Hub', icon: Globe, desc: 'India GCC setup playbook' },
  { href: '/salary-calculator', label: 'Salary Calculator', icon: Calculator, desc: 'Estimate market-rate packages' },
];

const companyLinks = [
  { href: '/about', label: 'About Us', icon: UserCircle, desc: '15+ years in IT staffing' },
  { href: '/how-we-work', label: 'How We Work', icon: Cog, desc: 'Our recruitment process' },
  { href: '/careers', label: 'Careers', icon: Briefcase, desc: 'Join the TalPro team' },
  { href: '/for-candidates', label: 'For Candidates', icon: Users, desc: 'Find your next role' },
  { href: '/contact', label: 'Contact', icon: Mail, desc: 'Get in touch with us' },
];

// ═══════════════════════════════════════════════════
// Navigation Component
// ═══════════════════════════════════════════════════
export default function Navigation() {
  const [location] = useLocation();
  const [activeDropdown, setActiveDropdown] = useState<DropdownId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── Scroll detection ───────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Close dropdown on route change ─────────────
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [location]);

  // ─── Click outside to close ─────────────────────
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ─── Escape key to close ────────────────────────
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setActiveDropdown(null);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ─── Toggle dropdown (radio-button pattern) ─────
  const toggleDropdown = useCallback((id: DropdownId) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  }, []);

  // ─── Hover intent handlers (desktop only) ───────
  const handleMouseEnter = useCallback((id: DropdownId) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(id);
  }, []);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 200);
  }, []);

  // ─── Active route helpers ───────────────────────
  const isActivePrefix = (prefix: string) => location.startsWith(prefix);
  const isAnyActive = (paths: string[]) =>
    paths.some((p) => location === p || location.startsWith(p));

  // ─── Industries from config ─────────────────────
  const industries = getIndustriesForNavigation();

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-effect shadow-sm border-b border-border/50'
          : 'bg-[rgba(249,250,251,0.96)] backdrop-blur-md border-b border-border/50'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* ── Logo ─────────────────────────────── */}
          <Link href="/" className="flex items-center shrink-0" aria-label="TALPRO Home">
            <img
              src={talproLogo}
              alt="TALPRO – India's Specialist IT Staffing Partner"
              className="h-9 w-auto"
            />
          </Link>

          {/* ── Desktop Nav Items ─────────────────── */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/employers"
              className={`px-3.5 py-2 text-[15px] font-medium rounded-md transition-colors ${
                location === '/employers' ? 'text-accent' : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
              }`}
            >
              For Employers
            </Link>
            <Link
              href="/for-candidates"
              className={`px-3.5 py-2 text-[15px] font-medium rounded-md transition-colors ${
                location === '/for-candidates' ? 'text-accent' : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
              }`}
            >
              For Candidates
            </Link>
            {/* Solutions Dropdown */}
            <DesktopDropdownTrigger
              id="solutions"
              label="Solutions"
              isOpen={activeDropdown === 'solutions'}
              isActive={isActivePrefix('/services') || isActivePrefix('/industries')}
              onToggle={toggleDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />

            {/* Resources Dropdown */}
            <DesktopDropdownTrigger
              id="resources"
              label="Resources"
              isOpen={activeDropdown === 'resources'}
              isActive={isAnyActive(['/blog', '/salary-guide', '/case-studies', '/gcc-hub', '/salary-calculator'])}
              onToggle={toggleDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />

            {/* Company Dropdown */}
            <DesktopDropdownTrigger
              id="company"
              label="Company"
              isOpen={activeDropdown === 'company'}
              isActive={isAnyActive(['/about', '/how-we-work', '/careers', '/for-candidates', '/contact'])}
              onToggle={toggleDropdown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          </div>

          {/* ── Desktop CTA ──────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => {
                document.dispatchEvent(
                  new KeyboardEvent('keydown', { key: 'k', metaKey: true })
                );
              }}
              className="p-2 rounded-md text-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Search (⌘K)"
              title="Search (⌘K)"
            >
              <Search className="h-4 w-4" />
            </button>
            <Link href="/contact">
              <Button
                variant="default"
                size="sm"
                className="bg-warning hover:bg-warning/90 text-warning-foreground font-semibold px-5 shadow-sm shadow-warning/20"
              >
                Hire Talent
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* ── Mobile Menu Trigger ───────────────── */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
                <MobileNav
                  location={location}
                  industries={industries}
                  onClose={() => setMobileOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ── Desktop Dropdown Panels ─────────────── */}
      <AnimatePresence>
        {activeDropdown === 'solutions' && (
          <DropdownPanel
            onMouseEnter={() => handleMouseEnter('solutions')}
            onMouseLeave={handleMouseLeave}
          >
            <SolutionsMegaMenu industries={industries} />
          </DropdownPanel>
        )}
        {activeDropdown === 'resources' && (
          <DropdownPanel
            onMouseEnter={() => handleMouseEnter('resources')}
            onMouseLeave={handleMouseLeave}
          >
            <SimpleDropdown items={resourceLinks} columns={5} />
          </DropdownPanel>
        )}
        {activeDropdown === 'company' && (
          <DropdownPanel
            onMouseEnter={() => handleMouseEnter('company')}
            onMouseLeave={handleMouseLeave}
          >
            <SimpleDropdown items={companyLinks} columns={5} />
          </DropdownPanel>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ═══════════════════════════════════════════════════
// Sub-components
// ═══════════════════════════════════════════════════

// ─── Desktop dropdown trigger button ──────────────
function DesktopDropdownTrigger({
  id,
  label,
  isOpen,
  isActive,
  onToggle,
  onMouseEnter,
  onMouseLeave,
}: {
  id: DropdownId;
  label: string;
  isOpen: boolean;
  isActive: boolean;
  onToggle: (id: DropdownId) => void;
  onMouseEnter: (id: DropdownId) => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3.5 py-2 text-[15px] font-medium rounded-md transition-colors ${
        isOpen
          ? 'text-accent bg-accent/5'
          : isActive
            ? 'text-accent'
            : 'text-foreground/80 hover:text-foreground hover:bg-muted/50'
      }`}
      onClick={() => onToggle(id)}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {label}
      <ChevronDown
        className={`h-3.5 w-3.5 transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        }`}
      />
    </button>
  );
}

// ─── Animated dropdown panel wrapper ──────────────
function DropdownPanel({
  children,
  onMouseEnter,
  onMouseLeave,
}: {
  children: React.ReactNode;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      className="absolute left-0 right-0 top-full bg-card border-b border-border shadow-lg"
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </div>
    </motion.div>
  );
}

// ─── Solutions mega menu (Services + Industries + CTA) ───
function SolutionsMegaMenu({
  industries,
}: {
  industries: ReturnType<typeof getIndustriesForNavigation>;
}) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Staffing Solutions column */}
      <div className="col-span-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Staffing Solutions
        </p>
        <div className="space-y-1">
          {staffingSolutions.map((item) => (
            <NavMenuItem key={item.href} {...item} />
          ))}
        </div>
      </div>

      {/* Specialized column */}
      <div className="col-span-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Specialized
        </p>
        <div className="space-y-1">
          {specializedServices.map((item) => (
            <NavMenuItem key={item.href} {...item} />
          ))}
        </div>
      </div>

      {/* Industries column */}
      <div className="col-span-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Industries
        </p>
        <div className="space-y-1">
          {industries.map((ind) => {
            const Icon = getIndustryIcon(ind.icon);
            return (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/60 transition-colors group"
              >
                <div className="p-1.5 rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                  {ind.shortName}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* CTA panel */}
      <div className="col-span-2 bg-muted/50 rounded-xl p-5 flex flex-col justify-between">
        <div>
          <p className="font-semibold text-sm mb-1">Not sure what you need?</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Tell us about your hiring challenge and we'll recommend the right approach.
          </p>
        </div>
        <Link href="/contact">
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full text-xs border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Talk to Us
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Individual nav menu item ─────────────────────
function NavMenuItem({
  href,
  label,
  icon: Icon,
  desc,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  desc?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-muted/60 transition-colors group"
    >
      <div className="mt-0.5 p-1.5 rounded-md bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
          {label}
        </p>
        {desc && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {desc}
          </p>
        )}
      </div>
    </Link>
  );
}

// ─── Simple dropdown (Resources / Company) ────────
function SimpleDropdown({
  items,
  columns,
}: {
  items: { href: string; label: string; icon: React.ElementType; desc?: string }[];
  columns: number;
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-muted/60 transition-colors text-center group"
          >
            <div className="p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                {item.label}
              </p>
              {item.desc && (
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                  {item.desc}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════
// Mobile Navigation
// ═══════════════════════════════════════════════════

function MobileNav({
  location,
  industries,
  onClose,
}: {
  location: string;
  industries: ReturnType<typeof getIndustriesForNavigation>;
  onClose: () => void;
}) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/" onClick={onClose}>
          <img src={talproLogo} alt="TALPRO" className="h-8 w-auto" />
        </Link>
        <SheetClose asChild>
          <Button variant="ghost" size="icon" aria-label="Close menu">
            <X className="h-5 w-5" />
          </Button>
        </SheetClose>
      </div>

      {/* Links */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {/* Solutions */}
        <MobileAccordion
          label="Solutions"
          isExpanded={expandedSection === 'solutions'}
          onToggle={() => toggleSection('solutions')}
        >
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-1 pt-2">
            Staffing Solutions
          </p>
          {staffingSolutions.map((item) => (
            <MobileNavLink key={item.href} href={item.href} label={item.label} active={location === item.href} onClose={onClose} />
          ))}
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-1 pt-3">
            Specialized
          </p>
          {specializedServices.map((item) => (
            <MobileNavLink key={item.href} href={item.href} label={item.label} active={location === item.href} onClose={onClose} />
          ))}
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-1 pt-3">
            Industries
          </p>
          {industries.map((ind) => (
            <MobileNavLink
              key={ind.slug}
              href={`/industries/${ind.slug}`}
              label={ind.shortName}
              active={location === `/industries/${ind.slug}`}
              onClose={onClose}
            />
          ))}
        </MobileAccordion>

        {/* Resources */}
        <MobileAccordion
          label="Resources"
          isExpanded={expandedSection === 'resources'}
          onToggle={() => toggleSection('resources')}
        >
          {resourceLinks.map((item) => (
            <MobileNavLink key={item.href} href={item.href} label={item.label} active={location === item.href} onClose={onClose} />
          ))}
        </MobileAccordion>

        {/* Company */}
        <MobileAccordion
          label="Company"
          isExpanded={expandedSection === 'company'}
          onToggle={() => toggleSection('company')}
        >
          {companyLinks.map((item) => (
            <MobileNavLink key={item.href} href={item.href} label={item.label} active={location === item.href} onClose={onClose} />
          ))}
        </MobileAccordion>
      </div>

      {/* Mobile CTA */}
      <div className="p-4 border-t border-border">
        <Link href="/contact" onClick={onClose}>
          <Button className="w-full bg-warning hover:bg-warning/90 text-warning-foreground font-semibold">
            Hire Talent
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

// ─── Mobile accordion section ─────────────────────
function MobileAccordion({
  label,
  isExpanded,
  onToggle,
  children,
}: {
  label: string;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden pl-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile nav link ──────────────────────────────
function MobileNavLink({
  href,
  label,
  active,
  onClose,
}: {
  href: string;
  label: string;
  active: boolean;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`block px-3 py-2 text-sm rounded-md transition-colors ${
        active
          ? 'text-accent bg-accent/5 font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
    >
      {label}
    </Link>
  );
}
