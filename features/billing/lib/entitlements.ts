import { getSubscriptionByClerkIdAction } from "../actions/getSubscriptionByClerkIdAction";
import { getLimits } from "./getLimits";
import { canCreateConfigurator, canExportWithoutWatermark, canUploadFile, canUseApi, canUseCanvasEditor, canUsePrioritySupport, canUseTeamAccess } from "./permissions";
import { getUsageSnapshot } from "./usage";

export async function getUserEntitlements(
    clerkUserId: string
) {
    const subscription = await getSubscriptionByClerkIdAction();

    const plan = subscription?.plan ?? "pro";

    const usage = await getUsageSnapshot();
    const limits = getLimits(plan);

    return {
        plan,
        limits, 
        usage,
        permissions: {
            canCreateConfigurator: canCreateConfigurator(plan, usage),
            canUseCanvasEditor: canUseCanvasEditor(plan),
            canUseApi: canUseApi(plan),
            canUploadFile: canUploadFile(plan, usage.storageUsedMb),
            canExportWithoutWatermark: canExportWithoutWatermark(plan),
            canUsePrioritySupport: canUsePrioritySupport(plan),
            canUseTeamAccess: canUseTeamAccess(plan),
        },
    };
}