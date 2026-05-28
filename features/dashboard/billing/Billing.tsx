"use client"
import {
    Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEntitlements } from "@/features/billing/context/entitlements.context";
import { PLANS } from "@/features/billing/config/plans";
import { Plan, PlanDetails } from "@/features/billing/types/billing.types";
import { PLAN_TO_STRIPE_PRICE } from "@/features/billing/lib/stripe-plans";
import { useRouter, useSearchParams } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect } from "react";
import { createCheckoutSession } from "@/features/billing/actions/createCheckoutSession.action";
import { createPortalSession } from "@/features/billing/actions/createPortalSession.action";

export default function BillingPage() {
    const { plan, usage, limits } = useEntitlements();
    const searchParams = useSearchParams();
    const router = useRouter();

    const paymentStatus =
        searchParams?.get('success') === 'true'
            ? 'success'
            : searchParams?.get('canceled') === 'true'
                ? 'canceled'
                : null;


    useEffect(() => {
        if (paymentStatus) {
            router.replace("/dashboard/billing"); 
        }
    }, [paymentStatus, router]);


    const upgradeTier = async (plan: Exclude<Plan, "free">) => {
        const priceId = PLAN_TO_STRIPE_PRICE[plan];
        try {
            const url = await createCheckoutSession({ priceId });
            window.location.href = url;
        } catch (e) {
            console.error("Failed to create checkout session", e);
        }

    }

    return (
        <div className="space-y-8">
            {/* PAYMENT ALERTS */}
            {paymentStatus === "success" && (
                <Alert variant="success">
                    <AlertDescription>
                        Your subscription is now active.
                    </AlertDescription>
                </Alert>
            )}

            {paymentStatus === "canceled" && (
                <Alert variant="warning">
                    <AlertDescription>
                        Checkout was canceled. No changes were made.
                    </AlertDescription>
                </Alert>
            )}
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
                    className="rounded-2xl cursor-pointer"
                    onClick={async () => {
                        const url = await createPortalSession();
                        window.location.href = url;
                    }}
                >
                    Manage Billing
                    {/* <Link href="/dashboard/billing/history"> 
                        Billing History
                    </Link> */}
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

                                <h3 className="mt-2 text-3xl font-semibold tracking-tight first-letter:uppercase">
                                    {plan}
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
                        <Link href="/dashboard/billing#plans">
                            <Button className="rounded-2xl cursor-pointer">
                                Upgrade Plan
                            </Button>
                        </Link>
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

                        <div className="space-y-5 mb-4">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    Configurators
                                </span>

                                <span className="text-sm text-muted-foreground">
                                    {usage.configuratorsCount} / {limits.configurators ?? "∞"}
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: limits.configurators === null ? "5%" : `${usage.configuratorsCount / (limits.configurators) * 100}%`,
                                    }}
                                />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium">
                                    Storage
                                </span>

                                <span className="text-sm text-muted-foreground">

                                    {usage.storageUsedMb}MB / {plan === "business" ? "∞" : limits.uploadMb * (limits.configurators ?? 1)}MB
                                </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-muted">
                                <div
                                    className="h-full rounded-full bg-primary"
                                    style={{
                                        width: plan === "business" ? "5%" : `${(usage.storageUsedMb / (limits.uploadMb * (limits.configurators ?? 1)) * 100)}%`
                                    }}
                                />
                            </div>
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
                    {(Object.entries(PLANS) as [Plan, PlanDetails][]).map(([planName, data]) => {
                        const Icon = data.icon;
                        const shouldHideButton =
                            (plan === "pro" && planName === "free") ||
                            (plan === "business" && (planName === "free" || planName === "pro"));
                        return (
                            <div
                                key={planName}
                                className={
                                    data.popular
                                        ? "flex flex-col justify-start relative overflow-hidden rounded-3xl border-2 border-primary bg-background p-6 shadow-lg"
                                        : "flex flex-col justify-start overflow-hidden rounded-3xl border bg-background p-6"
                                }
                            >
                                {/* POPULAR BADGE */}
                                {data.popular && (
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
                                    <h3 className="text-2xl font-semibold first-letter:uppercase">
                                        {planName}
                                    </h3>

                                    <div className="mt-3 flex items-end gap-1">
                                        <span className="text-4xl font-bold tracking-tight">
                                            {data.price}
                                        </span>

                                        <span className="pb-1 text-muted-foreground">
                                            / month
                                        </span>
                                    </div>

                                    <p className="mt-3 text-muted-foreground">
                                        {data.description}
                                    </p>
                                </div>

                                {/* FEATURES */}
                                <div className="mb-8 space-y-3">
                                    {data.featuresDescription.map((feature) => (
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
                                {(planName === plan) ? (
                                    <Button
                                        disabled
                                        className="w-full rounded-2xl mt-auto cursor-pointer"
                                    >
                                        Current Plan
                                    </Button>
                                ) : (
                                    !shouldHideButton && <Button
                                        onClick={() => {
                                            if (planName === "free") return;
                                            upgradeTier(planName);
                                        }}
                                        variant={
                                            data.popular
                                                ? "default"
                                                : "outline"
                                        }

                                        className="w-full rounded-2xl mt-auto cursor-pointer"
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