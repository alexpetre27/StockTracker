import { type StockResult } from "@/app/actions";
import { TrendingUp } from "lucide-react";

export function StockCard({ stock }: { stock: StockResult }) {
  const isTopPerformer = stock.weight > 10;

  return (
    <div
      className={`
        relative
        bg-[var(--color-bg-secondary)]
        p-5 md:p-6
        rounded-xl
        border border-[var(--color-border-light)]
        flex flex-col justify-between
        card-hover
        overflow-hidden
        ${isTopPerformer ? "ring-1 ring-[var(--color-primary-soft)]" : ""}
      `}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex justify-between items-start mb-5">
        <div>
          <span className="font-sans text-xl font-semibold text-[var(--color-text-primary)] tracking-tight">
            {stock.symbol}
          </span>
          {isTopPerformer && (
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={12} className="text-[var(--color-primary)]" />
              <span className="text-[10px] font-sans font-medium text-[var(--color-primary)]">
                TOP
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-accent-gradient font-sans font-semibold text-lg">
            {stock.weight.toFixed(1)}%
          </span>
          <span className="text-[10px] text-[var(--color-text-muted)] font-sans uppercase tracking-wider">
            weight
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-sans font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
            Indice P/E
          </span>
          <span className="font-sans font-semibold text-[var(--color-text-secondary)]">
            {stock.pe?.toFixed(2) || "—"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-sans font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
            Indice P/B
          </span>
          <span className="font-sans font-semibold text-[var(--color-text-secondary)]">
            {stock.pb?.toFixed(2) || "—"}
          </span>
        </div>

        <div className="h-1 w-full bg-[var(--color-bg-tertiary)] rounded-full overflow-hidden mt-2">
          <div
            className="h-full progress-bar transition-all duration-700 ease-out rounded-full"
            style={{ width: `${Math.min(stock.weight * 2, 100)}%` }}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-[var(--color-border-light)]">
        <p className="text-[10px] font-sans font-medium text-[var(--color-text-muted)] uppercase tracking-widest mb-1">
          Valoare
        </p>
        <p className="font-sans text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight">
          <span className="text-[var(--color-text-tertiary)] mr-1">$</span>
          {stock.allocation.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>

      {isTopPerformer && (
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-6 bg-gradient-to-r from-transparent to-[rgba(37,99,235,0.10)] transform rotate-45 translate-x-8 -translate-y-2" />
        </div>
      )}
    </div>
  );
}
