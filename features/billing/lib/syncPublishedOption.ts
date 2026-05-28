import { createServiceSupabaseClient } from "@/lib/supabase/service";
import { PLANS } from "../config/plans"
import { PermissionValues, Plan } from "../types/billing.types"
import { createConfiguratorRepo } from "@/features/configurators/repositories/configurator.repo";

const mapPlanToRuntime = (plan: Plan): PermissionValues => {
    const options = PLANS[plan];
    return {
        "canUseApi": options.features.apiAccess,
        "canUploadFile": false,
        "canUseTeamAccess": options.features.teamAccess,
        "canUseCanvasEditor": options.features.canvasEditor,
        "canCreateConfigurator": false,
        "canUsePrioritySupport": options.features.prioritySupport,
        "canExportWithoutWatermark": !options.features.watermark,
    }
}

export const syncPublishedOption = async (plan: Plan, clerkUserId: string) => {
    const runtimeOptions = mapPlanToRuntime(plan);

    const supabase = await createServiceSupabaseClient();
    const configuratorsRepo = createConfiguratorRepo(supabase);

    await configuratorsRepo.updateRuntime(clerkUserId, runtimeOptions);  
}