import type { MetadataRoute } from "next";
import { absoluteUrl, isPublic } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  if (!isPublic) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
