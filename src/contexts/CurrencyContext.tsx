
import { createContext, useContext, useState, ReactNode } from "react";

export type Currency = "USD" | "EUR" | "GBP";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatAmount: (amount: number) => string;
  exchangeRates: Record<Currency, number>;
  convertAmount: (amount: number, from: Currency, to: Currency) => number;
}

const exchangeRates: Record<Currency, number> = {
  USD: 1.0,
  EUR: 0.85,
  GBP: 0.73,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<Currency>("USD");

  const formatAmount = (amount: number): string => {
    const symbols: Record<Currency, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
    };

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  };

  const convertAmount = (amount: number, from: Currency, to: Currency): number => {
    // Convert from source currency to USD (base currency)
    const inUSD = amount / exchangeRates[from];
    // Convert from USD to target currency
    return inUSD * exchangeRates[to];
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatAmount,
        exchangeRates,
        convertAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
