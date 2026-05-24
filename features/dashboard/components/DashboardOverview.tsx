"use client"
import Link from "next/link";
import {
  ArrowUpRight,
  Boxes,
  HardDrive,
  Layers3,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEntitlements } from "@/features/billing/context/entitlements.context";
import Image from "next/image";


export type Configurator = {
  id: string;
  name: string;
  thumbnail_url?: string;
  status: "Draft" | "Published";
  updated_at: string;
};

export type DashboardOverviewProps = {
  configurators: Configurator[];
};

export default function DashboardOverview({ configurators }: DashboardOverviewProps) {
  const { plan, permissions, usage, limits, refresh, isPending } = useEntitlements();
  console.log(permissions);
  console.log(plan);
  console.log(usage);

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border bg-muted/30 p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              Welcome back
            </div>

            <h1 className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Your configurator workspace
            </h1>

            <p className="text-muted-foreground md:text-lg">
              Manage products, publish embeds, and build interactive 3D
              experiences for your customers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="rounded-2xl"
            >
              <Link href="/builder">
                Create Configurator
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-2xl"
            >
              <Link href="/dashboard/configurators">
                View Configurators
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="grid gap-4 md:grid-cols-3">
        
        <div className="rounded-3xl border bg-background p-6">
          <div className="mb-5 flex items-start justify-between">
            <div className="rounded-2xl border bg-muted/40 p-3">
              <Layers3 className="h-5 w-5" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <p className="mb-1 text-sm text-muted-foreground">
              Configurators
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              {usage.configuratorsCount} / {limits.configurators}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Available on your current plan
            </p>
          </div>
        </div>


         <div className="rounded-3xl border bg-background p-6">
          <div className="mb-5 flex items-start justify-between">
            <div className="rounded-2xl border bg-muted/40 p-3">
              <HardDrive className="h-5 w-5" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <p className="mb-1 text-sm text-muted-foreground">
              Published
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              {usage.publishedNumber}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Live embedded configurators
            </p>
          </div>
        </div>


        <div className="rounded-3xl border bg-background p-6">
          <div className="mb-5 flex items-start justify-between">
            <div className="rounded-2xl border bg-muted/40 p-3">
              <Boxes className="h-5 w-5" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl"
            >
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <p className="mb-1 text-sm text-muted-foreground">
              Storage Used
            </p>
            <h2 className="text-3xl font-semibold tracking-tight">
              {usage.storageUsedMb}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {`Of ${limits.uploadMb}MB available`}
            </p>
          </div>
        </div>


       
      </section>

      {/* RECENT CONFIGURATORS */}
      <section className="rounded-3xl border bg-background">
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold">
              Recent Configurators
            </h2>

            <p className="text-sm text-muted-foreground">
              Quickly continue where you left off.
            </p>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-xl"
          >
            <Link href="/dashboard/configurators">
              View All
            </Link>
          </Button>
        </div>

        <div className="divide-y">
          {configurators.map((configurator) => (
            <div
              key={configurator.id}
              className="flex flex-col gap-4 px-6 py-5 transition-colors hover:bg-muted/20 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                {/* <div className="flex h-14 w-14 items-center justify-center rounded-2xl border bg-muted/40">
                  <Layers3 className="h-5 w-5 text-muted-foreground" />
                </div> */}
                <div className="relative w-16 h-16">
                  <Image
                    src={configurator.thumbnail_url || "/placeholders/configurator-preview.webp"}
                    alt={configurator.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div>
                  <h3 className="font-medium">
                    {configurator.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Updated {configurator.updated_at}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className={
                    configurator.status === "Published"
                      ? "rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      : "rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  }
                >
                  {configurator.status}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl"
                >
                  <Link
                    href={`/builder/${configurator.id}`}
                  >
                    Edit
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}