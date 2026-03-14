import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, Search, Users, Clock, TrendingUp, Building2 } from 'lucide-react';
import { caseStudiesData } from '@/data/caseStudies';
import SEO from '@/components/SEO';

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'SaaS & Product', 'GCC Setup', 'Executive Search', 'BFSI', 'Healthcare', 'IT Services'];

  const filteredCaseStudies = caseStudiesData.filter((study) => {
    const matchesCategory = selectedCategory === 'All' || study.category === selectedCategory;
    const matchesSearch =
      searchTerm === '' ||
      study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO
        title="Success Stories — IT Staffing & Recruitment Case Studies"
        description="Real results from TalPro's IT staffing engagements: contract teams, GCC setup, executive search, and niche tech hiring across India's top industries."
        path="/case-studies"
      />

      <div className="pt-20">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-4">
                Success Stories
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
                Real Hiring Results,{' '}
                <span className="text-[hsl(38,92%,50%)]">Real Impact</span>
              </h1>
              <p className="text-lg text-white/70 leading-relaxed mb-10 max-w-2xl">
                See how we've helped startups, enterprises, and global capability centers
                build high-performing technology teams across India.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Users, value: '200+', label: 'Engineers Placed' },
                  { icon: Clock, value: '36 hrs', label: 'Avg. First Shortlist' },
                  { icon: TrendingUp, value: '91%', label: 'Offer Acceptance' },
                  { icon: Building2, value: '50+', label: 'Clients Served' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10"
                  >
                    <stat.icon className="h-4 w-4 text-[hsl(187,92%,41%)] mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Filter + Search ──────────────────────────────── */}
        <section className="py-10 bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Search */}
            <div className="max-w-md mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by role, tech stack, or industry..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[hsl(222,47%,11%)] text-white'
                      : 'bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Case Study Cards ─────────────────────────────── */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredCaseStudies.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground">
                  No success stories match your search. Try a different filter or keyword.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCaseStudies.map((study) => (
                  <Link key={study.id} href={`/case-studies/${study.id}`}>
                    <article className="group h-full rounded-2xl border border-border bg-background overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                      {/* Image */}
                      <div className="aspect-[2/1] overflow-hidden">
                        <img
                          src={study.image}
                          alt={study.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent mb-2">
                          {study.category}
                        </span>
                        <h3 className="font-bold text-base mb-2 group-hover:text-accent transition-colors line-clamp-2">
                          {study.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                          {study.description}
                        </p>

                        {/* Metrics row */}
                        <div className="flex gap-4 mb-4">
                          {study.metrics.slice(0, 2).map((m) => (
                            <div key={m.label}>
                              <div className="text-lg font-bold text-foreground">{m.value}</div>
                              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {study.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                          {study.technologies.length > 3 && (
                            <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-muted text-muted-foreground">
                              +{study.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────── */}
        <section className="py-16 md:py-20 bg-[hsl(222,47%,11%)] text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Build Your Team?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Tell us what you're looking for. We'll have a shortlist of pre-vetted
              candidates in your inbox within 48 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold hover:bg-[hsl(38,92%,55%)] transition-colors cursor-pointer">
                  Start Hiring <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/services">
                <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors cursor-pointer">
                  Explore Services
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
