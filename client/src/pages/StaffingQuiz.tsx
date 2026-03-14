import { useState, useMemo } from 'react';
import { Link } from 'wouter';
import {
  ArrowRight, ArrowLeft, CheckCircle2, Users, Clock,
  Zap, Shield, Target, Sparkles, BarChart3,
} from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/Breadcrumbs';

/* ── Types ────────────────────────────────────────────────────── */

interface QuizQuestion {
  id: string;
  question: string;
  subtitle: string;
  options: { label: string; value: string; icon: React.ElementType }[];
}

interface StaffingResult {
  model: string;
  slug: string;
  tagline: string;
  description: string;
  bestFor: string[];
  icon: React.ElementType;
}

/* ── Quiz data ────────────────────────────────────────────────── */

const questions: QuizQuestion[] = [
  {
    id: 'teamSize',
    question: 'How many people do you need to hire?',
    subtitle: 'This helps us recommend the right engagement model.',
    options: [
      { label: '1-3 people', value: 'small', icon: Users },
      { label: '4-10 people', value: 'medium', icon: Users },
      { label: '10+ people', value: 'large', icon: Users },
      { label: 'Not sure yet', value: 'unsure', icon: Target },
    ],
  },
  {
    id: 'timeline',
    question: 'How quickly do you need them?',
    subtitle: 'Urgency affects which models work best.',
    options: [
      { label: 'ASAP (< 2 weeks)', value: 'urgent', icon: Zap },
      { label: '2-6 weeks', value: 'standard', icon: Clock },
      { label: '1-3 months', value: 'planned', icon: Clock },
      { label: 'No rush', value: 'flexible', icon: Shield },
    ],
  },
  {
    id: 'duration',
    question: 'How long do you need them for?',
    subtitle: 'Project duration shapes the staffing approach.',
    options: [
      { label: '< 6 months', value: 'short', icon: Clock },
      { label: '6-12 months', value: 'medium', icon: Clock },
      { label: '12+ months / permanent', value: 'long', icon: Shield },
      { label: 'Start short, extend if good', value: 'c2h', icon: Sparkles },
    ],
  },
  {
    id: 'seniority',
    question: 'What seniority level?',
    subtitle: 'Senior and leadership roles need different approaches.',
    options: [
      { label: 'Junior / Mid-level', value: 'junior', icon: Users },
      { label: 'Senior engineers', value: 'senior', icon: Target },
      { label: 'Tech leads / Architects', value: 'lead', icon: BarChart3 },
      { label: 'VP / CTO / Director', value: 'executive', icon: Shield },
    ],
  },
  {
    id: 'flexibility',
    question: 'What matters most to you?',
    subtitle: 'Your priority shapes our recommendation.',
    options: [
      { label: 'Speed — fill roles fast', value: 'speed', icon: Zap },
      { label: 'Quality — only top talent', value: 'quality', icon: Shield },
      { label: 'Cost efficiency', value: 'cost', icon: BarChart3 },
      { label: 'Long-term cultural fit', value: 'culture', icon: Users },
    ],
  },
];

const staffingResults: Record<string, StaffingResult> = {
  contract: {
    model: 'Contract Staffing',
    slug: 'it-staffing',
    tagline: 'Flexible talent, fast deployment',
    description: 'Bring in skilled professionals on contract for project-based work. Scale up or down as needed with no long-term commitment.',
    bestFor: ['Project-based needs', 'Quick ramp-up', 'Budget flexibility', 'Skill-specific gaps'],
    icon: Zap,
  },
  c2h: {
    model: 'Contract-to-Hire',
    slug: 'it-staffing',
    tagline: 'Try before you commit',
    description: 'Start with a contract engagement and convert to permanent after evaluating cultural fit and performance. Lower risk hiring.',
    bestFor: ['Risk-averse hiring', 'Cultural fit assessment', 'New role experimentation', 'Budget phasing'],
    icon: Sparkles,
  },
  permanent: {
    model: 'Direct Hiring',
    slug: 'direct-hiring-it',
    tagline: 'Build your core team',
    description: 'Permanent placement for roles that are critical to your long-term success. We handle end-to-end sourcing, screening, and offer management.',
    bestFor: ['Core team building', 'Long-term investment', 'Cultural alignment', 'Leadership roles'],
    icon: Shield,
  },
  executive: {
    model: 'Executive Search',
    slug: 'executive-search',
    tagline: 'Leadership that transforms',
    description: 'Retained search for VP, CTO, and C-suite roles. Confidential, thorough, and focused on candidates who drive strategic impact.',
    bestFor: ['C-suite & VP roles', 'Confidential searches', 'Board-level requirements', 'Succession planning'],
    icon: Target,
  },
  pods: {
    model: 'Engineering Pods',
    slug: 'engineering-staffing',
    tagline: 'A ready-made team',
    description: 'Pre-assembled engineering teams (3-8 people) with complementary skills. Deploy a full squad instead of hiring one-by-one.',
    bestFor: ['Large team needs', 'New product development', 'GCC setup', 'Fast time-to-market'],
    icon: Users,
  },
};

/* ── Scoring logic ────────────────────────────────────────────── */

function getRecommendation(answers: Record<string, string>): StaffingResult {
  const scores: Record<string, number> = {
    contract: 0,
    c2h: 0,
    permanent: 0,
    executive: 0,
    pods: 0,
  };

  // Team size
  if (answers.teamSize === 'large') { scores.pods += 3; scores.contract += 1; }
  if (answers.teamSize === 'medium') { scores.contract += 2; scores.pods += 1; }
  if (answers.teamSize === 'small') { scores.permanent += 2; scores.c2h += 1; }

  // Timeline
  if (answers.timeline === 'urgent') { scores.contract += 3; scores.pods += 1; }
  if (answers.timeline === 'standard') { scores.contract += 1; scores.c2h += 1; }
  if (answers.timeline === 'planned') { scores.permanent += 2; scores.executive += 1; }
  if (answers.timeline === 'flexible') { scores.permanent += 1; scores.executive += 2; }

  // Duration
  if (answers.duration === 'short') { scores.contract += 3; }
  if (answers.duration === 'medium') { scores.contract += 1; scores.c2h += 2; }
  if (answers.duration === 'long') { scores.permanent += 3; scores.executive += 1; }
  if (answers.duration === 'c2h') { scores.c2h += 3; }

  // Seniority
  if (answers.seniority === 'executive') { scores.executive += 4; }
  if (answers.seniority === 'lead') { scores.executive += 1; scores.permanent += 2; }
  if (answers.seniority === 'senior') { scores.permanent += 1; scores.c2h += 1; scores.contract += 1; }
  if (answers.seniority === 'junior') { scores.contract += 2; scores.pods += 1; }

  // Priority
  if (answers.flexibility === 'speed') { scores.contract += 2; scores.pods += 2; }
  if (answers.flexibility === 'quality') { scores.permanent += 1; scores.executive += 2; }
  if (answers.flexibility === 'cost') { scores.contract += 2; scores.c2h += 1; }
  if (answers.flexibility === 'culture') { scores.permanent += 2; scores.c2h += 2; }

  const topModel = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return staffingResults[topModel];
}

/* ── Component ────────────────────────────────────────────────── */

export default function StaffingQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const isComplete = currentStep >= questions.length;
  const currentQuestion = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  const result = useMemo(
    () => (isComplete ? getRecommendation(answers) : null),
    [isComplete, answers],
  );

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep((s) => s + 1), 200);
    } else {
      setTimeout(() => {
        setCurrentStep(questions.length);
        setShowResult(true);
      }, 200);
    }
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
      setCurrentStep(questions.length - 1);
    } else if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <>
      <SEO
        title="Which Staffing Model Is Right for You? — Free Quiz"
        description="Answer 5 quick questions to discover the ideal IT staffing model for your team. Contract, permanent, C2H, executive search, or engineering pods."
        path="/staffing-quiz"
      />

      <div className="pt-20">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: 'Staffing Quiz' },
          ]}
        />

        {/* ── Hero ──────────────────────────────────────── */}
        <section className="bg-gradient-to-b from-[hsl(222,47%,11%)] to-[hsl(222,47%,15%)] text-white py-10 md:py-14">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[hsl(187,92%,41%)]/10 border border-[hsl(187,92%,41%)]/20 mb-5">
              <Target className="h-4 w-4 text-[hsl(187,92%,41%)]" />
              <span className="text-xs font-semibold text-[hsl(187,92%,41%)] uppercase tracking-wider">
                5 Quick Questions
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-tight">
              Which Staffing Model{' '}
              <span className="text-[hsl(38,92%,50%)]">Is Right for You?</span>
            </h1>
            <p className="text-base text-white/70 max-w-xl mx-auto">
              Not sure whether you need contract, permanent, or something else? Answer a few questions and we'll recommend the best approach.
            </p>
          </div>
        </section>

        {/* ── Quiz body ─────────────────────────────────── */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            {/* Progress bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>{showResult ? 'Complete!' : `Question ${currentStep + 1} of ${questions.length}`}</span>
                <span>{Math.round(showResult ? 100 : progress)}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[hsl(187,92%,41%)] to-[hsl(38,92%,50%)] rounded-full transition-all duration-500"
                  style={{ width: `${showResult ? 100 : progress}%` }}
                />
              </div>
            </div>

            {/* Question or Result */}
            {!showResult && currentQuestion && (
              <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  {currentQuestion.question}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {currentQuestion.subtitle}
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {currentQuestion.options.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = answers[currentQuestion.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-[hsl(187,92%,41%)] bg-[hsl(187,92%,41%)]/5'
                            : 'border-border hover:border-[hsl(187,92%,41%)]/50 hover:bg-muted/30'
                        }`}
                      >
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-[hsl(187,92%,41%)] text-white' : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{opt.label}</span>
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-[hsl(187,92%,41%)] ml-auto" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Back button */}
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Previous question
                  </button>
                )}
              </div>
            )}

            {/* Result */}
            {showResult && result && (
              <div className="space-y-6">
                <div className="bg-background border border-border rounded-2xl p-6 md:p-8">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[hsl(222,47%,11%)] mb-4">
                      <result.icon className="h-8 w-8 text-[hsl(38,92%,50%)]" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-[hsl(187,92%,41%)] font-semibold mb-2">
                      We Recommend
                    </p>
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      {result.model}
                    </h2>
                    <p className="text-lg text-[hsl(38,92%,50%)] font-medium">
                      {result.tagline}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-6 text-center max-w-lg mx-auto">
                    {result.description}
                  </p>

                  <div className="bg-muted/50 rounded-xl p-5 mb-6">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Best For
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {result.bestFor.map((item) => (
                        <div key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-[hsl(160,84%,39%)] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={`/contact?service=${encodeURIComponent(result.model)}`} className="flex-1">
                      <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[hsl(38,92%,50%)] text-[hsl(222,47%,11%)] hover:brightness-105 transition-all">
                        Discuss {result.model}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                    <Link href={`/services/${result.slug}`} className="flex-1">
                      <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted/50 transition-all">
                        Learn More
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Restart / back */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" /> Change last answer
                  </button>
                  <span className="text-muted-foreground/30">|</span>
                  <button
                    onClick={handleRestart}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
