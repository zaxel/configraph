import Hero from "@/components/marketing/hero/Hero";
import HowItWorks from "@/components/marketing/howItWorks/HowItWorks";
import LiveExample from "@/components/marketing/liveExample/LiveExample";

export default function Home() {
  return (
    <main className="grow relative">

      <Hero />
      <HowItWorks />
      <LiveExample />
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,.12),transparent_45%)]" /> */}
    </main>
  );
}
