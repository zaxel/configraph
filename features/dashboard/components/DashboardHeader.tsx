"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import Auth from "../../../components/common/Auth";

export function DashboardHeader() {
    return (
        <header className="sticky h-16 top-0 z-30 border-b bg-background/80 backdrop-blur-xl">
            <div className="flex h-full items-center justify-between gap-4 px-4 md:px-8">
                <div className="relative hidden w-full max-w-sm md:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                        placeholder="Search configurators..."
                        className="h-11 rounded-xl border bg-muted/40 pl-10"
                    />
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