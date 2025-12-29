import { type StockResult } from "@/app/actions";
import { StockCard } from "./StockCard";
import { BarChart3 } from "lucide-react";

interface StockGridProps {
  data: StockResult[];
  loading: boolean;
}

export function StockGrid({ data, loading }: StockGridProps) {
  if (loading && data.length === 0) {
    return (
      <div className="py-16 md:py-24">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-(--color-bg-tertiary) flex items-center justify-center">
            <BarChart3
              size={24}
              className="text-(--color-primary) animate-pulse"
            />
          </div>
          <p className="font-sans text-(--color-text-tertiary) animate-pulse">
            Incarcare date
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5 mt-8">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-56 rounded-xl shimmer"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (data.length === 0 && !loading) {
    return (
      <div className="py-16 md:py-24">
        <div className="text-center bg-(--color-bg-secondary) rounded-2xl border-2 border-dashed border-(--color-border-medium) p-12">
          <div className="w-16 h-16 mx-auto rounded-xl bg-(--color-bg-tertiary) flex items-center justify-center mb-4">
            <BarChart3 size={28} className="text-(--color-text-muted)" />
          </div>
          <p className="font-sans text-xl font-semibold text-(--color-text-secondary) mb-2">
            Nu exista date
          </p>
          <p className="font-sans text-sm text-(--color-text-tertiary)">
            Introdu o suma
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 md:py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
        {data.map((stock, index) => (
          <div
            key={stock.symbol}
            style={{
              animationDelay: `${index * 0.05}s`,
              opacity: 0,
              animation: `fadeInUp 0.5s ease-out ${index * 0.05}s forwards`,
            }}
          >
            <StockCard stock={stock} />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
