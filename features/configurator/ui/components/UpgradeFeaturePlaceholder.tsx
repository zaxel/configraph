"use client";

import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    title: string;
    description: string;

    onUpgrade?: () => void;
};

export default function UpgradeFeaturePlaceholder({
    title,
    description,
    onUpgrade,
}: Props) {
    return (
        <div
            className="
        w-full
        rounded-2xl
        border
        border-dashed
        border-border
        bg-muted/30
        p-6
      "
        >
            <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <div
                        className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-background
              border
            "
                    >
                        <Lock className="h-5 w-5" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <h3 className="text-base font-semibold">
                            {title}
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Link href="/dashboard/billing#plans">
                        <Button
                            onClick={onUpgrade}
                            className="w-max cursor-pointer"
                        >
                            Upgrade Plan
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}