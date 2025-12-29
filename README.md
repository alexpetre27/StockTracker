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

Pentru a rula backend-ul:
Deschidem terminalul in folderul backend
Rulam comanda: uvicorn main:app --reload

Pentru a vizualiza endpoint-urile, accesam urmatorul link:
http://127.0.0.1:8000/docs

In cazul in care vrem sa testam:
Selectam POST/save-data
Click pe "Try it out"
Completam payload-ul e test cu urmatorul exemplu:
{
"budget": 1000,
"stocks": [
{
"symbol": "AAPL",
"pe": 25.5,
"pb": 10.2,
"weight": 0.5,
"allocation": 500
}
]
}
Click pe "Execute"
in cazul in care totul este corect, vom primi raspunsul urmator:
{
"message": "Datele au fost salvate cu succes",
"portfolio_id": 1
}
Pentru a verifica baza de date:
Deschidem DB Browser for SQLite
Selectam baza de date (stocks_portofolio.db)
Accesam tabul "Browse Data" si selectam tabelul al caror date dorim sa le vizualizam. Astfel se vede clar ca datele generate de API au fost salvate in baza de date

Sau putem alege endpoint-ul GET de pe linkul http://127.0.0.1:8000/docs
Apasam "Try it out" si "Execute"
Vom primi lista tuturor stock-urilor salvate
