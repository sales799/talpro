import { CheckCircle2, ArrowRight } from "lucide-react";

export function ProcessTimeline({ steps }: { steps: string[] }) {
  if (!steps?.length) return null;

  return (
    <div className="relative" data-testid="process-timeline">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((s, i) => {
          const [title, ...descParts] = s.split(":");
          const description = descParts.join(":").trim();
          return (
            <div
              key={i}
              className="relative"
              data-testid={`timeline-step-${i}`}
            >
              <div className="bg-background border border-border rounded-2xl p-6 h-full hover:shadow-md transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-[hsl(222,47%,11%)] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      {title}
                    </h3>
                    {description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[hsl(160,84%,39%)] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    Step {i + 1} of {steps.length}
                  </span>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-primary opacity-50" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
