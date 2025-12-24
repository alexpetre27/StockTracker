import { type StockResult } from "@/app/actions";

export function StockCard({ stock }: { stock: StockResult }) {
  return (
    <div className="bg-white p-6 rounded-4xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-6">
        <span className="text-xl font-black text-slate-800">
          {stock.symbol}
        </span>
        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
          {stock.weight.toFixed(1)}%
        </span>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase">
          <span>P/E</span>
          <span className="text-slate-700">
            {stock.pe?.toFixed(2) || "N/A"}
          </span>
        </div>
        <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase">
          <span>P/B</span>
          <span className="text-slate-700">
            {stock.pb?.toFixed(2) || "N/A"}
          </span>
        </div>
        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${stock.weight}%` }}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-50 text-center lg:text-left">
        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
          Alocare
        </p>
        <p className="text-xl font-black text-slate-900 tracking-tight">
          $
          {stock.allocation.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </div>
  );
}
