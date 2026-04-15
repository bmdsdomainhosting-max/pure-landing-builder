export const getWhatsAppLink = (productName?: string) => {
  const base = "https://wa.me/8801612233973";
  if (productName) {
    const msg = encodeURIComponent(`Hi, I want to order ${productName}`);
    return `${base}?text=${msg}`;
  }
  return `${base}?text=${encodeURIComponent("Hi, I'd like to place an order")}`;
};
