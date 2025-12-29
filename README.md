# StockTracker

Aplicație Next.js care calculează o alocare simplă de date pe baza metricilor P/E și P/B, folosind date din Finnhub.

## Setup

1. Instalează dependențele:

```bash
npm install
```

2. Configurează variabilele de mediu (obligatoriu pentru date):

```bash
cp .env.example .env
```

În `.env` setează:

```bash
FINNHUB_API_KEY=...
```

Fără `FINNHUB_API_KEY`, aplicația va returna listă goală (nu afișează date).

## Rulare

Dezvoltare:

```bash
npm run dev
```

Deschide `http://localhost:3000`.

Build + start:

```bash
npm run build
npm start
```
