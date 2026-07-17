import { createElement } from "react";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { beforeEach, describe, expect, it } from "vitest";
import SEO from "@/components/SEO";

describe("SEO title governance", () => {
  beforeEach(() => {
    document.title = "";
  });

  it("does not append a second Talpro brand suffix with different casing", async () => {
    render(createElement(
      HelmetProvider,
      null,
      createElement(SEO, {
        title: "Technology Talent & GCC Workforce Partner | Talpro",
        description: "Governed Talpro page",
        path: "/",
      }),
    ));

    await waitFor(() => {
      expect(document.title).toBe("Technology Talent & GCC Workforce Partner | Talpro");
    });
  });

  it("adds the brand suffix when the title has no Talpro reference", async () => {
    render(createElement(
      HelmetProvider,
      null,
      createElement(SEO, {
        title: "Accessibility Statement",
        description: "Accessibility information",
        path: "/accessibility",
      }),
    ));

    await waitFor(() => {
      expect(document.title).toBe("Accessibility Statement | TalPro");
    });
  });
});
