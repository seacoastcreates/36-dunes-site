export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateDisplay: string;
  readTime: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-photonester",
    title: "Building PhotoNester: Teaching an iPhone to Organize a Million Memories",
    excerpt:
      "An app that sorts your entire camera roll into Travel, Pets, Food, and more — without a single photo ever leaving your phone. Here's how it actually works, and the bug that almost shipped a broken app.",
    date: "2026-09-16",
    dateDisplay: "September 16, 2026",
    readTime: "6 min read",
    tags: ["Build log", "On-device ML"],
  },
  {
    slug: "custom-model-vs-api",
    title: "When to Build a Custom Model vs. Use an API",
    excerpt:
      "OpenAI's API is the right call more often than most technical founders want to admit. Here's the actual decision tree, not the sales pitch.",
    date: "2026-09-14",
    dateDisplay: "September 14, 2026",
    readTime: "9 min read",
    tags: ["Decision guide", "ML strategy"],
  },
];
