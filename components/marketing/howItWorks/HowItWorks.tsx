import { Fragment } from "react";
import {
    ArrowRight,
    Code2,
    Cloud,
    SlidersHorizontal,
} from "lucide-react";

const HowItWorks = () => {
    return (
        <section id="how-works" className="bg-secondary/40">
            <div className="max-w-7xl mx-auto px-6 py-2 xs:py-10 lg:py-16">
                <h2 className="text-center text-4xl font-bold tracking-tight">How It Works</h2>
                <div className="mt-12 grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 items-center max-w-5xl mx-auto">
                    {[
                        { icon: Cloud, title: "Build", desc: "Upload your 3D model and create options like colors, materials, sizes, and add-ons." },
                        { icon: SlidersHorizontal, title: "Publish", desc: "Customize the experience and publish your configurator with a single click." },
                        { icon: Code2, title: "Embed & Sell", desc: "Embed the configurator on your website and let customers customize and buy." },
                    ].map((s, i) => (
                        <Fragment key={s.title}>
                            <div className="rounded-2xl border border-border bg-card p-7 text-center relative">
                                <div className="absolute top-4 left-4 size-8 rounded-full bg-accent text-orange-500 text-md font-bold flex items-center justify-center">
                                    {i + 1}
                                </div>
                                <s.icon className="mx-auto size-8 text-foreground/80" strokeWidth={1.75} />
                                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                            </div>
                            {i < 2 && (
                                <ArrowRight className="hidden md:block size-5 text-muted-foreground mx-auto" />
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;