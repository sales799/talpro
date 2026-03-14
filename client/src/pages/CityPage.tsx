import { useEffect, useRef } from 'react';
import { useParams, useLocation } from 'wouter';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import {
  MapPin,
  Building2,
  Users,
  TrendingUp,
  Briefcase,
  Code,
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  Star,
} from 'lucide-react';
import { locationsConfig, LocationSlug } from '@/pages/locations/config';

/* ── animation helpers ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.0, 0.0, 0.58, 1] as const },
  }),
};

function AnimatedSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.0, 0.0, 0.58, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── main component ────────────────────────────────────── */
export default function CityPage() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const slug = params.slug as LocationSlug;
  const config = locationsConfig[slug];

  /* redirect to 404 when slug is unknown */
  useEffect(() => {
    if (!config) {
      setLocation('/not-found');
    }
  }, [config, setLocation]);

  /* SEO meta tags */
  useEffect(() => {
    if (!config) return;

    document.title = `${config.title} | Talpro`;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        el.setAttribute('content', content);
        document.head.appendChild(el);
      }
    };

    setMeta('name', 'description', config.metaDescription);

    const url = `${window.location.origin}/locations/${slug}`;
    setMeta('property', 'og:title', `${config.title} | Talpro`);
    setMeta('property', 'og:description', config.metaDescription);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', url);
  }, [config, slug]);

  /* FAQPage JSON-LD structured data */
  useEffect(() => {
    if (!config?.faqs?.length) return;

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: config.faqs.map((faq: { q: string; a: string }) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a,
        },
      })),
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    script.id = 'city-faq-jsonld';
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('city-faq-jsonld');
      if (existing) existing.remove();
    };
  }, [config]);

  if (!config) return null;

  const city = config.shortName;

  return (
    <div className="pt-16">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: city },
        ]}
      />

      {/* ═══════════════════ 1. HERO ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white py-24">
        {/* decorative pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px, 30px 30px',
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-8 border border-white/20">
              <MapPin className="w-4 h-4 text-teal-300" />
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-bold">
                IT STAFFING IN {city.toUpperCase()}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-300 bg-clip-text text-transparent">
                {config.heroHeadline}
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              {config.heroSubheading}
            </p>

            {/* highlight stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
              {config.highlights.map((stat: { value: string; label: string }, i: number) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white/5 backdrop-blur rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-green-400">{stat.value}</div>
                  <div className="text-xs text-white/70 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg">
                  <span className="relative z-10 flex items-center gap-2">
                    Hire in {city}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <Link href="/jobs">
                <button className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/10 backdrop-blur rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-105">
                  Find Jobs in {city}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ 2. OVERVIEW ═══════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* left: overview text */}
              <div>
                <Badge className="mb-4 bg-gradient-to-r from-blue-500/10 to-teal-500/10 text-blue-700 border-blue-200">
                  <MapPin className="w-3 h-3 mr-1" /> City Overview
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    {city}
                  </span>{' '}
                  IT Talent Landscape
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-4 text-lg">
                  {config.overview
                    .split('\n')
                    .filter(Boolean)
                    .map((para: string, i: number) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
              </div>

              {/* right: info card */}
              <Card className="stat-card-glass bg-gradient-to-br from-blue-50/80 to-teal-50/80 border-blue-200/30 shadow-xl">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-lg">Average Salary Range</h3>
                    </div>
                    <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                      {config.avgSalaryRange}
                    </p>
                  </div>
                  <hr className="border-blue-200/40" />
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-teal-600" />
                      <h3 className="font-semibold text-lg">GCC &amp; Enterprise Presence</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{config.gccPresence}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ 3. TOP ROLES ═══════════════════ */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full text-sm font-medium mb-6 border border-blue-200/20">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                  IN-DEMAND ROLES
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Most In-Demand IT Roles in{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {city}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {config.topRoles.map((role: string, i: number) => (
                <motion.div
                  key={role}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="stat-card-glass hover:shadow-lg hover:scale-105 transition-all duration-300 border-blue-200/30">
                    <CardContent className="p-5 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-sm">{role}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ 4. TOP SKILLS ═══════════════════ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full text-sm font-medium mb-6 border border-blue-200/20">
                <Code className="w-4 h-4 text-teal-600" />
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                  TECH SKILLS
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Technologies Driving{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {city}&apos;s
                </span>{' '}
                IT Market
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {config.topSkills.map((skill: string, i: number) => (
                <motion.div
                  key={skill}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200/40 hover:from-blue-100 hover:to-teal-100 transition-colors cursor-default"
                  >
                    <Code className="w-3.5 h-3.5 mr-1.5 text-teal-600" />
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ 5. TALPRO ADVANTAGE ═══════════════════ */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full text-sm font-medium mb-6 border border-blue-200/20">
                <Star className="w-4 h-4 text-blue-600" />
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                  OUR EDGE
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Why Choose Talpro for{' '}
                <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  {city}
                </span>{' '}
                IT Staffing
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.talproAdvantage.map((adv: string, i: number) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Card className="stat-card-glass h-full hover:shadow-xl hover:scale-105 transition-all duration-300 border-blue-200/30 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                        <CheckCircle className="w-7 h-7 text-white" />
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {adv}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ 6. FAQ ═══════════════════ */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-full text-sm font-medium mb-6 border border-blue-200/20">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent font-bold">
                    FAQ
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Frequently Asked Questions about{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                    IT Staffing in {city}
                  </span>
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {config.faqs.map((faq: { q: string; a: string }, i: number) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="border border-blue-200/30 rounded-xl px-6 overflow-hidden shadow-sm"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:no-underline py-5">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ═══════════════════ 7. CTA ═══════════════════ */}
      <section className="py-20 bg-[hsl(222,47%,11%)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,hsl(187,92%,41%,0.12),transparent)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Hire in{' '}
              <span className="bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent">
                {city}
              </span>
              ?
            </h2>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Connect with Talpro today and get access to pre-vetted IT talent in {city}.
              First shortlist delivered within 48 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <button className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg">
                  <span className="relative z-10 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Get in Touch
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                </button>
              </Link>
              <a
                href="tel:+919880396677"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
              >
                <Phone className="w-5 h-5" />
                +91 98803 96677
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
