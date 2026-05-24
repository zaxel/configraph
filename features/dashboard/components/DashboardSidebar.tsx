"use client"
import { Button } from "@/components/ui/button";
import { useEntitlements } from "@/features/billing/context/entitlements.context";
import { cn } from "@/lib/cn";
import { CreditCard, LayoutDashboard, Plus, Shapes, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import AddConfigurator from "../AddConfigurator";

export const sidebarItems = [
    {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "My Configurators",
        href: "/dashboard/configurators",
        icon: Shapes,
    },
    {
        label: "Billing",
        href: "/dashboard/billing",
        icon: CreditCard,
    },
    {
        label: "Profile",
        href: "/dashboard/profile",
        icon: User,
    },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { plan, usage, limits } = useEntitlements();

    return (
        <aside className="hidden md:flex w-72 shrink-0 border-r bg-background/80 backdrop-blur-xl">
            <div className="flex h-screen w-full flex-col">
                <div className="border-b px-6 py-2 h-16">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border bg-muted font-semibold">
                            C
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">
                                Configraph
                            </p>
                            <h2 className="font-semibold tracking-tight">
                                Dashboard
                            </h2>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-5">
                    <AddConfigurator>
                        <Button
                            className="mb-6 h-9 justify-start rounded-xl cursor-pointer"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            New Configurator
                        </Button>
                    </AddConfigurator>

                    <nav className="space-y-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;

                            const active =
                                item.href === "/dashboard"
                                    ? pathname === item.href
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex h-11 items-center gap-3 rounded-xl px-4 text-sm font-medium transition-colors",
                                        active
                                            ? "bg-primary/10 text-primary"
                                            : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="border-t p-4">
                    <div className="rounded-2xl border bg-muted/40 p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Current Plan
                                </p>
                                <p className="font-semibold first-letter:uppercase">{plan}</p>
                            </div>

                            <div className="rounded-full border px-2 py-1 text-xs font-medium">
                                {usage.configuratorsCount} / {limits.configurators ?? "∞"}
                            </div>
                        </div>

                        <div className="mb-3 h-2 overflow-hidden rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary"
                                style={{
                                    width: limits.configurators === null ? "5%" : `${usage.configuratorsCount / (limits.configurators) * 100}%`,
                                }}
                            />
                        </div>

                        <Button
                            size="sm"
                            className="w-full rounded-xl cursor-pointer"
                            onClick={() => router.push("/dashboard/billing#plans")}
                        >
                            Upgrade Plan
                        </Button>
                    </div>
                </div>
            </div>
        </aside>
    )
}