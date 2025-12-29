import { DollarSign, Loader2, RefreshCw } from "lucide-react";

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
    <div className="flex items-center gap-3">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-(--color-primary)">
          <DollarSign size={20} strokeWidth={2.5} />
        </div>
        <input
          type="number"
          min="0"
          value={budget === 0 ? "" : budget}
          onChange={(e) => onBudgetChange(e.target.value)}
          placeholder="0"
          className="
            w-40 md:w-48
            pl-11 pr-4 py-3.5
            bg-(--color-bg-secondary)
            border border-(--color-border-light)
            rounded-xl
            font-sans font-semibold text-lg
            text-foreground
            placeholder:text-(--color-text-muted)
            shadow-sm
            focus-visible:outline-none
            focus:border-(--color-primary)
            focus:ring-4
            focus:ring-(--color-primary-soft)
            transition-all duration-300
          "
        />
      </div>

      <button
        onClick={onRefresh}
        disabled={loading || budget <= 0}
        className="
          group
          relative
          px-5 py-3.5
          bg-(--color-primary)
          hover:bg-(--color-primary-hover)
          text-white
          rounded-xl
          font-sans font-semibold text-sm
          transition-all duration-300
          focus-visible:outline-none
          focus-visible:ring-4
          focus-visible:ring-(--color-primary-soft)
          disabled:opacity-40
          disabled:cursor-not-allowed
          active:scale-95
          shadow-sm
          hover:shadow-md
        "
      >
        <span className="flex items-center gap-2">
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <RefreshCw
                size={18}
                className="group-hover:rotate-180 transition-transform duration-500"
              />
            </>
          )}
        </span>
      </button>
    </div>
  );
}
