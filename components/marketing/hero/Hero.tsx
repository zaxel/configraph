import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronsLeftRightEllipsis, Copy, FileBracesCorner, Gift } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
    return (
        <section className="relative mb-[500px] md:mb-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.12),transparent_45%)]" />

            <div className="h-full mx-auto flex flex-col max-w-7xl gap-16 px-6 py-2 xs:py-10 lg:flex-row items-center ">

                <div className="flex flex-col justify-center w-full lg:w-1/3">
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
                        <Button size="lg" className="rounded-xl bg-foreground font-medium text-white flex gap-2 text-sm items-center cursor-pointer">
                            Start Free
                            <ArrowRight size={16} />
                        </Button>

                        <Button size="lg" variant="outline" className="rounded-xl border font-medium text-sm cursor-pointer">
                            View Demo
                        </Button>
                    </div>

                    <div className="mt-10 flex flex-wrap gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-2"><FileBracesCorner size={12} className="text-orange-500" /> No coding required</span>
                        <span className="flex items-center gap-2"><ChevronsLeftRightEllipsis size={12} className="text-orange-500" /> Embed anywhere</span>
                        <span className="flex items-center gap-2"><Gift size={12} className="text-orange-500" /> Free plan</span>
                    </div>
                </div>

                <div className="relative w-full lg:w-2/3 aspect-7/4">

                    {/* Dashboard Screenshot */}

                    <div className="absolute inset-0 overflow-hidden rounded-3xl border bg-white shadow-2xl">
                        <Image
                            fill
                            src="/imgs/dashboard-preview.png"
                            alt="dashboard-preview"
                            className="w-full"
                        />
                    </div>

                    {/* Configurator */}

                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-120 md:left-auto md:translate-x-0 md:-right-4 md:-bottom-14 lg:-right-8 lg:bottom-auto lg:top-10 w-full xs:w-[430px] rounded-3xl border bg-white p-3 xs:p-6 shadow-2xl z-20">

                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <div className="font-semibold">
                                    Running Shoe
                                </div>

                                <div className="text-sm text-zinc-500">
                                    Interactive Preview
                                </div>
                            </div>

                            <div className="font-semibold">
                                $299
                            </div>
                        </div>
                        <div className="w-full h-[375px] -mt-5">
                            <iframe
                                className="w-full h-full border-0"
                                src="http://localhost:3000/embed/b4555bde-67f9-47f8-9531-f97ec5c81ef0"
                                loading="lazy"
                            ></iframe>
                        </div>

                    </div>

                    {/* Embed Card */}

                    <div className="absolute -top-10 right-4 md:top-auto md:-bottom-14 md:-left-4 w-[200px] md:w-[320px] rounded-2xl bg-zinc-950 p-3 md:p-5 text-white shadow-2xl z-10">

                        <div className="mb-2 md:mb-4 flex items-center justify-between">
                            <span className="text-[8px] md:text-sm">
                                Embed Code
                            </span>

                            <button className="inline-flex items-center gap-1 bg-zinc-800 text-white/80 px-2 py-1 rounded-lg text-[7px] md:text-xs cursor-pointer">
                                <Copy size={10} /> Copy
                            </button>
                        </div>

                        <pre className="text-[6px] md:text-[10px] leading-relaxed font-mono text-[oklch(0.85_0.15_140)]">
                            {`<iframe
    src="https://configraph.com/embed/8187c99f"
    width="100%"
    height="600"
    frameborder="0"
    allowfullscreen>
</iframe>`}
                        </pre>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default Hero;