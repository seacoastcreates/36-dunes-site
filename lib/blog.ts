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
    slug: "building-moodlens",
    title: "Building MoodLens: a mood journal that reads between the lines",
    excerpt:
      "How I built an iPhone app that reads the emotion in what you write or say, keeps your data private, and costs almost nothing to run.",
    date: "2026-09-26",
    dateDisplay: "September 26, 2026",
    readTime: "5 min read",
    tags: ["Build log", "Privacy"],
  },
  {
    slug: "review-intelligence-prototype",
    title: "What a 4.16-Star Average Doesn't Tell You",
    excerpt:
      "Building a review-intelligence prototype for a multi-line hospitality business: sentiment scoring, zero-shot aspect classification, and what 1,531 real reviews revealed once broken out by business line.",
    date: "2026-09-18",
    dateDisplay: "September 18, 2026",
    readTime: "7 min read",
    tags: ["Applied NLP", "Client pitch"],
  },
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
