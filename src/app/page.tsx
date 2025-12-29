"use client";
import { useCallback, useEffect, useState } from "react";
import { getValuationData, type StockResult } from "./actions";
import { Header } from "@/components/stocks/Header";
import { BudgetInput } from "@/components/stocks/BudgetInput";
import { StockGrid } from "@/components/stocks/StockGrid";
import { Save, Loader2 } from "lucide-react";

const INITIAL_BUDGET = 1000;

export default function Home() {
  const [budget, setBudget] = useState<number>(INITIAL_BUDGET);
  const [data, setData] = useState<StockResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleCalculate = useCallback(async (budgetToUse: number) => {
    setLoading(true);
    const results = await getValuationData(budgetToUse);
    setData(results);
    setLoading(false);
  }, []);

  const handleSaveToDb = async () => {
    if (data.length === 0) return;

    setIsSaving(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          budget: budget,
          stocks: data.map((s) => ({
            symbol: s.symbol,
            pe: s.pe,
            pb: s.pb,
            weight: s.weight,
            allocation: s.allocation,
          })),
        }),
      });

      if (response.ok) {
        alert(`Succes! Datele au fost salvate`);
      } else {
        const errData = await response.json();
        console.error("Eroare Backend ", errData);
        alert("Eroare la salvarea în baza de date");
      }
    } catch (error) {
      console.error("Eroare conexiune:", error);
      alert("Uvicorn trebuie sa ruleze pe portul 8000");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    handleCalculate(INITIAL_BUDGET);
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
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <header className="relative bg-white p-6 md:p-8 rounded-4xl shadow-sm border border-slate-100 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl -z-10 opacity-50" />
          <div className="relative flex flex-col lg:flex-row justify-between items-center gap-6">
            <Header />
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <BudgetInput
                budget={budget}
                loading={loading}
                onBudgetChange={handleInputChange}
                onRefresh={() => handleCalculate(budget)}
              />
              <button
                onClick={handleSaveToDb}
                disabled={data.length === 0 || loading || isSaving}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all disabled:opacity-30 flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-blue-100"
              >
                {isSaving ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Save size={20} />
                )}
                <span>{isSaving ? "Se salvează..." : "Salvare date"}</span>
              </button>
            </div>
          </div>
        </header>
        <main>
          <StockGrid data={data} loading={loading} />
        </main>
      </div>
    </div>
  );
}
