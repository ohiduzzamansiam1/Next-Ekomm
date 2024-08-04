import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currency_formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export function formatCurrency(amount: number) {
  return currency_formatter.format(amount);
}

const number_formatter = new Intl.NumberFormat("en-US");

export function formatNumber(amount: number) {
  return number_formatter.format(amount);
}
