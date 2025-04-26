
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useCurrency, Currency } from "@/contexts/CurrencyContext";

const currencies = [
  {
    value: "USD",
    label: "US Dollar (USD)",
    symbol: "$"
  },
  {
    value: "EUR",
    label: "Euro (EUR)",
    symbol: "€"
  },
  {
    value: "GBP",
    label: "British Pound (GBP)",
    symbol: "£"
  },
];

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[180px] justify-between"
        >
          {currency}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px] p-0">
        <Command>
          <CommandEmpty>No currency found.</CommandEmpty>
          <CommandGroup>
            {currencies.map((item) => (
              <CommandItem
                key={item.value}
                value={item.value}
                onSelect={(currentValue) => {
                  setCurrency(currentValue as Currency);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currency === item.value ? "opacity-100" : "opacity-0"
                  )}
                />
                <span className="mr-2">{item.symbol}</span>
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
