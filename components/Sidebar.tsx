"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket, Trophy, Plus, Activity } from "lucide-react";

const navItems = [
  {
    name: "Raffles",
    href: "/",
    icon: Home
  },
  {
    name: "Create Raffle",
    href: "/create",
    icon: Plus
  },
  {
    name: "My Tickets",
    href: "/my-tickets",
    icon: Ticket
  },
  {
    name: "Winners",
    href: "/winners",
    icon: Trophy
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#1a2c38] border-r border-[#2f4553] overflow-y-auto">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-[#2f4553] px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Activity className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-bold text-white">ChainRaffle</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-nav ${isActive ? "active" : ""}`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Info */}
        <div className="border-t border-[#2f4553] p-4">
          <div className="rounded-lg bg-[#0f212e] p-3">
            <p className="text-xs text-text-muted">
              Powered by Web3
            </p>
            <p className="mt-1 text-xs font-semibold text-primary">
              Decentralized Raffles
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
