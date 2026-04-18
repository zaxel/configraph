import type { Metadata } from "next";
import "./globals.css";

import { Inter, Figtree } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Configraph",
  description: "Upload once. Configure forever. Embed anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", figtree.variable)}
    >
      <body className="font-sans min-h-full flex flex-col text-foreground">
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
