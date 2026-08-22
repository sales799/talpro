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
    <Link
      href={href}
      onClick={onClick}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-accent-foreground shadow-lg shadow-teal-700/20 transition-all hover:brightness-110"
      data-testid="button-contact-cta"
    >
      {label}
      <ArrowRight className="h-5 w-5" />
    </Link>
  );
}
