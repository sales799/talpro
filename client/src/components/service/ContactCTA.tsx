import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { analytics } from "@/lib/analytics";

export function ContactCTA({
  serviceName,
  label = "Request Talent",
}: {
  serviceName: string;
  label?: string;
}) {
  const href = `/contact?service=${encodeURIComponent(serviceName)}`;
  const onClick = () => {
    analytics.event("cta_click", {
      event_category: "service",
      event_label: serviceName,
      service_name: serviceName,
    });
  };

  return (
    <Link href={href}>
      <button
        onClick={onClick}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[hsl(174,84%,32%)] text-white font-semibold rounded-xl shadow-lg shadow-teal-700/20 hover:brightness-110 transition-all"
        data-testid="button-contact-cta"
      >
        {label}
        <ArrowRight className="h-5 w-5" />
      </button>
    </Link>
  );
}
