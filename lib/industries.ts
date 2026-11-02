// Buyer-intent landing pages for Prospect Radar, one per market we have
// actually built a list for. Numbers come from those builds (see
// app/products/page.tsx); keep them in sync if a list is rebuilt.
export type Industry = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lede: string;
  forWho: string;
  buyers: string[];
  signals: string[];
  stats: { label: string; value: string }[];
  region: string;
};

export const industries: Industry[] = [
  {
    slug: "dock-and-marine",
    metaTitle: "Sales Leads for Dock & Marine Dealers in NH, Maine & MA — 36 Dunes",
    metaDescription:
      "A ranked list of the marinas, yacht clubs, camps, lake associations and waterfront resorts in your territory that buy docks, with a contact and a reason to call each one. First 10 leads free.",
    eyebrow: "PROSPECT LISTS · DOCK & MARINE DEALERS",
    h1: "Every marina, camp and lake association worth calling, ranked.",
    lede:
      "If you sell docks, floats, swim platforms or kayak launches, your buyers are scattered across hundreds of lakes and most of them are not in any directory. We research every waterfront business in your territory, rank each by how likely it is to buy, and tell you why.",
    forWho: "Dock, float and marine equipment dealers serving New Hampshire, Maine and Massachusetts lakes.",
    buyers: [
      "Marinas and boat clubs",
      "Yacht clubs and sailing programs",
      "Summer camps",
      "Lake associations and town beaches",
      "Waterfront resorts and campgrounds",
    ],
    signals: [
      "Aging or ice-damaged docks",
      "Storm damage and rebuilds",
      "Slip waitlists",
      "Planned expansions",
    ],
    stats: [
      { label: "Businesses researched", value: "878" },
      { label: "Kept as real buyers", value: "696" },
      { label: "Tier A (call first)", value: "139" },
      { label: "With a direct email", value: "358" },
    ],
    region: "NH, Maine and north-central MA lakes",
  },
  {
    slug: "electronic-components",
    metaTitle: "Sales Leads for Electronic Component Brokers in New England — 36 Dunes",
    metaDescription:
      "A ranked list of the contract manufacturers, board and cable assemblers and OEMs in your territory that need shortage and obsolete parts, with a contact and a reason to call. First 10 leads free.",
    eyebrow: "PROSPECT LISTS · ELECTRONIC COMPONENT BROKERS",
    h1: "The manufacturers in your region that need hard-to-find parts.",
    lede:
      "Component brokers win on relationships with buyers who have shortage and end-of-life problems. We research every contract manufacturer, assembler and OEM in your territory, rank them by fit, and tag the ones likely to have excess inventory to sell you.",
    forWho: "Independent electronic component brokers and distributors serving New Hampshire, Maine and northern Massachusetts.",
    buyers: [
      "Contract manufacturers (EMS)",
      "Board and cable assemblers",
      "Electronics OEMs",
      "Excess-inventory sources, tagged separately",
    ],
    signals: [
      "Legacy and obsolete part demand",
      "Surplus stock to offload",
      "New purchasing hires",
    ],
    stats: [
      { label: "Businesses researched", value: "1,110" },
      { label: "Kept as real buyers", value: "472" },
      { label: "Tier A (call first)", value: "94" },
      { label: "With a direct email", value: "249" },
    ],
    region: "NH, Maine and northern MA",
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
