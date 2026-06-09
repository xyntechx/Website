import type { Metadata } from "next";
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
    <html
      lang="en"
      className="h-full antialiased"
    >
      {/* <body className="font-[TTNormsProSerif] bg-zinc-950 text-zinc-100 text-sm min-h-full flex flex-col">{children}</body> */}
      <body className="font-mono bg-zinc-950 text-zinc-100 text-xs min-h-full flex flex-col">{children}</body>
    </html>
  );
}
