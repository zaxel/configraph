import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronsLeftRightEllipsis, Gift, FileBracesCorner } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HeroVisual = () => {
    return (
        <>
            <div className="mb-6 inline-flex w-fit rounded-full border px-3 py-1 text-sm text-orange-500">
                3D Configurator Builder
            </div>

            <h1 className="text-3xl font-bold lg:text-5xl tracking-tight leading-[1.02]">
                <div className="mb-2">
                    Build. Customize.
                </div>
                <div className="text-orange-500">
                    Embed. Sell.
                </div>
            </h1>

            <p className="mt-8 max-w-xl text-xl text-zinc-600">
                Create interactive 3D product configurators,
                publish them with a single embed,
                and let customers customize products directly on your website.
            </p>

            <div className="mt-10 flex gap-4">
                <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/`}>
                    <Button size="lg" className="rounded-xl bg-foreground font-medium text-white flex gap-2 text-sm items-center cursor-pointer">
                        Start Free
                        <ArrowRight size={16} />
                    </Button>
                </Link>
                <Link href="#live-example">
                    <Button size="lg" variant="outline" className="rounded-xl border font-medium text-sm cursor-pointer">
                        View Demo
                    </Button>
                </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 text-sm text-zinc-500">
                <span className="flex items-center gap-2"><FileBracesCorner size={12} className="text-orange-500" /> No coding required</span>
                <span className="flex items-center gap-2"><ChevronsLeftRightEllipsis size={12} className="text-orange-500" /> Embed anywhere</span>
                <span className="flex items-center gap-2"><Gift size={12} className="text-orange-500" /> Free plan</span>
            </div>
        </>
    );
};

export default HeroVisual;