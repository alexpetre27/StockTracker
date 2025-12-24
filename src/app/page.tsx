"use client";
import { useCallback, useEffect, useState } from "react";
import { getValuationData, type StockResult } from "./actions";
import { Header } from "@/components/stocks/Header";
import { BudgetInput } from "@/components/stocks/BudgetInput";
import { StockGrid } from "@/components/stocks/StockGrid";

const INITIAL_BUDGET = 1000;

export default function Home() {
  const [budget, setBudget] = useState<number>(INITIAL_BUDGET);
  const [data, setData] = useState<StockResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCalculate = useCallback(async (budgetToUse: number) => {
    setLoading(true);
    const results = await getValuationData(budgetToUse);
    setData(results);
    setLoading(false);
  }, []);

  useEffect(() => {
    Promise.resolve().then(() => handleCalculate(INITIAL_BUDGET));
  }, [handleCalculate]);

  const handleInputChange = (val: string) => {
    if (val === "") {
      setBudget(0);
      return;
    }
    const num = Number(val);
    setBudget(Math.max(0, num));
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <header
          className="relative bg-[var(--color-bg-secondary)] p-6 md:p-8 rounded-2xl border border-[var(--color-border-light)] mb-8 overflow-hidden"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-linear-to-bl from-[rgba(37,99,235,0.08)] to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-linear-to-tr from-[rgba(37,99,235,0.06)] to-transparent rounded-full blur-2xl" />

          <div className="relative flex flex-col lg:flex-row justify-between items-center gap-6">
            <Header />
            <BudgetInput
              budget={budget}
              loading={loading}
              onBudgetChange={handleInputChange}
              onRefresh={() => handleCalculate(budget)}
            />
          </div>

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-px accent-line" />
        </header>

        <main>
          <StockGrid data={data} loading={loading} />
        </main>
      </div>
    </div>
  );
}
