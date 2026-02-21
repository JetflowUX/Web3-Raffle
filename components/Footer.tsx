import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-center gap-6 px-4 sm:px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg text-text">ChainRaffle</p>
          <p className="text-xs sm:text-sm text-muted">Secure, transparent, and fast raffle draws.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted">
          <Link href="/" className="hover:text-text">
            Home
          </Link>
          <Link href="/create" className="hover:text-text">
            Create
          </Link>
          <Link href="/winners" className="hover:text-text">
            Winners
          </Link>
        </div>
      </div>
    </footer>
  );
}
