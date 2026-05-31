import { PLANS } from '@/features/billing/config/plans';
import { Plan, PlanDetails } from '@/features/billing/types/billing.types';
import { ArrowRight, Check } from 'lucide-react';
import Logo from '../Logo';
import Link from 'next/link';

const Pricing = () => {
    return (
        <section id="pricing" className="bg-secondary/40">
            <div className="max-w-7xl mx-auto px-6 py-2 xs:py-10 lg:py-16">
                <h2 className="text-center text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
                <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {(Object.entries(PLANS) as [Plan, PlanDetails][]).map(([planName, data]) => (
                        <div
                            key={planName}
                            className={`relative rounded-2xl border border-border p-7 flex flex-col ${data.popular
                                    ? "bg-[oklch(0.97_0.03_55)] shadow-lg"
                                    : "bg-card"
                                }`}
                        >
                            {data.popular && (
                                <span className="absolute top-5 right-5 px-2.5 py-1 rounded-md bg-orange-500 text-primary-foreground text-[10px] font-bold tracking-wider uppercase">
                                    Most Popular
                                </span>
                            )}
                            <h3 className={`text-base capitalize font-semibold ${data.popular ? "text-orange-500" : ""}`}>{planName}</h3>
                            <div className="mt-3 flex items-baseline gap-1.5">
                                <span className="text-4xl font-bold tracking-tight">${data.price}</span>
                                <span className="text-sm text-muted-foreground">/month</span>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">{data.description}</p>
                            <ul className="mt-6 space-y-2.5 flex-1">
                                {data.featuresDescription.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm">
                                        <Check className="size-4 mt-0.5 shrink-0 text-orange-500" strokeWidth={2.5} />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing#plans`}
                                className={`mt-7 inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-medium transition ${data.popular
                                        ? "bg-orange-500 text-primary-foreground hover:opacity-95"
                                        : "border border-border bg-card hover:bg-secondary"
                                    }`}
                            >
                                Start {planName[0].toUpperCase() + planName.slice(1)}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA bar */}
                <div className="mt-12 max-w-5xl mx-auto rounded-2xl border border-border bg-[oklch(0.97_0.03_55)] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">

                        <div className="hidden lg:block">
                            <Logo />
                        </div>
                        <div>
                            <div className="font-semibold">Ready To Launch Your First Configurator?</div>
                            <div className="text-sm text-muted-foreground">Create your first project for free. Upgrade only when you need more.</div>
                        </div>
                    </div>
                    <Link
                        href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/`}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition whitespace-nowrap">
                        Start Building — It&apos;s Free <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Pricing;