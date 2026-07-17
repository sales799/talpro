import { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight, ArrowUpRight, ArrowDown, Minus, TrendingUp,
  MapPin, Filter, BarChart3, Briefcase, Mail, Download, CheckCircle,
} from 'lucide-react';
import {
  salaryData, CATEGORIES, CITIES, TRENDS,
  type SalaryRole, type CityMultiplier,
} from '@/data/salaryData';
import SEO from '@/components/SEO';
import SocialFollowCTA from '@/components/SocialFollowCTA';
import Breadcrumbs from '@/components/Breadcrumbs';
import SocialShareBar from '@/components/SocialShareBar';

/* ── Helpers ──────────────────────────────────────────────────────── */

function formatRange(range: [number, number], multiplier: number): string {
  const lo = Math.round(range[0] * multiplier);
  const hi = Math.round(range[1] * multiplier);
  return `${lo}-${hi} LPA`;
}

function TrendIcon({ trend }: { trend: 'up' | 'stable' | 'down' }) {
  if (trend === 'up') return <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />;
  if (trend === 'down') return <ArrowDown className="h-3.5 w-3.5 text-red-500" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
}

/* ── Gated PDF Download ─────────────────────────────────────────── */

function GatedSalaryPdf() {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'salary-guide-pdf' }),
      });
      setSubmitted(true);
    } catch {
      // Still show success — don't block the user
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl md:text-2xl font-bold mb-2">Download Link Sent!</h3>
          <p className="text-muted-foreground mb-6">
            Check your inbox at <strong>{email}</strong> for the India IT Salary Guide 2026 PDF.
            Meanwhile, explore the interactive data above.
          </p>
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-xs text-muted-foreground">Follow for weekly salary insights:</span>
            <a
              href="https://www.linkedin.com/company/talpro-india"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-[#0077B5] transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a
              href="https://x.com/talproindia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              X
            </a>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-3">
            You'll also receive monthly salary trend updates. Unsubscribe anytime.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <Download className="h-8 w-8 text-accent mx-auto mb-4" />
        <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">
          Download the Full Salary Guide
        </h3>
        <p className="text-muted-foreground mb-6 text-sm md:text-base">
          Get the complete India IT Salary Guide 2026 as a PDF — 30+ roles, city benchmarks,
          and YoY trends. Free for hiring managers.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Work email"
            className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:bg-accent/90 transition-colors disabled:opacity-60"
          >
            {loading ? 'Sending...' : (
              <>
                <Download className="h-4 w-4" />
                Get PDF
              </>
            )}
          </button>
        </form>
        <p className="text-[11px] text-muted-foreground/50 mt-3">
          No spam. Your data stays private. Used only for salary trend updates.
        </p>
      </div>
    </section>
  );
}

/* ── Component ─────────────────────────────────────────────────────── */

export default function SalaryGuide() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeCity, setActiveCity] = useState<CityMultiplier>(CITIES[0]);

  const filtered =
    activeCategory === 'All'
      ? salaryData
      : salaryData.filter((r) => r.category === activeCategory);

  return (
    <>
      <SEO
        title="India IT Salary Guide 2026 — Tech Compensation Benchmarks"
        description="Benchmark salaries for 25+ tech roles across Bangalore, Hyderabad, Pune, Chennai, and NCR. Updated quarterly by TalPro's market intelligence team."
        path="/salary-guide"
        image="https://talproindia.com/api/og?title=India+IT+Salary+Guide+2026&subtitle=30%2B+Roles+%C2%B7+5+Cities+%C2%B7+Quarterly+Updates&type=salary"
      />

      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Salary Guide' },
          ]}
        />
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs uppercase tracking-widest text-accent font-semibold mb-4">
              Market Intelligence
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              India IT Salary Guide{' '}
              <span className="text-warning">2026</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-4">
              Compensation benchmarks for {salaryData.length}+ tech roles across
              {' '}{CITIES.length} cities. Updated quarterly from our placement data.
            </p>
            <p className="text-sm text-white/40 mb-6">
              Last updated: Q1 2026 | Source: TalPro placement data
            </p>
            <SocialShareBar
              title="India IT Salary Guide 2026 — Tech Compensation Benchmarks"
              description="Benchmark salaries for 25+ tech roles across Bangalore, Hyderabad, Pune, Chennai, and NCR."
              url="https://talproindia.com/salary-guide"
              showLabels
            />
          </div>
        </section>

        {/* ── Trends cards ────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8">
          <div className="grid md:grid-cols-3 gap-4">
            {TRENDS.map((trend) => (
              <div
                key={trend.title}
                className="rounded-2xl border border-border bg-background p-5 shadow-sm"
              >
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  {trend.title}
                </h3>
                <ul className="space-y-1.5">
                  {trend.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Filters ─────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10 md:py-14">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-6">
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              <Filter className="h-4 w-4 text-muted-foreground mt-1.5 shrink-0 hidden sm:block" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg border transition-colors ${
                    activeCategory === cat
                      ? 'bg-[hsl(222,47%,11%)] text-white border-transparent'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* City selector */}
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
              <select
                value={activeCity.city}
                onChange={(e) => {
                  const city = CITIES.find((c) => c.city === e.target.value);
                  if (city) setActiveCity(city);
                }}
                className="text-sm font-medium bg-background border border-border rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent/30"
              >
                {CITIES.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city} ({c.label})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Salary table ──────────────────────────────── */}
          <div className="rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 text-left">
                    <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-center">
                      Junior<br /><span className="font-normal text-muted-foreground">0-3 YOE</span>
                    </th>
                    <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-center">
                      Mid<br /><span className="font-normal text-muted-foreground">3-7 YOE</span>
                    </th>
                    <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-center">
                      Senior<br /><span className="font-normal text-muted-foreground">7-12 YOE</span>
                    </th>
                    <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-center">
                      Lead+<br /><span className="font-normal text-muted-foreground">12+ YOE</span>
                    </th>
                    <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-center">YoY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filtered.map((role) => (
                    <tr key={role.role} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm">{role.role}</div>
                        <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                          {role.category}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground whitespace-nowrap">
                        {formatRange(role.junior, activeCity.multiplier)}
                      </td>
                      <td className="px-4 py-3 text-center text-muted-foreground whitespace-nowrap">
                        {formatRange(role.mid, activeCity.multiplier)}
                      </td>
                      <td className="px-4 py-3 text-center font-medium whitespace-nowrap">
                        {formatRange(role.senior, activeCity.multiplier)}
                      </td>
                      <td className="px-4 py-3 text-center font-medium whitespace-nowrap">
                        {formatRange(role.lead, activeCity.multiplier)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 text-xs font-medium">
                          <TrendIcon trend={role.trending} />
                          {role.yoyChange}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            All figures are annual CTC in Lakhs Per Annum (LPA) for permanent roles.
            Ranges represent 25th-75th percentile from TalPro's placement data.
            {activeCity.city !== 'Bangalore' && (
              <> {activeCity.city} salaries adjusted by {activeCity.label} relative to Bangalore baseline.</>
            )}
          </p>
        </section>

        {/* ── Methodology ─────────────────────────────────── */}
        <section className="bg-muted/30 py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <BarChart3 className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">Real Placement Data</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Based on actual offers and placements, not self-reported surveys
                </div>
              </div>
              <div>
                <Briefcase className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">Updated Quarterly</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Refreshed every quarter to reflect market movements
                </div>
              </div>
              <div>
                <MapPin className="h-5 w-5 mx-auto mb-2 text-accent" />
                <div className="text-sm font-semibold">City-Adjusted</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Multipliers based on our placement data across 5 major tech hubs
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gated PDF Download ──────────────────────────── */}
        <GatedSalaryPdf />

        <SocialFollowCTA heading="Get salary updates in your feed" subtitle="Quarterly compensation data, hiring trends, and market intelligence." />

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-[hsl(222,47%,11%)] text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Mail className="h-6 w-6 text-warning mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
              Need a Custom Salary Benchmark?
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              Get a personalised compensation report for your specific roles,
              tech stack, and locations. Free for companies hiring 5+ engineers.
            </p>
            <Link href="/contact">
              <span className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] font-semibold hover:bg-[hsl(38,92%,55%)] transition-colors cursor-pointer">
                Request Custom Report <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
