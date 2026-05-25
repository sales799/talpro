import { clients, type ClientLogo } from '@/data/clients';

/**
 * Responsive proof-category strip.
 */

function LogoItem({ client }: { client: ClientLogo }) {
  if (client.logo) {
    return (
      <img
        src={client.logo}
        alt={client.name}
        className="h-7 md:h-8 w-auto object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
      />
    );
  }
  return (
    <span className="block truncate border border-border bg-background px-4 py-2 text-center text-sm font-semibold text-muted-foreground hover:border-accent/40 hover:text-foreground transition-colors md:whitespace-nowrap select-none">
      {client.name}
    </span>
  );
}

export default function LogoTicker() {
  return (
    <section className="w-full overflow-hidden py-8 md:py-10 border-y border-border/50 bg-muted/30">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/70 mb-6">
        Talent reach across India's critical hiring lanes
      </p>

      <div className="px-4">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3 md:flex md:flex-wrap md:items-center md:justify-center">
          {clients.map((client) => (
            <div key={client.name} className="min-w-0 md:shrink-0">
              <LogoItem client={client} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
