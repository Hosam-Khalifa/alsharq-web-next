import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { staticPaths } from "@/config/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = site.url.replace(/\/$/, "");

  return site.locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
