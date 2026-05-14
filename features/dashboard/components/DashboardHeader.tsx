"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Bell, ChevronDown, Search } from "lucide-react";
import { sidebarItems } from "./DashboardSidebar";

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

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="h-11 gap-3 rounded-xl px-3"
                            >
                                <Avatar className="h-7 w-7">
                                    <AvatarImage src="" />
                                    <AvatarFallback>
                                        AZ
                                    </AvatarFallback>
                                </Avatar>

                                <div className="hidden text-left md:block">
                                    <p className="text-sm font-medium leading-none">
                                        Alex
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
                            {sidebarItems.map(item=> {
                                return <DropdownMenuItem key={item.label}>
                                    {item.label}
                                </DropdownMenuItem>
                            })}

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                Sign out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}