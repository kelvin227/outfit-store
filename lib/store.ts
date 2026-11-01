export const storeName = process.env.NEXT_PUBLIC_STORE_NAME ?? "Your Store Name";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const categories = ["Outfits", "Accessories"];

// 25000 -> "₦25,000"
export function formatPrice(price: number) {
  return "₦" + price.toLocaleString("en-NG");
}

// Builds a link that opens WhatsApp with the order message already typed
export function whatsappOrderLink(productName: string, price: number) {
  const message = `Hello! I'd like to order: ${productName} (${formatPrice(price)}). Is it available?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
