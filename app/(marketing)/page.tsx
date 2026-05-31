import Hero from "@/components/marketing/hero/Hero";
import HowItWorks from "@/components/marketing/howItWorks/HowItWorks";
import LiveExample from "@/components/marketing/liveExample/LiveExample";
import Pricing from "@/components/marketing/pricing/Pricing";

export default function Home() {
  return (
    <main className="grow relative bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.12),transparent_45%)]">
      <Hero />
      <HowItWorks />
      <LiveExample />
      <Pricing />
    </main>
  );
}
