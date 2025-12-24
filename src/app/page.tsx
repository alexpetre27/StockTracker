"use client";
import { useState, useEffect } from "react";
import { getValuationData, type StockResult } from "./actions";
import { Header } from "@/components/stocks/Header";
import { BudgetInput } from "@/components/stocks/BudgetInput";
import { StockGrid } from "@/components/stocks/StockGrid";

export default function Home() {
  const [budget, setBudget] = useState<number>(1000);
  const [data, setData] = useState<StockResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCalculate = async () => {
    setLoading(true);
    const results = await getValuationData(budget);
    setData(results);
    setLoading(false);
  };

  useEffect(() => {
    handleCalculate();
  }, []);

  const handleInputChange = (val: string) => {
    if (val === "") {
      setBudget(0);
      return;
    }
    const num = Number(val);
    setBudget(Math.max(0, num));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 lg:p-12 text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col lg:flex-row justify-between items-center bg-white p-6 md:p-8 rounded-4xl shadow-sm border border-slate-100 gap-6 mb-8">
          <Header />
          <BudgetInput
            budget={budget}
            loading={loading}
            onBudgetChange={handleInputChange}
            onRefresh={handleCalculate}
          />
        </header>

        <StockGrid data={data} loading={loading} />
      </div>
    </div>
  );
}
