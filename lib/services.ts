export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  eyebrow: string;
};

export const services: Service[] = [
  {
    slug: "machine-learning-consulting",
    name: "Machine Learning Consulting",
    shortDescription:
      "An outside technical opinion on where ML actually fits in your business — before you commit budget to building it.",
    eyebrow: "STRATEGY",
  },
  {
    slug: "custom-ai-development",
    name: "Custom AI Development",
    shortDescription:
      "Task-specific models built for your data, not a wrapper around someone else's API.",
    eyebrow: "BUILD",
  },
  {
    slug: "ai-automation",
    name: "AI Automation for Businesses",
    shortDescription:
      "Turn the manual, repetitive parts of your operation into pipelines that run themselves.",
    eyebrow: "AUTOMATE",
  },
  {
    slug: "mlops-consulting",
    name: "MLOps Consulting",
    shortDescription:
      "The unglamorous infrastructure work that keeps a model reliable after the demo — versioning, monitoring, retraining.",
    eyebrow: "OPERATE",
  },
];
