import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/features/account/services/ensure-profile";
import { getUserEntitlements } from "@/features/billing/lib/entitlements";
import { EntitlementsProvider } from "@/features/billing/context/entitlements.context";
import { refreshEntitlements } from "@/features/billing/actions/refreshEntitlements.action";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId)
    redirect("/sign-in");

  await ensureProfile();

  const entitlements = await getUserEntitlements();

  return (
    <EntitlementsProvider
      value={entitlements}
      onRefresh={refreshEntitlements}
    >
      {children}
    </EntitlementsProvider>
  );
}