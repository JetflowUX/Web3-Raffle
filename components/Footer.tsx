import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid gap-8 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p className="font-display text-lg font-semibold text-text">ChainRaffle</p>
            <p className="text-xs sm:text-sm text-muted mt-2">Secure, transparent, and fast raffle draws on the blockchain.</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">Navigation</p>
            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <Link href="/" className="text-muted hover:text-text transition">
                Home
              </Link>
              <Link href="/create" className="text-muted hover:text-text transition">
                Create Raffle
              </Link>
              <Link href="/my-tickets" className="text-muted hover:text-text transition">
                My Tickets
              </Link>
              <Link href="/winners" className="text-muted hover:text-text transition">
                Winners
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">Resources</p>
            <div className="flex flex-col gap-2 text-xs sm:text-sm">
              <a href="#" className="text-muted hover:text-text transition">
                Documentation
              </a>
              <a href="#" className="text-muted hover:text-text transition">
                Smart Contracts
              </a>
              <a href="#" className="text-muted hover:text-text transition">
                FAQ
              </a>
              <a href="#" className="text-muted hover:text-text transition">
                Blog
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted mb-4">Connect</p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="p-2 rounded-lg bg-card/50 text-muted hover:text-text hover:bg-card transition"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-card/50 text-muted hover:text-text hover:bg-card transition"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="p-2 rounded-lg bg-card/50 text-muted hover:text-text hover:bg-card transition"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs sm:text-sm text-muted">
          <p>&copy; {currentYear} ChainRaffle. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="hover:text-text transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-text transition">
              Terms of Service
            </a>
            <a href="#" className="hover:text-text transition">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
