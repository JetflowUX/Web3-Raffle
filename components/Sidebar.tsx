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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-secondary overflow-y-auto shadow-2xl">
      <div className="flex h-full flex-col">
        {/* Logo section */}
        <div className="border-b border-border px-6 py-6 bg-gradient-to-br from-primary/5 to-transparent">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-500 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-lg shadow-primary/20">
              <Activity className="h-6 w-6 text-black" />
            </div>
            <div>
              <div className="text-lg font-bold text-white group-hover:text-primary transition-colors">ChainRaffle</div>
              <div className="text-xs text-muted">Web3 Raffles</div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-nav group relative overflow-hidden ${
                  isActive ? "active" : ""
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                )}
                <Icon className={`h-5 w-5 relative z-10 transition-transform group-hover:scale-110 ${
                  isActive ? "text-primary" : ""
                }`} />
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer section */}
        <div className="border-t border-border p-4 bg-gradient-to-t from-primary/5 to-transparent">
          <div className="rounded-lg bg-accent/50 backdrop-blur-sm p-4 space-y-2 border border-primary/10">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-primary/20">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
              <p className="text-xs font-semibold text-white">Powered by Web3</p>
            </div>
            <p className="text-xs text-muted leading-relaxed">Decentralized Raffle Protocol</p>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <p className="text-xs text-muted font-mono">v1.0.0</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
