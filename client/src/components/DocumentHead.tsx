import { useLayoutEffect } from 'react';

function upsertMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
  element.dataset.talproHead = 'true';
}

export function useCanonicalHead(href: string) {
  useLayoutEffect(() => {
    let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!element) {
      element = document.createElement('link');
      element.rel = 'canonical';
      document.head.appendChild(element);
    }
    element.href = href;
    element.dataset.talproHead = 'true';
  }, [href]);
}

export function useSeoHead(input: {
  title: string;
  description: string;
  url?: string;
  image: string;
  type: 'website' | 'article';
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}) {
  const jsonLd = input.jsonLd ? JSON.stringify(input.jsonLd) : '';

  useLayoutEffect(() => {
    document.title = input.title;
    upsertMeta('name', 'description', input.description);
    upsertMeta('property', 'og:title', input.title);
    upsertMeta('property', 'og:description', input.description);
    upsertMeta('property', 'og:type', input.type);
    if (input.url) upsertMeta('property', 'og:url', input.url);
    upsertMeta('property', 'og:image', input.image);
    upsertMeta('property', 'og:site_name', 'TalPro');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', '@talproindia');
    upsertMeta('name', 'twitter:title', input.title);
    upsertMeta('name', 'twitter:description', input.description);
    upsertMeta('name', 'twitter:image', input.image);

    const scriptId = 'talpro-page-jsonld';
    const existing = document.getElementById(scriptId);
    if (jsonLd) {
      const script = existing instanceof HTMLScriptElement ? existing : document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.dataset.talproHead = 'true';
      script.textContent = jsonLd;
      if (!script.isConnected) document.head.appendChild(script);
    } else {
      existing?.remove();
    }
  }, [input.description, input.image, input.title, input.type, input.url, jsonLd]);
}

export function DocumentJsonLd({ id, value }: { id: string; value: Record<string, unknown> }) {
  const json = JSON.stringify(value);

  useLayoutEffect(() => {
    const elementId = `talpro-jsonld-${id}`;
    const existing = document.getElementById(elementId);
    const script = existing instanceof HTMLScriptElement ? existing : document.createElement('script');
    script.id = elementId;
    script.type = 'application/ld+json';
    script.dataset.talproHead = 'true';
    script.textContent = json;
    if (!script.isConnected) document.head.appendChild(script);
    return () => script.remove();
  }, [id, json]);

  return null;
}
