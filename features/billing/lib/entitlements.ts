import { getSubscriptionByClerkIdAction } from "../actions/getSubscriptionByClerkIdAction";
import { canCreateConfigurator, canExportWithoutWatermark, canUploadFile, canUseApi, canUseCanvasEditor, canUsePrioritySupport, canUseTeamAccess } from "./permissions";
import { getUsageSnapshot } from "./usage";

export async function getUserEntitlements(
    clerkUserId: string
) {
    const subscription = await getSubscriptionByClerkIdAction();

    const plan = subscription?.plan ?? "free";

    const usage = await getUsageSnapshot();

    return {
        plan,
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