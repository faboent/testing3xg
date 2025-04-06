export function generateSku() {
  const randomPart = Math.random().toString(36).substring(2, 10).toUpperCase();

  const sku = `${randomPart}`;

  return sku;
}
