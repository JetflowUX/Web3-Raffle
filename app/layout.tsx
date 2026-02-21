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
          <div className="flex min-h-screen flex-col md:flex-row bg-background">
            <div className="hidden md:block md:fixed md:left-0 md:top-0 md:z-40 md:h-screen md:w-64">
              <Sidebar />
            </div>
            <div className="flex-1 md:ml-64">
              <TopBar />
              <main className="relative min-h-[calc(100vh-4rem)] p-4 sm:p-6 md:p-8">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
