"use server";

export interface StockResult {
  symbol: string;
  pe: number | null;
  pb: number | null;
  weight: number;
  allocation: number;
}

const TICKERS = [
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "META",
  "TSLA",
  "NVDA",
  "JPM",
  "V",
  "WMT",
];

export async function getValuationData(budget: number): Promise<StockResult[]> {
  const apiKey = process.env.FINNHUB_API_KEY;
  if (!apiKey) return [];

  try {
    const requests = TICKERS.map((ticker) =>
      fetch(
        `https://finnhub.io/api/v1/stock/metric?symbol=${ticker}&metric=all&token=${apiKey}`,
        {
          next: { revalidate: 3600 },
        }
      ).then((res) => res.json())
    );

    const responses = await Promise.all(requests);
    let totalScore = 0;

    const processed = responses.map((data, index) => {
      const pe = data.metric?.peTTM || null;
      const pb = data.metric?.pbQuarterly || data.metric?.pbAnnual || null;

      let score = 0;
      if (pe && pb && pe > 0 && pb > 0) {
        score = 1 / pe + 1 / pb;
        totalScore += score;
      }
      return { symbol: TICKERS[index], pe, pb, score };
    });

    return processed
      .map((s) => ({
        symbol: s.symbol,
        pe: s.pe,
        pb: s.pb,
        weight: totalScore > 0 ? (s.score / totalScore) * 100 : 0,
        allocation: totalScore > 0 ? (s.score / totalScore) * budget : 0,
      }))
      .sort((a, b) => b.allocation - a.allocation);
  } catch (err) {
    console.error(err);
    return [];
  }
}
