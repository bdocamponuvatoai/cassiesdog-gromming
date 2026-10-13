import { faqs, services, site } from "@/content/site";
import { absoluteUrl, siteUrl } from "@/lib/site-config";

export type JsonLdObject = { [key: string]: unknown };

/**
 * Serializes JSON-LD for inline <script> injection. Escaping `<` prevents a
 * string value from closing the script element early.
 */
export function serializeJsonLd(data: JsonLdObject) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

const businessId = `${siteUrl}/#business`;

export function businessJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        telephone: site.tel,
        url: siteUrl,
        areaServed: site.areaServed,
        sameAs: [site.facebook],
        description:
          "Independent dog grooming at Buckeye K9 in the Obetz area. Baths, haircuts and nail trims for all breeds and sizes.",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

export function servicesJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((s) => ({
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: {
        "@type": "LocalBusiness",
        "@id": businessId,
        name: site.name,
        url: siteUrl,
      },
      areaServed: site.areaServed,
    })),
  };
}

export function breadcrumbJsonLd(name: string, path: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl() },
      { "@type": "ListItem", position: 2, name, item: absoluteUrl(path) },
    ],
  };
}
