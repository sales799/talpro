import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, TrendingUp } from 'lucide-react';

interface Metric {
  label: string;
  value: string;
}

interface CaseStudyMetricsProps {
  metrics: Metric[];
}

export default function CaseStudyMetrics({ metrics }: CaseStudyMetricsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<string[]>(metrics.map(() => '0'));
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const fps = 60;
    const frames = (duration / 1000) * fps;

    metrics.forEach((metric, index) => {
      const numericMatch = metric.value.match(/(\d+)/);
      if (!numericMatch) {
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = metric.value;
          return newValues;
        });
        return;
      }

      const targetValue = parseInt(numericMatch[1]);
      const increment = targetValue / frames;
      let currentValue = 0;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        currentValue += increment;

        if (frame >= frames) {
          clearInterval(timer);
          currentValue = targetValue;
        }

        const formattedValue = metric.value.replace(/\d+/, Math.floor(currentValue).toString());
        setAnimatedValues((prev) => {
          const newValues = [...prev];
          newValues[index] = formattedValue;
          return newValues;
        });
      }, 1000 / fps);
    });
  }, [isVisible, metrics]);

  const getProgressPercentage = (value: string): number => {
    const match = value.match(/(\d+)%/);
    return match ? parseInt(match[1]) : 100;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden" data-testid="case-study-metrics">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
      }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-full mb-6">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">MEASURABLE IMPACT</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">Key Results</span><br />
            <span className="text-foreground">& Achievements</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Quantifiable business impact and technical achievements that demonstrate the success of this project.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <div key={index} className="group relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <Card className="card-hover-effect stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 relative text-center" data-testid={`metric-card-${index}`}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform animate-float-rotate shadow-lg">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div 
                    className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-3 animate-pulse-glow" 
                    data-testid={`metric-${index}`}
                  >
                    {animatedValues[index]}
                  </div>
                  <div className="text-muted-foreground font-medium mb-4">{metric.label}</div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-teal-500 rounded-full transition-all duration-2000 ease-out"
                      style={{ width: isVisible ? `${getProgressPercentage(metric.value)}%` : '0%' }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
