import { PLANS } from "../config/plans";
import { PlanName, UsageSnapshot } from "../types/billing.types";

function getPlan(plan: PlanName) {
  return PLANS[plan] ?? PLANS.free;
}

export function canCreateConfigurator(
  plan: PlanName,
  usage: UsageSnapshot
) {
  const limit = getPlan(plan).limits.configurators;

  if (limit === null) return true;

  return usage.configuratorsCount < limit;
}

export function canUploadFile(
  plan: PlanName,
  fileSizeMb: number
) {
  const limit = getPlan(plan).limits.uploadMb;

  return fileSizeMb <= limit;
}

export function canExportWithoutWatermark(
  plan: PlanName
) {
  return !getPlan(plan).features.watermark;
}

export function canUseCanvasEditor(
  plan: PlanName
) {
  return getPlan(plan).features.canvasEditor;
}

export function canUsePrioritySupport(
  plan: PlanName
) {
  return getPlan(plan).features.prioritySupport;
}

export function canUseApi(
  plan: PlanName
) {
  return getPlan(plan).features.apiAccess;
}

export function canUseTeamAccess(
  plan: PlanName
) {
  return getPlan(plan).features.teamAccess;
}
