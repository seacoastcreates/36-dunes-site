export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateDisplay: string;
  readTime: string;
  tags: string[];
  /** Path under /public to a ~720x540 (4:3) thumbnail. Shown on the blog
   * index card and next to the post's own title. Optional for older posts
   * published before every post carried an image; new posts should set it. */
  image?: string;
  imageAlt?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-swingsync",
    title: "Building SwingSync: Comparing Two Golf Swings That Don't Run at the Same Speed",
    excerpt:
      "An iPhone app for studying two golf swings side by side — synced by phase, not by the clock, with a local pose-estimation backend that refuses to guess timing markers more often than it offers one.",
    date: "2026-10-19",
    dateDisplay: "October 19, 2026",
    readTime: "8 min read",
    tags: ["Build log", "Computer Vision"],
    image: "/blog/building-swingsync/thumb.jpg",
    imageAlt: "Two overlaid golf swing pose skeletons, one gold and one silver, tracing the same swing sequence from address to follow-through with glowing ball-flight arcs, on a black background",
  },
  {
    slug: "building-hearth-index",
    title: "Building Hearth Index: Forecasting Home Prices for Every ZIP Code, Not Just the Metro",
    excerpt:
      "A one-day feasibility spike that forecasts home values for 894 metros and 26,268 ZIP codes, backtested against nine years of real outcomes. The two-part model, the ablation discipline, and the bugs it caught along the way.",
    date: "2026-10-09",
    dateDisplay: "October 9, 2026",
    readTime: "8 min read",
    tags: ["Build log", "MLOps"],
    image: "/blog/building-hearth-index/thumb.jpg",
    imageAlt: "A glowing amber city skyline hub connected to surrounding neighborhoods by forecast lines, on a dark clay-terracotta background",
  },
  {
    slug: "building-alpaca-explorer",
    title: "Building Alpaca Explorer: Asking the Market a Question Instead of Reading a Dashboard",
    excerpt:
      "A chat interface over live Alpaca market data, with Claude running a read-only tool-use loop instead of a wall of tickers. The architecture, the \"unusual options activity\" heuristic, and what I'd build next.",
    date: "2026-10-04",
    dateDisplay: "October 4, 2026",
    readTime: "7 min read",
    tags: ["Build log", "Agentic AI"],
    image: "/blog/building-alpaca-explorer/thumb.jpg",
    imageAlt: "Gold candlestick chart cresting into a network of connected nodes on a dark navy background",
  },
  {
    slug: "building-cellar-index",
    title: "Building Cellar Index: Teaching a Model Which Wines Are About to Change Price",
    excerpt:
      "Ten years of government PDF price lists turned into three production models — and the ablation discipline that rejected most of the features I tried. Plus what's still left to tune.",
    date: "2026-10-01",
    dateDisplay: "October 1, 2026",
    readTime: "8 min read",
    tags: ["Build log", "MLOps"],
    image: "/blog/building-cellar-index/thumb.jpg",
    imageAlt: "A gold forecasting price chart rising into a network of nodes, with a wine glass and bottle outlined in gold on a dark navy background",
  },
  {
    slug: "building-moodlens",
    title: "Building MoodLens: a mood journal that reads between the lines",
    excerpt:
      "How I built an iPhone app that reads the emotion in what you write or say, keeps your data private, and costs almost nothing to run.",
    date: "2026-09-26",
    dateDisplay: "September 26, 2026",
    readTime: "5 min read",
    tags: ["Build log", "Privacy"],
    image: "/blog/building-moodlens/thumb.jpg",
    imageAlt: "A gold line-art profile silhouette beside a glowing crescent moon and an arc of moon phases on a dark navy background",
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
    image: "/blog/review-intelligence-prototype/thumb.jpg",
    imageAlt: "Gold star-rating review cards dissolving into data particles connected to a network of hospitality icons on a dark navy background",
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
    image: "/blog/building-photonester/thumb.jpg",
    imageAlt: "Gold photo-frame icons clustering into a smartphone outline on a dark navy background",
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
    image: "/blog/custom-model-vs-api/thumb.jpg",
    imageAlt: "Two gold paths, one lined with network nodes and one with API brackets, converging at a glowing decision point on a dark navy background",
  },
];
