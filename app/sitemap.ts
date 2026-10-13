import type { MetadataRoute } from "next";
import { routes } from "@/content/site";
import { absoluteUrl, isPublic } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isPublic) return [];
  return routes.map((path) => ({
    url: absoluteUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
