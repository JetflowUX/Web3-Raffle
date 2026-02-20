"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Ticket, Trophy, Plus, Activity, Sparkles } from "lucide-react";

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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-secondary overflow-y-auto">
      <div className="flex h-full flex-col">
        {/* Logo section */}
        <div className="border-b border-border px-5 py-5">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5 text-black" />
            </div>
            <div>
              <div className="text-base font-bold text-white">ChainRaffle</div>
              <div className="text-xs text-muted">Web3 Raffles</div>
            </div>
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
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer section */}
        <div className="border-t border-border p-4">
          <div className="rounded-md bg-accent/50 p-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <p className="text-xs font-medium text-white">Powered by Web3</p>
            </div>
            <p className="text-xs text-muted">Decentralized Raffle Protocol</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
