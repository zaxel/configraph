"use server";

import { auth } from "@clerk/nextjs/server";
import { getUserEntitlements } from "../lib/entitlements";


export async function refreshEntitlements() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
    return getUserEntitlements();
}