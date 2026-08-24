import type { MetadataRoute } from "next";
import { locales, localePath } from "@/lib/i18n";
import { projects } from "@/content/projects";
import { profile } from "@/content/site";

const base = `https://${profile.domain}`;
const staticPaths = ["", "work", "resume", "contact"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${base}${localePath(lang, path)}`,
        changeFrequency: path === "" ? "monthly" : "yearly",
        priority: path === "" ? 1 : 0.8,
      });
    }
    for (const project of projects) {
      entries.push({
        url: `${base}${localePath(lang, `work/${project.slug}`)}`,
        changeFrequency: "yearly",
        priority: project.featured ? 0.7 : 0.5,
      });
    }
  }

  return entries;
}
