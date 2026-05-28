import { getStorageUsageMb } from "./getStorageUsageMb";
import { getConfiguratorUsage } from "./getConfiguratorUsage";
import { getPublishedNumber } from "./getPublishedNumber";


export async function getUsageSnapshot() {
    return {
        configuratorsCount: await getConfiguratorUsage() ?? 0,
        storageUsedMb: await getStorageUsageMb() ?? 0,
        publishedNumber: await getPublishedNumber() ?? 0
    }
}




