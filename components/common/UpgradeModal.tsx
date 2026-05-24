import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    title: string;
    description: string;

    suggestedPlan?: "pro" | "business";

    onUpgrade?: () => void;
};

export function UpgradeModal({
    open,
    onOpenChange,
    title,
    description,
    onUpgrade,
}: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
            >
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>

                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="cursor-pointer"
                    >
                        Cancel
                    </Button>
                    <Link href="/dashboard/billing#plans">
                        <Button onClick={onUpgrade}
                            className="cursor-pointer"
                        >
                            Upgrade Plan
                        </Button>
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}