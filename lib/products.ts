export type Product = {
  /** Anchor id of the product's section on /products. */
  slug: string;
  name: string;
  eyebrow: string;
  shortDescription: string;
};

/** Products shown on /products, in page order. Add a new product here and
 * give it a section with the matching id on the page. */
export const products: Product[] = [
  {
    slug: "prospect-radar",
    name: "Prospect Radar",
    eyebrow: "SALES PROSPECTING",
    shortDescription:
      "Every business in your territory, researched and ranked by how likely it is to buy what you sell, with a call brief and a shared call log.",
  },
];
