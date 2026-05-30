"use client"
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import Auth from "@/components/common/Auth";
import DashboardLogo from "./DashboardLogo";

export function BuilderHeader() {

    return (
        <header className="sticky h-16 top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
            <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
                <DashboardLogo />

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