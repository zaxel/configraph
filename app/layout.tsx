import type { Metadata } from "next";
import "./globals.css";

import { Figtree } from "next/font/google";
import { cn } from "@/lib/utils";
import { Providers } from "@/lib/providers";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

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
      <Providers >
        <body className="font-sans min-h-full">
          {children}
        </body>
      </Providers>
    </html>
  );
}
