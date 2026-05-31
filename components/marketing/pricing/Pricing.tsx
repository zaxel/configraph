import React from 'react';

const Pricing = () => {
    return (
        <section id="pricing" className="border-t border-border bg-secondary/40">
            <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
                <h2 className="text-center text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
                <div className="mt-14 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl border p-7 flex flex-col ${plan.popular
                                    ? "border-primary/40 bg-[oklch(0.97_0.03_55)] shadow-lg"
                                    : "border-border bg-card"
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute top-5 right-5 px-2.5 py-1 rounded-md bg-primary text-primary-foreground text-[10px] font-bold tracking-wider uppercase">
                                    Most Popular
                                </span>
                            )}
                            <h3 className={`text-base font-semibold ${plan.popular ? "text-primary" : ""}`}>{plan.name}</h3>
                            <div className="mt-3 flex items-baseline gap-1.5">
                                <span className="text-4xl font-bold tracking-tight">${plan.price}</span>
                                <span className="text-sm text-muted-foreground">/month</span>
                            </div>
                            <p className="mt-3 text-sm text-muted-foreground">{plan.description}</p>
                            <ul className="mt-6 space-y-2.5 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm">
                                        <Check className="size-4 mt-0.5 shrink-0 text-primary" strokeWidth={2.5} />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#"
                                className={`mt-7 inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-medium transition ${plan.popular
                                        ? "bg-primary text-primary-foreground hover:opacity-95"
                                        : "border border-border bg-card hover:bg-secondary"
                                    }`}
                            >
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>
        </section>
    );
};

export default Pricing;