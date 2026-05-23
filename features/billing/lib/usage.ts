export function getConfiguratorUsage(clerkUserId: string) {
    return 4;
}

export function getStorageUsage(clerkUserId: string) {
    return 3;
}

export function getUsageSnapshot(clerkUserId: string) {
    return {
        configuratorsCount: getStorageUsage(clerkUserId),
        storageUsedMb: getConfiguratorUsage(clerkUserId)
    }
}




