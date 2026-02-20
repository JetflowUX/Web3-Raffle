import type { Metadata } from "next";
import { Sora, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "ChainRaffle",
  description: "A modern Web3 raffle draw platform.",
  metadataBase: new URL("https://chainraffle.local"),
  openGraph: {
    title: "ChainRaffle",
    description: "Enter raffles, buy tickets, and claim rewards with ease.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${sora.variable} ${space.variable} ${mono.variable} bg-background text-text antialiased`}
      >
        <Providers>
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="ml-64 flex-1">
              <TopBar />
              <main className="relative min-h-[calc(100vh-4rem)] p-8">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
