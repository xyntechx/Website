import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nyx Iskandar",
  description: "Obsessed with solving the hardest puzzles in ML.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="font-mono bg-zinc-950 text-zinc-100 text-xs min-h-full flex flex-col selection:bg-orange-700">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
