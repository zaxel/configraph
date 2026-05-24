import { getConfiguratorUsageAction } from "../actions/getConfiguratorUsageAction";
import { getPublishedNumberAction } from "../actions/getPublishedNumberAction";
import { getStorageUsageMbAction } from "../actions/getStorageUsageMbAction";


export async function getUsageSnapshot() {
    return {
        configuratorsCount: await getConfiguratorUsageAction() ?? 0,
        storageUsedMb: await getStorageUsageMbAction() ?? 0,
        publishedNumber: await getPublishedNumberAction() ?? 0
    }
}




