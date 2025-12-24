import { TrendingUp } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center gap-5">
      <div className="relative">
        <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[var(--color-primary)] to-[var(--color-primary-strong)] flex items-center justify-center shadow-sm ring-1 ring-[var(--color-border-light)]">
          <TrendingUp size={22} className="text-white" strokeWidth={2.5} />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--color-success)] border-2 border-[var(--color-bg-secondary)]" />
      </div>

      <div>
        <h1 className="font-sans text-2xl md:text-3xl font-semibold tracking-tight text-[var(--color-text-primary)]">
          Stock Tracker
        </h1>
      </div>
    </div>
  );
}
