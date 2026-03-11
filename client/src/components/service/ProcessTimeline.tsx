import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessTimeline({ steps }: { steps: string[] }) {
  if (!steps?.length) return null;
  
  return (
    <div className="relative" data-testid="process-timeline">
      {/* Horizontal Journey */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s, i) => {
          const [title, ...descParts] = s.split(":");
          const description = descParts.join(":").trim();
          
          return (
            <div key={i} className="group relative" data-testid={`timeline-step-${i}`}>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="stat-card-glass bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 relative h-full hover:scale-105 transition-all duration-300">
                {/* Step Number Badge */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-2">
                      <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                        {title}
                      </span>
                    </h4>
                    {description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Progress Indicator */}
                <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Step {i + 1} of {steps.length}</span>
                </div>
              </div>
              
              {/* Connecting Arrow (hidden on last item and mobile) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-blue-500 opacity-50" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
