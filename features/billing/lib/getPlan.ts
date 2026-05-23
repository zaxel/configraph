import { SubscriptionRecord } from "../types/billing.types";

export function getPlan(subscription?: SubscriptionRecord) {
  return subscription?.plan ?? "free";
}