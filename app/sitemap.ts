import type { MetadataRoute } from "next";
import { services } from "../lib/services";
import { blogPosts } from "../lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: "https://36dunes.com", lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: "https://36dunes.com/services", lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: "https://36dunes.com/work/photonester", lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: "https://36dunes.com/work/call-list", lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: "https://36dunes.com/blog", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://36dunes.com/rfp", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    {
      url: "https://36dunes.com/resources/ai-readiness-checklist",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `https://36dunes.com/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://36dunes.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
