import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, CreditCard, Monitor, Heart, ShoppingCart, GraduationCap, Brain, User, Briefcase, FileText, Newspaper, CheckSquare, Zap, Users, Building2, MapPin, Shield } from 'lucide-react';
import { getIndustriesForNavigation } from '@/pages/industries/config';
import { services } from '@/config/services';
import talproLogo from '@assets/TalproLG1_1758602854563.jpeg';

export default function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [findPeopleOpen, setFindPeopleOpen] = useState(false);
  const [desktopIndustriesOpen, setDesktopIndustriesOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [desktopSolutionsOpen, setDesktopSolutionsOpen] = useState(false);
  const [desktopAboutOpen, setDesktopAboutOpen] = useState(false);
  const [desktopFindPeopleOpen, setDesktopFindPeopleOpen] = useState(false);
  const [gccOpen, setGccOpen] = useState(false);
  const [desktopGccOpen, setDesktopGccOpen] = useState(false);
  const industriesRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const findPeopleRef = useRef<HTMLDivElement>(null);
  const gccRef = useRef<HTMLDivElement>(null);

  const isActiveLink = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  const industries = getIndustriesForNavigation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (industriesRef.current && !industriesRef.current.contains(event.target as Node)) {
        setDesktopIndustriesOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setDesktopServicesOpen(false);
      }
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setDesktopSolutionsOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setDesktopAboutOpen(false);
      }
      if (findPeopleRef.current && !findPeopleRef.current.contains(event.target as Node)) {
        setDesktopFindPeopleOpen(false);
      }
      if (gccRef.current && !gccRef.current.contains(event.target as Node)) {
        setDesktopGccOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDesktopIndustriesOpen(false);
        setDesktopServicesOpen(false);
        setDesktopSolutionsOpen(false);
        setDesktopAboutOpen(false);
        setDesktopFindPeopleOpen(false);
        setDesktopGccOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  // Keyboard navigation handlers
  const handleDropdownKeyDown = (event: React.KeyboardEvent, dropdownType: 'industries' | 'services' | 'solutions' | 'about' | 'findPeople' | 'gcc') => {
    const isIndustries = dropdownType === 'industries';
    const isServices = dropdownType === 'services';
    const isSolutions = dropdownType === 'solutions';
    const isAbout = dropdownType === 'about';
    const isFindPeople = dropdownType === 'findPeople';
    
    let isOpen, setOpen;
    if (isIndustries) {
      isOpen = desktopIndustriesOpen;
      setOpen = setDesktopIndustriesOpen;
    } else if (isServices) {
      isOpen = desktopServicesOpen;
      setOpen = setDesktopServicesOpen;
    } else if (isSolutions) {
      isOpen = desktopSolutionsOpen;
      setOpen = setDesktopSolutionsOpen;
    } else if (isFindPeople) {
      isOpen = desktopFindPeopleOpen;
      setOpen = setDesktopFindPeopleOpen;
    } else if (dropdownType === 'gcc') {
      isOpen = desktopGccOpen;
      setOpen = setDesktopGccOpen;
    } else {
      isOpen = desktopAboutOpen;
      setOpen = setDesktopAboutOpen;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setOpen(!isOpen);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setOpen(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (isOpen) {
          setOpen(false);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        (event.currentTarget as HTMLButtonElement).blur();
        break;
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return <CreditCard className="w-4 h-4" />;
      case 'Monitor':
        return <Monitor className="w-4 h-4" />;
      case 'Heart':
        return <Heart className="w-4 h-4" />;
      case 'ShoppingCart':
        return <ShoppingCart className="w-4 h-4" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const NavLink = ({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link href={href} className={`text-sm whitespace-nowrap transition-colors duration-200 ${
      isActiveLink(href) 
        ? 'text-foreground' 
        : 'text-muted-foreground hover:text-primary'
    } ${className}`}
    data-testid={`nav-link-${href.replace('/', '') || 'home'}`}>
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" data-testid="logo">
            <img 
              src={talproLogo} 
              alt="TalPro Solutions - Professional Software Development" 
              className="h-8 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <NavLink href="/">Home</NavLink>
            
            {/* About Dropdown */}
            <div className="relative" ref={aboutRef}>
              <button 
                className={`flex items-center text-sm whitespace-nowrap transition-colors duration-200 ${
                  location.startsWith('/about') || location.startsWith('/case-studies') || location.startsWith('/careers') || location.startsWith('/blog') || location.startsWith('/industries')
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                data-testid="button-about-dropdown"
                aria-expanded={desktopAboutOpen}
                aria-controls="about-dropdown-menu"
                aria-haspopup="true"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'about')}
                onFocus={() => setDesktopAboutOpen(true)}
                onMouseEnter={() => setDesktopAboutOpen(true)}
                onMouseLeave={() => setDesktopAboutOpen(false)}
                onClick={() => setDesktopAboutOpen(!desktopAboutOpen)}
              >
                About <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${
                  desktopAboutOpen ? 'rotate-180' : ''
                }`} />
              </button>
              <div 
                id="about-dropdown-menu"
                className={`absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-lg transition-all duration-200 z-50 ${
                  desktopAboutOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setDesktopAboutOpen(true)}
                onMouseLeave={() => setDesktopAboutOpen(false)}
              >
                <div className="p-4 space-y-2">
                  <Link 
                    href="/about" 
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                    data-testid="nav-about-company"
                    onClick={() => setDesktopAboutOpen(false)}
                  >
                    <div className="flex-shrink-0 text-primary w-4 h-4">
                      <User className="w-4 h-4" />
                    </div>
                    <span>About Company</span>
                  </Link>
                  <Link 
                    href="/case-studies" 
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                    data-testid="nav-about-case-studies"
                    onClick={() => setDesktopAboutOpen(false)}
                  >
                    <div className="flex-shrink-0 text-primary w-4 h-4">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span>Case Studies</span>
                  </Link>
                  <Link 
                    href="/careers" 
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                    data-testid="nav-about-careers"
                    onClick={() => setDesktopAboutOpen(false)}
                  >
                    <div className="flex-shrink-0 text-primary w-4 h-4">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <span>Careers</span>
                  </Link>
                  <Link 
                    href="/blog" 
                    className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                    data-testid="nav-about-blog"
                    onClick={() => setDesktopAboutOpen(false)}
                  >
                    <div className="flex-shrink-0 text-primary w-4 h-4">
                      <Newspaper className="w-4 h-4" />
                    </div>
                    <span>Blog</span>
                  </Link>
                  <div className="border-t border-border mt-2 pt-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground px-3 py-1 mb-1">Industries</div>
                    {industries.map((industry) => (
                      <Link 
                        key={industry.slug}
                        href={`/industries/${industry.slug}`} 
                        className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                        data-testid={`nav-industry-${industry.shortName.toLowerCase().replace(/\s+/g, '-')}`}
                        onClick={() => setDesktopAboutOpen(false)}
                      >
                        <div className="flex-shrink-0 text-primary w-4 h-4">
                          {getIcon(industry.icon)}
                        </div>
                        <span>{industry.shortName}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Find People Dropdown */}
            <div className="relative" ref={findPeopleRef}>
              <button 
                className={`flex items-center text-sm whitespace-nowrap transition-colors duration-200 ${
                  location.startsWith('/services/') && services.some(s => location.includes(s.slug))
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                data-testid="nav-find-people-trigger"
                aria-expanded={desktopFindPeopleOpen}
                aria-controls="find-people-dropdown-menu"
                aria-haspopup="true"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'findPeople')}
                onFocus={() => setDesktopFindPeopleOpen(true)}
                onMouseEnter={() => setDesktopFindPeopleOpen(true)}
                onMouseLeave={() => setDesktopFindPeopleOpen(false)}
                onClick={() => setDesktopFindPeopleOpen(!desktopFindPeopleOpen)}
              >
                Find People <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${
                  desktopFindPeopleOpen ? 'rotate-180' : ''
                }`} />
              </button>
              <div 
                id="find-people-dropdown-menu"
                className={`absolute top-full left-0 mt-2 w-[680px] bg-card border border-border rounded-lg shadow-lg transition-all duration-200 z-50 ${
                  desktopFindPeopleOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setDesktopFindPeopleOpen(true)}
                onMouseLeave={() => setDesktopFindPeopleOpen(false)}
              >
                <div className="p-6 grid grid-cols-2 gap-8">
                  {/* Left: Services */}
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                      Staffing Services
                    </div>
                    {services.map((service) => (
                      <Link 
                        key={service.slug}
                        href={`/services/${service.slug}`} 
                        className="block rounded-md px-3 py-2 hover:bg-secondary transition-colors"
                        data-testid={`nav-service-${service.slug}`}
                        onClick={() => setDesktopFindPeopleOpen(false)}
                      >
                        <div className="font-medium text-sm">{service.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                          {service.hero.subtitle.split('—')[0].trim()}
                        </div>
                      </Link>
                    ))}
                  </div>
                  {/* Right: Quick Links */}
                  <div className="space-y-3">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Quick Links
                    </div>
                    <Link 
                      href="/case-studies" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                      data-testid="nav-quick-case-studies"
                      onClick={() => setDesktopFindPeopleOpen(false)}
                    >
                      <FileText className="w-4 h-4 text-primary" />
                      <span>Success Stories</span>
                    </Link>
                    <Link 
                      href="/how-we-differ" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                      data-testid="nav-quick-how-we-differ"
                      onClick={() => setDesktopFindPeopleOpen(false)}
                    >
                      <Users className="w-4 h-4 text-primary" />
                      <span>How We Differ</span>
                    </Link>
                    <Link 
                      href="/contact" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors"
                      data-testid="nav-quick-contact"
                      onClick={() => setDesktopFindPeopleOpen(false)}
                    >
                      <Briefcase className="w-4 h-4 text-primary" />
                      <span>Request Talent</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Services & Solutions Mega Menu */}
            <div className="relative" ref={servicesRef}>
              <button 
                className={`flex items-center text-sm whitespace-nowrap transition-colors duration-200 ${
                  location.startsWith('/services') || location.startsWith('/ai-recruiter-assessment') || location.startsWith('/hireiq') || location.startsWith('/cvpro') || location.startsWith('/assessments')
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                data-testid="button-services-solutions-dropdown"
                aria-expanded={desktopServicesOpen}
                aria-controls="services-dropdown-menu"
                aria-haspopup="true"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'services')}
                onFocus={() => setDesktopServicesOpen(true)}
                onMouseEnter={() => setDesktopServicesOpen(true)}
                onMouseLeave={() => setDesktopServicesOpen(false)}
                onClick={() => setDesktopServicesOpen(!desktopServicesOpen)}
              >
                Services & Solutions <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${
                  desktopServicesOpen ? 'rotate-180' : ''
                }`} />
              </button>
              <div 
                id="services-dropdown-menu"
                className={`absolute top-full left-0 mt-2 w-[680px] bg-card border border-border rounded-lg shadow-lg transition-all duration-200 z-50 ${
                  desktopServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setDesktopServicesOpen(true)}
                onMouseLeave={() => setDesktopServicesOpen(false)}
              >
                <div className="p-6 grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Engineering Services</div>
                    <Link href="/services/custom-software" className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-service-custom-software" onClick={() => setDesktopServicesOpen(false)}>Software Development</Link>
                    <Link href="/services/mobile-app" className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-service-mobile-app" onClick={() => setDesktopServicesOpen(false)}>Mobile App Development</Link>
                    <Link href="/services/ai-ml" className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-service-ai-ml" onClick={() => setDesktopServicesOpen(false)}>AI & Machine Learning</Link>
                    <Link href="/services" className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors font-semibold border-t border-border mt-2 pt-3" data-testid="nav-service-overview" onClick={() => setDesktopServicesOpen(false)}>View All Services</Link>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">AI Solutions</div>
                    <Link href="/ai-recruiter-assessment" className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-solution-ai-assessment" onClick={() => setDesktopServicesOpen(false)}>
                      <Brain className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>EVA: Evaluate. Validate.</span>
                    </Link>
                    <Link href="/assessments" className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-solution-assessments" onClick={() => setDesktopServicesOpen(false)}>
                      <CheckSquare className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>AIRA: Hire. Assured.</span>
                    </Link>
                    <Link href="/hireiq" className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-solution-hireiq" onClick={() => setDesktopServicesOpen(false)}>
                      <Brain className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>HIREIQ: Intelligence. Applied.</span>
                    </Link>
                    <Link href="/cvpro" className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-solution-cvpro" onClick={() => setDesktopServicesOpen(false)}>
                      <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>CV.PRO: Future.Powered</span>
                    </Link>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Quick Links</div>
                    <Link href="/how-we-differ" className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-quick-how-we-differ-services" onClick={() => setDesktopServicesOpen(false)}>
                      <Users className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>How We Differ</span>
                    </Link>
                    <Link href="/case-studies" className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-quick-case-studies-services" onClick={() => setDesktopServicesOpen(false)}>
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Case Studies</span>
                    </Link>
                    <Link href="/contact" className="flex items-center space-x-3 px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-quick-contact-services" onClick={() => setDesktopServicesOpen(false)}>
                      <Briefcase className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>Request Talent</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* GCC & Operations Dropdown */}
            <div className="relative" ref={gccRef}>
              <button 
                className={`flex items-center text-sm whitespace-nowrap transition-colors duration-200 ${
                  location.startsWith('/services/gcc') || location.startsWith('/services/workspace') || location.startsWith('/services/talent-intelligence') || location.startsWith('/services/business-operations')
                    ? 'text-foreground' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
                data-testid="button-gcc-dropdown"
                aria-expanded={desktopGccOpen}
                aria-controls="gcc-dropdown-menu"
                aria-haspopup="true"
                onKeyDown={(e) => handleDropdownKeyDown(e, 'gcc')}
                onFocus={() => setDesktopGccOpen(true)}
                onMouseEnter={() => setDesktopGccOpen(true)}
                onMouseLeave={() => setDesktopGccOpen(false)}
                onClick={() => setDesktopGccOpen(!desktopGccOpen)}
              >
                GCC & Operations <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${
                  desktopGccOpen ? 'rotate-180' : ''
                }`} />
              </button>
              <div 
                id="gcc-dropdown-menu"
                className={`absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg transition-all duration-200 z-50 ${
                  desktopGccOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setDesktopGccOpen(true)}
                onMouseLeave={() => setDesktopGccOpen(false)}
              >
                <div className="p-4 space-y-1">
                  <Link href="/services/gcc-accelerator" className="flex items-start space-x-3 px-3 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-gcc-accelerator" onClick={() => setDesktopGccOpen(false)}>
                    <Building2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">GCC Accelerator</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Launch your India center in 45-60 days</div>
                    </div>
                  </Link>
                  <Link href="/services/talent-intelligence" className="flex items-start space-x-3 px-3 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-talent-intelligence" onClick={() => setDesktopGccOpen(false)}>
                    <Brain className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Talent Intelligence</div>
                      <div className="text-xs text-muted-foreground mt-0.5">AI-powered hiring, 48-hour shortlists</div>
                    </div>
                  </Link>
                  <Link href="/services/workspace-solutions" className="flex items-start space-x-3 px-3 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-workspace-solutions" onClick={() => setDesktopGccOpen(false)}>
                    <Monitor className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Workspace Solutions</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Day-1 ready offices across India</div>
                    </div>
                  </Link>
                  <Link href="/services/business-operations" className="flex items-start space-x-3 px-3 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-secondary rounded-md transition-colors" data-testid="nav-business-operations" onClick={() => setDesktopGccOpen(false)}>
                    <Shield className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Business Operations</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Payroll, compliance & CXO-as-a-Service</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            
            <NavLink href="/how-we-differ">How We Differ</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            
            <Link href="/contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-4 py-2" data-testid="button-get-started">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLink href="/">Home</NavLink>
                  
                  <div>
                    <button 
                      onClick={() => setAboutOpen(!aboutOpen)}
                      className="flex items-center justify-between w-full text-left text-muted-foreground hover:text-primary transition-colors"
                      data-testid="button-mobile-about"
                      aria-expanded={aboutOpen}
                      aria-controls="mobile-about-menu"
                      aria-haspopup="true"
                    >
                      About <ChevronDown className={`w-4 h-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {aboutOpen && (
                      <div 
                        id="mobile-about-menu"
                        className="ml-4 mt-3 space-y-4"
                        role="menu"
                        aria-labelledby="button-mobile-about"
                      >
                        <Link
                          href="/about"
                          className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation"
                          data-testid="nav-about-company-mobile"
                          onClick={() => setIsOpen(false)}
                          role="menuitem"
                        >
                          <User className="w-4 h-4 text-primary" />
                          <span>About Company</span>
                        </Link>
                        <Link
                          href="/case-studies"
                          className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation"
                          data-testid="nav-about-case-studies-mobile"
                          onClick={() => setIsOpen(false)}
                          role="menuitem"
                        >
                          <FileText className="w-4 h-4 text-primary" />
                          <span>Case Studies</span>
                        </Link>
                        <Link
                          href="/careers"
                          className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation"
                          data-testid="nav-about-careers-mobile"
                          onClick={() => setIsOpen(false)}
                          role="menuitem"
                        >
                          <Briefcase className="w-4 h-4 text-primary" />
                          <span>Careers</span>
                        </Link>
                        <Link
                          href="/blog"
                          className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation"
                          data-testid="nav-about-blog-mobile"
                          onClick={() => setIsOpen(false)}
                          role="menuitem"
                        >
                          <Newspaper className="w-4 h-4 text-primary" />
                          <span>Blog</span>
                        </Link>
                        <div className="border-t border-border mt-2 pt-2">
                          <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 py-1 mb-1">Industries</div>
                          {industries.map((industry) => (
                            <Link
                              key={industry.slug}
                              href={`/industries/${industry.slug}`}
                              className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation"
                              data-testid={`nav-industry-${industry.shortName.toLowerCase().replace(/\s+/g, '-')}-mobile`}
                              onClick={() => setIsOpen(false)}
                              role="menuitem"
                            >
                              <div className="flex-shrink-0 text-primary w-4 h-4">
                                {getIcon(industry.icon)}
                              </div>
                              <span>{industry.shortName}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <button 
                      onClick={() => setFindPeopleOpen(!findPeopleOpen)}
                      className="flex items-center justify-between w-full text-left text-muted-foreground hover:text-primary transition-colors"
                      data-testid="button-mobile-find-people"
                      aria-expanded={findPeopleOpen}
                      aria-controls="mobile-find-people-menu"
                      aria-haspopup="true"
                    >
                      Find People <ChevronDown className={`w-4 h-4 transition-transform ${findPeopleOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {findPeopleOpen && (
                      <div 
                        id="mobile-find-people-menu"
                        className="ml-4 mt-3 space-y-4"
                        role="menu"
                        aria-labelledby="button-mobile-find-people"
                      >
                        {services.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            className="flex flex-col space-y-1 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation"
                            data-testid={`nav-find-people-${service.slug}-mobile`}
                            onClick={() => setIsOpen(false)}
                            role="menuitem"
                          >
                            <span className="font-medium">{service.name}</span>
                            <span className="text-xs opacity-70">{service.hero.subtitle.split('—')[0].trim()}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full text-left text-muted-foreground hover:text-primary transition-colors" data-testid="button-mobile-services-solutions" aria-expanded={servicesOpen} aria-controls="mobile-services-menu" aria-haspopup="true">
                      Services & Solutions <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {servicesOpen && (
                      <div id="mobile-services-menu" className="ml-4 mt-2 space-y-2" role="menu" aria-labelledby="button-mobile-services-solutions">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 pt-2 pb-1">Engineering</div>
                        <Link href="/services/custom-software" className="block py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-service-custom-software-mobile" onClick={() => setIsOpen(false)} role="menuitem">Software Development</Link>
                        <Link href="/services/mobile-app" className="block py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-service-mobile-app-mobile" onClick={() => setIsOpen(false)} role="menuitem">Mobile App Development</Link>
                        <Link href="/services/ai-ml" className="block py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-service-ai-ml-mobile" onClick={() => setIsOpen(false)} role="menuitem">AI & Machine Learning</Link>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground px-2 pt-3 pb-1 border-t border-border mt-2">AI Solutions</div>
                        <Link href="/ai-recruiter-assessment" className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-solution-ai-assessment-mobile" onClick={() => setIsOpen(false)} role="menuitem"><Brain className="w-4 h-4 text-primary" /><span>EVA: Evaluate. Validate.</span></Link>
                        <Link href="/assessments" className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-solution-assessments-mobile" onClick={() => setIsOpen(false)} role="menuitem"><CheckSquare className="w-4 h-4 text-primary" /><span>AIRA: Hire. Assured.</span></Link>
                        <Link href="/hireiq" className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-solution-hireiq-mobile" onClick={() => setIsOpen(false)} role="menuitem"><Brain className="w-4 h-4 text-primary" /><span>HIREIQ: Intelligence. Applied.</span></Link>
                        <Link href="/cvpro" className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-solution-cvpro-mobile" onClick={() => setIsOpen(false)} role="menuitem"><Zap className="w-4 h-4 text-primary" /><span>CV.PRO: Future.Powered</span></Link>
                        <Link href="/services" className="block py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors font-semibold border-t border-border mt-2 pt-3 min-h-[48px] touch-manipulation" data-testid="nav-service-overview-mobile" onClick={() => setIsOpen(false)} role="menuitem">View All Services</Link>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <button onClick={() => setGccOpen(!gccOpen)} className="flex items-center justify-between w-full text-left text-muted-foreground hover:text-primary transition-colors" data-testid="button-mobile-gcc" aria-expanded={gccOpen} aria-controls="mobile-gcc-menu" aria-haspopup="true">
                      GCC & Operations <ChevronDown className={`w-4 h-4 transition-transform ${gccOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {gccOpen && (
                      <div id="mobile-gcc-menu" className="ml-4 mt-2 space-y-2" role="menu" aria-labelledby="button-mobile-gcc">
                        <Link href="/services/gcc-accelerator" className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-gcc-accelerator-mobile" onClick={() => setIsOpen(false)} role="menuitem"><Building2 className="w-4 h-4 text-blue-500" /><span>GCC Accelerator</span></Link>
                        <Link href="/services/talent-intelligence" className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-talent-intelligence-mobile" onClick={() => setIsOpen(false)} role="menuitem"><Brain className="w-4 h-4 text-emerald-500" /><span>Talent Intelligence</span></Link>
                        <Link href="/services/workspace-solutions" className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-workspace-solutions-mobile" onClick={() => setIsOpen(false)} role="menuitem"><Monitor className="w-4 h-4 text-purple-500" /><span>Workspace Solutions</span></Link>
                        <Link href="/services/business-operations" className="flex items-center space-x-3 py-3 px-2 text-sm text-muted-foreground hover:text-primary transition-colors min-h-[48px] touch-manipulation" data-testid="nav-business-operations-mobile" onClick={() => setIsOpen(false)} role="menuitem"><Shield className="w-4 h-4 text-orange-500" /><span>Business Operations</span></Link>
                      </div>
                    )}
                  </div>
                  
                  <NavLink href="/how-we-differ">How We Differ</NavLink>
                  <NavLink href="/contact">Contact</NavLink>
                  
                  <Link href="/contact">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-mobile-get-started">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
