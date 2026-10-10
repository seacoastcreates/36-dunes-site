import { blogPosts } from "./blog";
import { services } from "./services";

export type SearchEntry = {
  title: string;
  description: string;
  url: string;
  type: "Blog" | "Service" | "Work" | "Page";
};

const staticEntries: SearchEntry[] = [
  {
    title: "Services",
    description:
      "Machine learning consulting, custom AI development, automation, and MLOps — see every service.",
    url: "/services",
    type: "Page",
  },
  {
    title: "Blog",
    description: "Build logs and decision guides — real trade-offs, specific stack choices.",
    url: "/blog",
    type: "Page",
  },
  {
    title: "PhotoNester",
    description:
      "On-device photo-sorting iOS app: CLIP embeddings converted to Core ML, unsupervised k-means clustering, no photo ever leaves the phone.",
    url: "/work/photonester",
    type: "Work",
  },
  {
    title: "Call List",
    description:
      "A researched, ranked sales-prospecting list built so a rep can start dialing instead of researching.",
    url: "/work/call-list",
    type: "Work",
  },
  {
    title: "AI Readiness Checklist",
    description: "A free checklist for figuring out whether your business is actually ready for AI.",
    url: "/resources/ai-readiness-checklist",
    type: "Page",
  },
  {
    title: "Request a proposal",
    description: "Tell us what you're building — start a project with 36 Dunes.",
    url: "/rfp",
    type: "Page",
  },
];

export function getSearchIndex(): SearchEntry[] {
  const blogEntries: SearchEntry[] = blogPosts.map((post) => ({
    title: post.title,
    description: post.excerpt,
    url: `/blog/${post.slug}`,
    type: "Blog",
  }));

  const serviceEntries: SearchEntry[] = services.map((service) => ({
    title: service.name,
    description: service.shortDescription,
    url: `/services/${service.slug}`,
    type: "Service",
  }));

  return [...staticEntries, ...serviceEntries, ...blogEntries];
}

/** Simple substring scoring: title hits outrank description hits, an exact
 * title-start match outranks a mid-string one. No fuzzy matching — the
 * index is small enough (a few dozen entries) that this stays fast and the
 * ranking stays predictable, so a real search library isn't worth the
 * dependency yet. */
export function searchIndex(entries: SearchEntry[], query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  return entries
    .map((entry) => {
      const title = entry.title.toLowerCase();
      const description = entry.description.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += title.startsWith(term) ? 4 : 3;
        if (description.includes(term)) score += 1;
      }
      return { entry, score };
    })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((result) => result.entry);
}
