import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <div className="px-6 py-2">
            <Link
                href="/dashboard"
                className="flex items-center gap-3"
            >
                <Image src="/imgs/logo.png" width={40} height={40} alt="logo" />

                <div>
                    <h2 className="font-semibold tracking-tight text-2xl">
                        Configraph
                    </h2>
                </div>
            </Link>
        </div>
    );
};

export default Logo;