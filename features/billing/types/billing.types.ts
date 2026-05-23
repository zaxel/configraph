import { PLANS } from "../config/plans";

export type PlanName = keyof typeof PLANS;

export type StripeStatus = "active" | "trialing" | "past_due" | "canceled" | "inactive" | "unpaid";

export type Plan = "free" | "pro" | "business";

export type UsageSnapshot = {
  configuratorsCount: number;
  storageUsedMb: number;
};

export type SubscriptionRecord = {
    id: string,
    clerk_user_id: string,
    stripe_customer_d: string,
    stripe_subscription_id: string,
    plan: Plan,
    strip_status: StripeStatus,
    current_period_end: string,
    cancel_at_period_end: boolean,
    crater_at: string,
    updated_at: string,
}