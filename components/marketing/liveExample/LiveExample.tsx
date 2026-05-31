import { Button } from '@/components/ui/button';
import { Check, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LiveExample = () => {
    return (
        <section id="live-example" className="bg-secondary/40">
            <div className="max-w-7xl mx-auto px-6 py-2 xs:py-10 lg:py-16 flex flex-col lg:flex-row gap-12 lg:items-stretch">
                <div className="w-full lg:w-1/3 flex flex-col justify-start gap-6">
                    <div className="inline-flex w-fit rounded-full border px-3 py-1 text-sm text-orange-500">
                        Live Example
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">See It In Action</h2>
                    <p className="text-muted-foreground leading-relaxed max-w-md">
                        This is a real configurator built with Configraph. Try changing the options and see how easy it is to create powerful product experiences.
                    </p>
                    <ul className="space-y-3">
                        {["Real-time 3D rendering", "Dynamic options & pricing", "Works on any device"].map((f) => (
                            <li key={f} className="flex items-center gap-3 text-[15px]">
                                <span className="size-5 rounded-full bg-orange-500 text-primary-foreground flex items-center justify-center">
                                    <Check className="size-3" strokeWidth={3} />
                                </span>
                                {f}
                            </li>
                        ))}
                    </ul>

                    <Link
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/embed/43f8f70f-e3e2-4e6a-a7e8-5945d1842642`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="mt-auto mb-4 block w-fit cursor-pointer"
                    >
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-xl border font-medium text-sm cursor-pointer"
                            asChild 
                        >
                            <span>
                                Try Live Demo <ExternalLink className="size-4 ml-2" />
                            </span>
                        </Button>
                    </Link>
                </div>

                <div className="relative overflow-hidden aspect-5/3 w-full lg:w-2/3 rounded-2xl border border-border shadow-xl">
                    <Image
                        height={1435}
                        width={2375}
                        src="/imgs/configurator-preview.webp"
                        alt="embed configurator preview"
                        className="w-full h-auto"
                    />
                </div>
            </div>

        </section>
    );
};

export default LiveExample;