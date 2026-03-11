import { useEffect } from "react";

type SEO = { title: string; description: string };

interface MetaTagState {
  existed: boolean;
  content: string | null;
}

function setMeta(name: string, content: string, useProperty: boolean = false) {
  if (!content) return;
  
  const attribute = useProperty ? "property" : "name";
  const selector = `meta[${attribute}="${name}"]`;
  
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function captureMetaState(name: string, useProperty: boolean = false): MetaTagState {
  const attribute = useProperty ? "property" : "name";
  const selector = `meta[${attribute}="${name}"]`;
  const el = document.querySelector(selector);
  
  return {
    existed: !!el,
    content: el?.getAttribute("content") || null,
  };
}

function restoreMeta(name: string, state: MetaTagState, useProperty: boolean = false) {
  const attribute = useProperty ? "property" : "name";
  const selector = `meta[${attribute}="${name}"]`;
  const el = document.querySelector(selector);
  
  if (!el) return;
  
  if (state.existed) {
    if (state.content !== null) {
      el.setAttribute("content", state.content);
    } else {
      el.removeAttribute("content");
    }
  } else {
    el.remove();
  }
}

export function usePageSEO({ title, description }: SEO) {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = captureMetaState("description");
    const originalOgTitle = captureMetaState("og:title", true);
    const originalOgDescription = captureMetaState("og:description", true);
    const originalTwitterTitle = captureMetaState("twitter:title");
    const originalTwitterDescription = captureMetaState("twitter:description");
    
    if (title) document.title = title;
    if (description) {
      setMeta("description", description);
      setMeta("og:title", title, true);
      setMeta("og:description", description, true);
      setMeta("twitter:title", title);
      setMeta("twitter:description", description);
    }
    
    return () => {
      document.title = originalTitle;
      restoreMeta("description", originalDescription);
      restoreMeta("og:title", originalOgTitle, true);
      restoreMeta("og:description", originalOgDescription, true);
      restoreMeta("twitter:title", originalTwitterTitle);
      restoreMeta("twitter:description", originalTwitterDescription);
    };
  }, [title, description]);
}

export function useServiceJSONLD(opts: {
  name: string;
  description: string;
  slug: string;
}) {
  useEffect(() => {
    const id = `jsonld-service-${opts.slug}`;
    let el = document.getElementById(id);
    if (el) el.remove();
    const script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    script.text = JSON.stringify(
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: opts.name,
        description: opts.description,
        provider: { "@type": "Organization", name: "TalPro" },
        areaServed: "Global"
      },
      null,
      2
    );
    document.head.appendChild(script);
    return () => script.remove();
  }, [opts.name, opts.description, opts.slug]);
}
