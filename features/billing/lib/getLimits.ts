import { PLANS } from "../config/plans";
import { Plan } from "../types/billing.types";

export const getLimits = (plan: Plan) => {
    return PLANS[plan ?? "free"].limits;
}