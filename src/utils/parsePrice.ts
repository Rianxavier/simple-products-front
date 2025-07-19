export const parsePriceFunction = (priceStr: string): number => {
  const cleaned = priceStr.replace(/[^\d,.-]/g, "");
  const normalized = cleaned.replace(",", ".");
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
};
