import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full min-h-screen flex flex-col text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  );
}