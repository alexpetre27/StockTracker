import { BarChart3 } from "lucide-react";

export function Header() {
  return (
    <div className="flex items-center gap-4 w-full lg:w-auto">
      <div className="bg-indigo-600 p-2.5 rounded-xl text-white">
        <BarChart3 size={24} />
      </div>
      <div>
        <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase">
          Stock Tracker
        </h1>
      </div>
    </div>
  );
}
