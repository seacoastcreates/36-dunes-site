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
