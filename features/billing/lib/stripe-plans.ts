export const STRIPE_PRICE_TO_PLAN = {
  [process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!]: "pro",
  [process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID!]: "business",
} as const;

export const PLAN_TO_STRIPE_PRICE = {
  "pro": process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID!, 
  "business": process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID!,
} as const;