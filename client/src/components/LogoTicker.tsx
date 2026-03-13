import { clients, type ClientLogo } from '@/data/clients';

/**
 * Infinite horizontal scrolling logo ticker.
 *
 * Uses pure CSS animation on a duplicated list to create the
 * seamless loop effect — no JS timers or Intersection Observer needed.
 *
 * The ticker is paused on hover so users can inspect a logo.
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
  // Text placeholder until real logos are added
  return (
    <span className="text-sm md:text-base font-semibold tracking-wide text-muted-foreground/40 hover:text-foreground/70 transition-colors whitespace-nowrap select-none">
      {client.name}
    </span>
  );
}

export default function LogoTicker() {
  // Duplicate list for seamless infinite scroll
  const doubled = [...clients, ...clients];

  return (
    <section className="w-full overflow-hidden py-8 md:py-10 border-y border-border/50 bg-muted/30">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/60 mb-6">
        Trusted by fast-growing companies
      </p>

      <div className="relative group">
        {/* Edge fade masks */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-12 md:gap-16 animate-ticker group-hover:[animation-play-state:paused]">
          {doubled.map((client, i) => (
            <div key={`${client.name}-${i}`} className="shrink-0">
              <LogoItem client={client} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
