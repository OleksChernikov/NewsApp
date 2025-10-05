import { useEffect, useState } from "react";
import { getExchangeRates } from "../services/exchangeService.ts";
import { type ExchangeRatesData } from "../types/interfaces.ts";

export default function ExchangeRates() {
  const [rates, setRates] = useState<ExchangeRatesData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 useEffect(() => {
  getExchangeRates()
    .then(setRates)
    .catch((err: unknown) => {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    })
    .finally(() => setLoading(false));
}, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const selectedCurrencies = ["USD", "EUR", "UAH", "CZK"];

  return (
    <section className="exchange">
      <h2 className="exchange__title">Exchange Rates:</h2>
      <div className="currency">
        {selectedCurrencies.map((cur, i) => (
          <span key={cur} className="currency__results">
            {cur}: {rates[cur] ?? "-"}
            {i < selectedCurrencies.length - 1 ? " | " : ""}
          </span>
        ))}
      </div>
    </section>
  );
}
