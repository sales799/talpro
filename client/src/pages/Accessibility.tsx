import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function Accessibility() {
  return (
    <>
      <SEO
        title="Accessibility Statement | Talpro India"
        description="Talpro's accessibility approach and feedback route for talproindia.com."
        path="/accessibility"
      />
      <main className="pt-16">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accessibility" }]} />
        <section className="mx-auto max-w-4xl px-4 py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">Accessibility</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">Accessibility statement</h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
            <p>Talpro aims to make this website usable with keyboards, screen readers, text zoom, reduced motion preferences, and common assistive technologies.</p>
            <section>
              <h2 className="text-lg font-semibold text-foreground">Current baseline</h2>
              <p className="mt-2">The site uses semantic headings, labelled controls, visible focus states, descriptive link text, form error messages, and responsive layouts. Automated and manual checks remain part of the release gate.</p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-foreground">Known limitation</h2>
              <p className="mt-2">Third-party application or scheduling pages are operated outside Talpro's website and may have different accessibility support. Please contact us if an external step blocks your application or enquiry.</p>
            </section>
            <section className="rounded-2xl border border-border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold text-foreground">Request help or report a barrier</h2>
              <p className="mt-2">Email <a className="underline" href="mailto:hello@talproindia.com">hello@talproindia.com</a> with the page, the barrier, and the format or assistance you need. Talpro will review the request and provide an appropriate route.</p>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
