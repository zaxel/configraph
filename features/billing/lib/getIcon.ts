import { PLANS } from "../config/plans";
import { Plan } from "../types/billing.types";

export function getPlanIcon(plan: Plan) {
  return PLANS[plan ?? "free"].icon;
}