export function getConfiguratorUsage(clerkUserId: string) {
    console.log('getting usage');
    return 3;
}

export function getStorageUsage(clerkUserId: string) {
    console.log('getting storage');
    return 245;
}

export function getUsageSnapshot(clerkUserId: string) {
    return {
        configuratorsCount: getStorageUsage(clerkUserId),
        storageUsedMb: getConfiguratorUsage(clerkUserId)
    }
}




