"use client"

import Link from "next/link";
import { useEntitlements } from "../billing/context/entitlements.context";
import { useState } from "react";
import { UpgradeModal } from "@/components/common/UpgradeModal";

const AddConfigurator = ({ children }: { children: React.ReactNode }) => {
  const { permissions } = useEntitlements();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  return (
    <>
      {permissions.canCreateConfigurator ? (
        <Link href="/builder">
          {children}
        </Link>
      ) : (
        <div 
          onClick={() => setUpgradeOpen(true)} 
        >
          {children}
        </div>
      )}

      <UpgradeModal
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        title="You reached the limit of configurators available on your plan"
        description="Upgrade your plan to unlock the ability to add more configurators."
      />
    </>
  );
};

export default AddConfigurator;