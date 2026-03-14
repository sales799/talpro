import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight, Calculator, MapPin, Briefcase, TrendingUp,
  BarChart3, Mail, ChevronDown, Sparkles, ArrowUpRight,
  ArrowDown, Minus, Info,
} from 'lucide-react';
import { salaryData, CATEGORIES, CITIES, type SalaryRole, type CityMultiplier } from '@/data/salaryData';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';
import { apiRequest } from '@/lib/queryClient';

/* ── Types ────────────────────────────────────────────────────── */

type ExpLevel = 'junior' | 'mid' | 'senior' | 'lead';

const EXP_LABELS: Record<ExpLevel, string> = {
  junior: '0-3 years',
  mid: '3-7 years',
  senior: '7-12 years',
  lead: '12+ years',
};

const EXP_LEVELS: ExpLevel[] = ['junior', 'mid', 'senior', 'lead'];

/* ── Helpers ──────────────────────────────────────────────────── */

function formatLPA(value: number): string {
  if (value >= 100) return `₹${(value / 100).toFixed(1)} Cr`;
  return `₹${value} LPA`;
}

function getPercentile(value: number, min: number, max: number): number {
  if (max === min) return 50;
  return Math.round(((value - min) / (max - min)) * 100);
}

function TrendIcon({ trend }: { trend: 'up' | 'stable' | 'down' }) {
  if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-green-600" />;
  if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

/* ── Component ────────────────────────────────────────────────── */

export default function SalaryCalculator() {
  // ─── Selection state ─────────────
  const [selectedRole, setSelectedRole] = useState<string>(salaryData[0].role);
  const [selectedExp, setSelectedExp] = useState<ExpLevel>('mid');
  const [selectedCity, setSelectedCity] = useState<CityMultiplier>(CITIES[0]);
  const [currentSalary, setCurrentSalary] = useState<string>('');

  // ─── Lead capture ────────────────
  const [email, setEmail] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // ─── Derived data ────────────────
  const roleData = useMemo(
    () => salaryData.find((r) => r.role === selectedRole)!,
    [selectedRole],
  );

  const range = useMemo(() => {
    const baseRange = roleData[selectedExp];
    const lo = Math.round(baseRange[0] * selectedCity.multiplier);
    const hi = Math.round(baseRange[1] * selectedCity.multiplier);
    const median = Math.round((lo + hi) / 2);
    return { lo, hi, median };
  }, [roleData, selectedExp, selectedCity]);

  // Compare all levels for this role
  const allLevelRanges = useMemo(() => {
    return EXP_LEVELS.map((level) => {
      const baseRange = roleData[level];
      const lo = Math.round(baseRange[0] * selectedCity.multiplier);
      const hi = Math.round(baseRange[1] * selectedCity.multiplier);
      return { level, lo, hi, label: EXP_LABELS[level] };
    });
  }, [roleData, selectedCity]);

  // Find the max salary across all levels for bar chart scaling
  const maxSalary = useMemo(
    () => Math.max(...allLevelRanges.map((r) => r.hi)),
    [allLevelRanges],
  );

  // Similar roles in same category
  const similarRoles = useMemo(
    () => salaryData
      .filter((r) => r.category === roleData.category && r.role !== roleData.role)
      .slice(0, 3),
    [roleData],
  );

  // Current salary comparison
  const currentSalaryNum = parseFloat(currentSalary);
  const hasComparison = !isNaN(currentSalaryNum) && currentSalaryNum > 0;
  const comparisonPercentile = hasComparison
    ? getPercentile(currentSalaryNum, range.lo, range.hi)
    : 0;

  // Group roles by category for the dropdown
  const rolesByCategory = useMemo(() => {
    const map = new Map<string, SalaryRole[]>();
    for (const role of salaryData) {
      const list = map.get(role.category) || [];
      list.push(role);
      map.set(role.category, list);
    }
    return map;
  }, []);

  const handleLeadCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || leadStatus === 'loading') return;
    setLeadStatus('loading');
    try {
      await apiRequest('POST', '/api/newsletter', { email, source: 'salary-calculator' });
    } catch {
      // Graceful fallback
    }
    setLeadStatus('success');
  };

  return (
    <>
      <SEO
        title="IT Salary Calculator India 2026 — Check Your Market Worth"
        description="Free interactive salary calculator for 28+ tech roles across Bangalore, Hyderabad, Pune, Chennai, and NCR. Compare your compensation to market rates."
        path="/salary-calculator"
      />

      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Salary Guide', href: '/salary-guide' },
            { label: 'Calculator' },
          ]}
        />

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(187,92%,41%)]/10 border border-[hsl(187,92%,41%)]/20 mb-6">
              <Calculator className="h-4 w-4 text-[hsl(187,92%,41%)]" />
              <span className="text-xs font-semibold text-[hsl(187,92%,41%)] uppercase tracking-wider">
                Interactive Tool
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              IT Salary{' '}
              <span className="text-[hsl(38,92%,50%)]">Calculator</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Select your role, experience, and city to see how your salary compares to market rates across India.
            </p>
          </div>
        </section>

        {/* ── Calculator ────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {/* Input controls */}
            <div className="bg-background border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <Briefcase className="h-4 w-4 inline-block mr-1.5 -mt-0.5 text-[hsl(187,92%,41%)]" />
                    Select Role
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full appearance-none bg-muted/50 border border-border rounded-xl px-4 py-3 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(187,92%,41%)]/30 cursor-pointer"
                    >
                      {Array.from(rolesByCategory.entries()).map(([cat, roles]) => (
                        <optgroup key={cat} label={cat}>
                          {roles.map((r) => (
                            <option key={r.role} value={r.role}>{r.role}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <TrendingUp className="h-4 w-4 inline-block mr-1.5 -mt-0.5 text-[hsl(187,92%,41%)]" />
                    Experience Level
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {EXP_LEVELS.map((level) => (
                      <button
                        key={level}
                        onClick={() => setSelectedExp(level)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                          selectedExp === level
                            ? 'bg-[hsl(222,47%,11%)] text-white shadow-sm'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
                        }`}
                      >
                        {EXP_LABELS[level]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <MapPin className="h-4 w-4 inline-block mr-1.5 -mt-0.5 text-[hsl(187,92%,41%)]" />
                    City
                  </label>
                  <div className="space-y-2">
                    {CITIES.map((city) => (
                      <button
                        key={city.city}
                        onClick={() => setSelectedCity(city)}
                        className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          selectedCity.city === city.city
                            ? 'bg-[hsl(222,47%,11%)] text-white shadow-sm'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
                        }`}
                      >
                        <span>{city.city}</span>
                        <span className="text-[10px] opacity-70">{city.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Main result */}
              <div className="lg:col-span-3 space-y-6">
                {/* Salary range card */}
                <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{roleData.role}</h2>
                      <p className="text-sm text-muted-foreground">
                        {EXP_LABELS[selectedExp]} • {selectedCity.city}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                      <TrendIcon trend={roleData.trending} />
                      <span className="text-xs font-medium">{roleData.yoyChange} YoY</span>
                    </div>
                  </div>

                  {/* Big number */}
                  <div className="text-center py-6">
                    <p className="text-sm text-muted-foreground mb-1">Market Range</p>
                    <p className="text-4xl md:text-5xl font-bold text-foreground">
                      {formatLPA(range.lo)} — {formatLPA(range.hi)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Median: <span className="font-semibold text-[hsl(38,92%,50%)]">{formatLPA(range.median)}</span>
                    </p>
                  </div>

                  {/* Visual bar chart — all levels */}
                  <div className="space-y-3 mt-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Progression by Experience
                    </p>
                    {allLevelRanges.map((r) => {
                      const isActive = r.level === selectedExp;
                      const barWidth = Math.max((r.hi / maxSalary) * 100, 8);
                      const barStart = (r.lo / maxSalary) * 100;
                      return (
                        <div key={r.level} className="flex items-center gap-3">
                          <div className="w-20 text-right">
                            <span className={`text-xs font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {r.label}
                            </span>
                          </div>
                          <div className="flex-1 relative h-8 bg-muted/50 rounded-lg overflow-hidden">
                            <div
                              className={`absolute top-0 bottom-0 rounded-lg transition-all duration-300 ${
                                isActive
                                  ? 'bg-gradient-to-r from-[hsl(187,92%,41%)] to-[hsl(187,92%,41%)]/70'
                                  : 'bg-[hsl(222,47%,11%)]/20'
                              }`}
                              style={{
                                left: `${barStart}%`,
                                width: `${barWidth - barStart}%`,
                              }}
                            />
                            <div className="absolute inset-0 flex items-center px-3">
                              <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-muted-foreground'} ml-auto`}>
                                {formatLPA(r.lo)} — {formatLPA(r.hi)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Salary comparison input */}
                <div className="bg-background border border-border rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    <Sparkles className="h-5 w-5 inline-block mr-2 -mt-0.5 text-[hsl(38,92%,50%)]" />
                    Compare Your Salary
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Your CTC (LPA):</span>
                    <input
                      type="number"
                      value={currentSalary}
                      onChange={(e) => setCurrentSalary(e.target.value)}
                      placeholder="e.g. 18"
                      className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(187,92%,41%)]/30"
                    />
                  </div>
                  {hasComparison && (
                    <div className="mt-4 p-4 rounded-xl bg-muted/50">
                      {comparisonPercentile <= 0 ? (
                        <p className="text-sm">
                          <span className="font-semibold text-red-600">Below market range.</span>{' '}
                          You're earning below the market minimum for this role. Consider negotiating or exploring new opportunities.
                        </p>
                      ) : comparisonPercentile >= 100 ? (
                        <p className="text-sm">
                          <span className="font-semibold text-green-600">Above market range!</span>{' '}
                          Your compensation exceeds the typical market range. You're well-positioned.
                        </p>
                      ) : comparisonPercentile < 40 ? (
                        <p className="text-sm">
                          <span className="font-semibold text-amber-600">Below median ({comparisonPercentile}th percentile).</span>{' '}
                          There may be room to negotiate. Your market value could be {formatLPA(range.median)} or higher.
                        </p>
                      ) : comparisonPercentile < 70 ? (
                        <p className="text-sm">
                          <span className="font-semibold text-green-600">At market rate ({comparisonPercentile}th percentile).</span>{' '}
                          You're earning near the median for {roleData.role} in {selectedCity.city}.
                        </p>
                      ) : (
                        <p className="text-sm">
                          <span className="font-semibold text-green-600">Above median ({comparisonPercentile}th percentile).</span>{' '}
                          Your compensation is strong for this role and location.
                        </p>
                      )}

                      {/* Visual position indicator */}
                      <div className="mt-3 relative h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 bottom-0 bg-gradient-to-r from-[hsl(187,92%,41%)] to-[hsl(38,92%,50%)] rounded-full"
                          style={{ width: `${Math.min(Math.max(comparisonPercentile, 2), 98)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                        <span>{formatLPA(range.lo)}</span>
                        <span>Median: {formatLPA(range.median)}</span>
                        <span>{formatLPA(range.hi)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-2 space-y-6">
                {/* Similar roles */}
                <div className="bg-background border border-border rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-foreground mb-4">
                    <BarChart3 className="h-4 w-4 inline-block mr-1.5 -mt-0.5 text-[hsl(187,92%,41%)]" />
                    Similar Roles
                  </h3>
                  <div className="space-y-3">
                    {similarRoles.map((r) => {
                      const lo = Math.round(r[selectedExp][0] * selectedCity.multiplier);
                      const hi = Math.round(r[selectedExp][1] * selectedCity.multiplier);
                      return (
                        <button
                          key={r.role}
                          onClick={() => setSelectedRole(r.role)}
                          className="flex items-center justify-between w-full text-left p-3 rounded-xl hover:bg-muted/50 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-medium text-foreground">{r.role}</p>
                            <p className="text-xs text-muted-foreground">{formatLPA(lo)} — {formatLPA(hi)}</p>
                          </div>
                          <TrendIcon trend={r.trending} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Lead capture */}
                <div className="bg-[hsl(222,47%,11%)] text-white rounded-2xl p-6">
                  <h3 className="text-sm font-bold mb-2">
                    Get Personalized Report
                  </h3>
                  <p className="text-xs text-white/60 mb-4">
                    Receive a detailed salary benchmark for your specific profile — free.
                  </p>
                  {leadStatus === 'success' ? (
                    <div className="text-center py-3">
                      <p className="text-sm text-[hsl(160,84%,39%)] font-medium">✓ We'll be in touch!</p>
                    </div>
                  ) : (
                    <form onSubmit={handleLeadCapture} className="space-y-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[hsl(187,92%,41%)]/30"
                      />
                      <button
                        type="submit"
                        disabled={leadStatus === 'loading'}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] hover:brightness-105 transition-all disabled:opacity-50"
                      >
                        {leadStatus === 'loading' ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                        ) : (
                          <>
                            <Mail className="h-4 w-4" /> Get Report
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>

                {/* CTA */}
                <div className="bg-muted/50 border border-border rounded-2xl p-6 text-center">
                  <Info className="h-8 w-8 text-[hsl(187,92%,41%)] mx-auto mb-3" />
                  <p className="text-sm font-semibold text-foreground mb-1">Looking to hire?</p>
                  <p className="text-xs text-muted-foreground mb-4">
                    Get competitive salary benchmarks for your open roles.
                  </p>
                  <Link href="/contact?source=salary-calculator">
                    <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] hover:brightness-105 transition-all w-full">
                      Talk to Us <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>

                {/* Full guide link */}
                <Link href="/salary-guide">
                  <div className="bg-background border border-border rounded-2xl p-4 hover:shadow-sm transition-all cursor-pointer">
                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                      View Full Salary Guide <ArrowRight className="h-4 w-4 text-[hsl(187,92%,41%)]" />
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Complete table with 28+ roles across all experience levels
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
