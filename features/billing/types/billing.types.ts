import { PLANS } from "../config/plans";
import { ComponentType } from "react";

export type PlanName = keyof typeof PLANS;

export type StripeStatus = "active" | "trialing" | "past_due" | "canceled" | "inactive" | "unpaid";

export type Plan = "free" | "pro" | "business";

export type UsageSnapshot = {
    configuratorsCount: number;
    storageUsedMb: number;
    publishedNumber: number;
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

export type PlanLimits = {
    configurators: number | null,
    uploadMb: number,
}

export type Entitlements = {
    plan: Plan;
    usage: UsageSnapshot;
    limits: PlanLimits,
    permissions: {
        canCreateConfigurator: boolean;
        canUseCanvasEditor: boolean;
        canUseApi: boolean;
        canUploadFile: boolean;
        canExportWithoutWatermark: boolean;
        canUsePrioritySupport: boolean;
        canUseTeamAccess: boolean;
    };
};
export type PermissionKey = keyof Entitlements["permissions"];

export interface PlanFeatures {
  watermark: boolean;
  canvasEditor: boolean;
  prioritySupport: boolean;
  apiAccess: boolean;
  teamAccess: boolean;
  analytics: boolean;
}

export interface PlanDetails {
    price: number;
    popular: boolean;
    description: string;
    icon: ComponentType<{ className?: string }>; // Lucide icon type definition
    limits: PlanLimits;
    featuresDescription: readonly string[];
    features: PlanFeatures;
}

export type PlansConfig = Record<Plan, PlanDetails>;