import { useState } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight, ArrowUpRight, ArrowDown, Minus, TrendingUp,
  MapPin, Filter, BarChart3, Briefcase, Mail,
} from 'lucide-react';
import {
  salaryData, CATEGORIES, CITIES, TRENDS,
  type SalaryRole, type CityMultiplier,
} from '@/data/salaryData';
import SEO from '@/components/SEO';

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
      />

      <div className="pt-20">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-4">
              Market Intelligence
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              India IT Salary Guide{' '}
              <span className="text-[hsl(38,92%,50%)]">2026</span>
            </h1>
            <p className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-4">
              Compensation benchmarks for {salaryData.length}+ tech roles across
              {' '}{CITIES.length} cities. Updated quarterly from our placement data.
            </p>
            <p className="text-sm text-white/40">
              Last updated: Q1 2026 | Source: TalPro placement data
            </p>
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

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-[hsl(222,47%,11%)] text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <Mail className="h-6 w-6 text-[hsl(38,92%,50%)] mx-auto mb-4" />
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
