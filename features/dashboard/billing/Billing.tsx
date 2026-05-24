import {
    Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { usage } from "./usage";
import { plans } from "./plans";
import Link from "next/link";

export default function BillingPage() {
    return (
        <div className="space-y-8">
            {/* HEADER */}
            <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Billing & Plans
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Manage your subscription, usage, and plan
                        limits.
                    </p>
                </div>

                <Button
                    variant="outline"
                    className="rounded-2xl"
                >
                    <Link href="/dashboard/billing/history">
                        Billing History
                    </Link>
                </Button>
            </section>

            {/* CURRENT PLAN */}
            <section className="overflow-hidden rounded-3xl border bg-background">
                <div className="border-b px-6 py-5">
                    <h2 className="text-lg font-semibold">
                        Current Plan
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Your current subscription and resource usage.
                    </p>
                </div>

                <div className="grid gap-6 p-6 lg:grid-cols-2">
                    {/* PLAN */}
                    <div className="rounded-3xl border bg-muted/20 p-6">
                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Active Plan
                                </p>

                                <h3 className="mt-2 text-3xl font-semibold tracking-tight">
                                    Free
                                </h3>
                            </div>

                            <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                Current
                            </div>
                        </div>

                        <p className="mb-6 text-muted-foreground">
                            Upgrade anytime to unlock larger uploads,
                            remove watermarks, and access advanced
                            customization tools.
                        </p>

                        <Button className="rounded-2xl">
                            Upgrade Plan
                        </Button>
                    </div>

                    {/* USAGE */}
                    <div className="rounded-3xl border bg-muted/20 p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold">
                                Usage
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Current usage for your workspace.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {usage.map((item) => (
                                <div key={item.label}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-medium">
                                            {item.label}
                                        </span>

                                        <span className="text-sm text-muted-foreground">
                                            {item.value}
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-primary"
                                            style={{
                                                width: item.progress,
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* PLANS */}
            <section id="plans">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Available Plans
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Choose the plan that fits your workflow.
                    </p>
                </div>

                <div className="grid gap-6 xl:grid-cols-3">
                    {plans.map((plan) => {
                        const Icon = plan.icon;

                        return (
                            <div
                                key={plan.name}
                                className={
                                    plan.popular
                                        ? "flex flex-col justify-start relative overflow-hidden rounded-3xl border-2 border-primary bg-background p-6 shadow-lg"
                                        : "flex flex-col justify-start overflow-hidden rounded-3xl border bg-background p-6"
                                }
                            >
                                {/* POPULAR BADGE */}
                                {plan.popular && (
                                    <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                                        Most Popular
                                    </div>
                                )}

                                {/* ICON */}
                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted/30">
                                    <Icon className="h-6 w-6" />
                                </div>

                                {/* PLAN INFO */}
                                <div className="mb-6">
                                    <h3 className="text-2xl font-semibold">
                                        {plan.name}
                                    </h3>

                                    <div className="mt-3 flex items-end gap-1">
                                        <span className="text-4xl font-bold tracking-tight">
                                            {plan.price}
                                        </span>

                                        <span className="pb-1 text-muted-foreground">
                                            / month
                                        </span>
                                    </div>

                                    <p className="mt-3 text-muted-foreground">
                                        {plan.description}
                                    </p>
                                </div>

                                {/* FEATURES */}
                                <div className="mb-8 space-y-3">
                                    {plan.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="mt-0.5 rounded-full bg-primary/10 p-1 text-primary">
                                                <Check className="h-3 w-3" />
                                            </div>

                                            <span className="text-sm">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                {plan.current ? (
                                    <Button
                                        disabled
                                        className="w-full rounded-2xl mt-auto"
                                    >
                                        Current Plan
                                    </Button>
                                ) : (
                                    <Button
                                        variant={
                                            plan.popular
                                                ? "default"
                                                : "outline"
                                        }
                                        className="w-full rounded-2xl mt-auto"
                                    >
                                        Upgrade
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}