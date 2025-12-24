import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stock Tracker | Intelligent Portfolio Allocation",
  description:
    "Premium stock portfolio allocation tool with real-time valuation metrics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
