import { type StockResult } from "@/app/actions";
import { StockCard } from "./StockCard";

interface StockGridProps {
  data: StockResult[];
  loading: boolean;
}

export function StockGrid({ data, loading }: StockGridProps) {
  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-slate-400 font-medium animate-pulse">
          Se preiau datele din piață...
        </p>
      </div>
    );
  }

  if (data.length === 0 && !loading) {
    return (
      <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200">
        <p className="text-slate-400 font-bold px-4 tracking-widest uppercase text-xs">
          Datele se incarca
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
      {data.map((stock) => (
        <StockCard key={stock.symbol} stock={stock} />
      ))}
    </div>
  );
}
