import { describe, expect, it } from "vitest";
import {
  breadcrumbJsonLd,
  businessJsonLd,
  serializeJsonLd,
} from "../lib/structured-data";

describe("structured data", () => {
  it("escapes markup so values cannot close the script element", () => {
    const out = serializeJsonLd({ name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("<");
    expect(JSON.parse(out).name).toBe("</script><script>alert(1)</script>");
  });

  it("builds breadcrumbs from explicit paths", () => {
    const crumbs = breadcrumbJsonLd("Gallery", "/gallery");
    const items = crumbs.itemListElement as { name: string; item: string }[];
    expect(items.map((i) => i.name)).toEqual(["Home", "Gallery"]);
    expect(items[1].item).toMatch(/\/gallery$/);
  });

  it("describes the business and FAQs", () => {
    const graph = businessJsonLd()["@graph"] as { "@type": string }[];
    expect(graph.map((node) => node["@type"])).toEqual([
      "LocalBusiness",
      "FAQPage",
    ]);
  });
});
