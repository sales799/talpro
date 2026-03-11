import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics";

export function ContactCTA({
  serviceName,
  label = "Request Talent"
}: {
  serviceName: string;
  label?: string;
}) {
  const href = `/contact?service=${encodeURIComponent(serviceName)}`;

  const onClick = () => {
    analytics.event("cta_click", {
      event_category: "service",
      event_label: serviceName,
      service_name: serviceName
    });
  };

  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className="btn-gradient-hover group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white rounded-2xl shadow-lg"
        data-testid="button-contact-cta"
      >
        <span className="relative z-10 flex items-center gap-2">
          {label}
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </button>
    </Link>
  );
}
