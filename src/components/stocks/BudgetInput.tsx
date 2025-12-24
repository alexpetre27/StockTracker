import { Wallet, Loader2, RefreshCw } from "lucide-react";

interface BudgetInputProps {
  budget: number;
  loading: boolean;
  onBudgetChange: (val: string) => void;
  onRefresh: () => void;
}

export function BudgetInput({
  budget,
  loading,
  onBudgetChange,
  onRefresh,
}: BudgetInputProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
      <div className="flex items-center bg-slate-100 px-4 py-3 rounded-2xl border border-slate-200 w-full sm:w-auto">
        <Wallet size={18} className="text-slate-400 mr-2" />
        <input
          type="number"
          min="0"
          value={budget === 0 ? "" : budget}
          onChange={(e) => onBudgetChange(e.target.value)}
          placeholder="0"
          className="bg-transparent font-black text-lg md:text-xl outline-none w-full sm:w-32"
        />
      </div>

      <button
        onClick={onRefresh}
        disabled={loading || budget <= 0}
        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-2xl font-bold transition-all disabled:opacity-30 flex items-center justify-center gap-2 active:scale-95"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <RefreshCw size={20} />
        )}
      </button>
    </div>
  );
}
