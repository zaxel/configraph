import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useProfile } from '@/features/account/hooks/useProfile';
import { useSignOut } from '@/lib/clerk/useSignOut';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { sidebarItems } from './DashboardSidebar';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';

const Auth = () => {
     const handleSignOut = useSignOut();
        const {
            data: profile,
        } = useProfile();

        const { user } = useUser();
    
        const displayAvatar = profile?.avatar_url || user?.imageUrl;
        const [open, setOpen] = useState(false);
    
        const formattedUsername = profile?.username
            ? profile.username.trim().split(/\s+/)[0].replace(/^\w/, (c) => c.toUpperCase())
            : null;

            return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
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
                                    <span className="text-muted-foreground/60">U</span>
                                )}
                        </AvatarFallback>
                    </Avatar>

                    <div className="hidden text-left md:block">
                        <p className="text-sm font-medium leading-none">
                            {profile?.username
                                ? formattedUsername
                                : <span className="text-muted-foreground/60">User</span>
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
                    return <DropdownMenuItem key={item.label} asChild>
                        <Link href={item.href}>
                            {item.label}
                        </Link>
                    </DropdownMenuItem>
                })}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Auth;