import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureProfile } from "@/features/account/services/ensure-profile";
import { getUserEntitlements } from "@/features/billing/lib/entitlements";
import { EntitlementsProvider } from "@/features/billing/context/entitlements.context";
import { refreshEntitlementsAction } from "@/features/billing/actions/getPlanAction";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId)
    redirect("/sign-in");

  await ensureProfile();

  const entitlements = await getUserEntitlements(userId);

  return (
    <EntitlementsProvider
      value={entitlements}
      onRefresh={refreshEntitlementsAction}
    >
      {children}
    </EntitlementsProvider>
  );
}