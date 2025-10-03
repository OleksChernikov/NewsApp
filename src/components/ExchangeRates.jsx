import { useState, useEffect } from "react";

const API_KEY = "aa06261284f56e5d9e574313";
const baseCurrency = "USD";

fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`)
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  })
  .then(data => {
    console.log("Exchange rates:", data.conversion_rates);
    console.log("USD -> EUR:", data.conversion_rates.EUR);
  })
  .catch(err => console.error(err));

export default function ExchangeRates() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_KEY = "aa06261284f56e5d9e574313";
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`)
      .then(res => res.json())
      .then(data => {
        setRates(data.conversion_rates);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <div>Loading...</div>;

  const selectedCurrencies = ["USD", "EUR", "UAH", "CZK"];

  return (
    <section className="exchange">
      <h2 className="exchange__title">Exchange Rates:</h2>
      <div className="currency">
        {selectedCurrencies.map((cur, i) => (
          <span key={cur} className="currency__results">
            {cur}: {rates[cur]}
            {i < selectedCurrencies.length - 1 ? " | " : ""}
          </span>
        ))}
      </div>
    </section>
  );
}