"use client"
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Link from "next/link";
import Auth from "@/features/dashboard/components/Auth";

export function BuilderHeader() {

    return (
        <header className="sticky h-16 top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
            <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
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

                <div className="ml-auto flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="icon"
                        className="relative rounded-xl"
                    >
                        <Bell className="h-4 w-4" />

                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
                    </Button>

                    <Auth />
                </div>
            </div>
        </header>
    );
}