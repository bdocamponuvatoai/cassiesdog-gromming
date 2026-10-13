const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(
  /\/$/,
  "",
);

/** Canonical origin. Falls back to localhost when no public URL is configured. */
export const siteUrl = configuredUrl || "http://localhost:3000";

/** Indexing is only enabled once a canonical public URL has been configured. */
export const isPublic = Boolean(configuredUrl);

export function absoluteUrl(path = "/") {
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}
