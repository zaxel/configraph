"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell, ChevronDown } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useProfile } from "@/features/account/hooks/useProfile";
import Link from "next/link";
import { sidebarItems } from "@/features/dashboard/components/DashboardSidebar";

export function BuilderHeader() {
    const { user } = useUser();
    const {
        data: profile,
        isLoading,
    } = useProfile();


    const displayAvatar = profile?.avatar_url || user?.imageUrl;

    const formattedUsername = profile?.username
        ? profile.username.trim().split(/\s+/)[0].replace(/^\w/, (c) => c.toUpperCase())
        : null;

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

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="h-11 gap-3 rounded-xl px-3"
                            >
                                <Avatar className="h-7 w-7">
                                    <AvatarImage src={displayAvatar} />
                                    <AvatarFallback>
                                        {profile?.username
                                            ? (
                                                profile.username
                                                    .trim()
                                                    .split(/\s+/)
                                                    .map((word) => word[0])
                                                    .join("")
                                                    .toUpperCase()
                                                    .slice(0, 2)
                                            ) : (
                                                <span className="text-muted-foreground/60">??</span>
                                            )}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="hidden text-left md:block">
                                    <p className="text-sm font-medium leading-none">
                                        {profile?.username
                                            ? formattedUsername
                                            : <span className="text-muted-foreground/60">??</span>
                                        }
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Free Plan
                                    </p>
                                </div>

                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-56 rounded-2xl"
                        >
                            {sidebarItems.map(item => {
                                return <DropdownMenuItem key={item.label}>
                                    <Link href={item.href}>
                                        {item.label}
                                    </Link>
                                </DropdownMenuItem>
                            })}

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <Link href={"#"}>
                                    Sign out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}