export function formatPrice(
  price: number | string | unknown,
  currency = "EUR"
): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(price));
}
