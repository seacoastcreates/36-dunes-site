export type RetainerPlan = {
  priceId: string;
  label: string;
};

export const retainerPlans: RetainerPlan[] = [
  { priceId: process.env.STRIPE_STANDARD_PRICE_ID ?? "", label: "Standard — $500/mo" },
  { priceId: process.env.STRIPE_EXTENDED_PRICE_ID ?? "", label: "Extended — $1,500/mo" },
].filter((plan) => plan.priceId.startsWith("price_"));
