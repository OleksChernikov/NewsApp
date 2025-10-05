import { type ExchangeRatesData } from "../types/interfaces.ts";

export async function getExchangeRates(base: string = "USD"): Promise<ExchangeRatesData> {
  const API_KEY = import.meta.env.VITE_EXCHANGE_API_KEY;

  if (!API_KEY) throw new Error("Exchange API key not set");
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data.conversion_rates as ExchangeRatesData;
}
