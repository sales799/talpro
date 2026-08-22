import { createElement } from "react";
import { render, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import SEO from "@/components/SEO";

describe("SEO title governance", () => {
  beforeEach(() => {
    document.title = "";
  });

  it("does not append a second Talpro brand suffix with different casing", async () => {
    render(createElement(SEO, {
      title: "Technology Talent & GCC Workforce Partner | Talpro",
      description: "Governed Talpro page",
      path: "/",
    }));

    await waitFor(() => {
      expect(document.title).toBe("Technology Talent & GCC Workforce Partner | Talpro");
    });
  });

  it("adds the brand suffix when the title has no Talpro reference", async () => {
    render(createElement(SEO, {
      title: "Accessibility Statement",
      description: "Accessibility information",
      path: "/accessibility",
    }));

    await waitFor(() => {
      expect(document.title).toBe("Accessibility Statement | TalPro");
    });
  });

  it("writes route metadata and structured data without duplicate head tags", async () => {
    render(createElement(SEO, {
      title: "Trust Centre",
      description: "Governed trust evidence",
      path: "/trust",
      jsonLd: { "@context": "https://schema.org", "@type": "WebPage" },
    }));

    await waitFor(() => {
      expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toBe("Governed trust evidence");
      expect(document.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe("https://talproindia.com/trust");
      expect(document.querySelectorAll('#talpro-page-jsonld')).toHaveLength(1);
    });
  });
});
