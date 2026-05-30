import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const DashboardLogo = () => {
    return (
        <div className="border-b px-6 py-2 h-16">
            <Link
                href="/dashboard"
                className="flex items-center gap-3"
            >
                <Image src="/imgs/logo.png" width={40} height={40} alt="logo" />

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
    );
};

export default DashboardLogo;