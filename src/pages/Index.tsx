import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellers from "@/components/BestSellers";
import ProductGrid from "@/components/ProductGrid";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import MiniCart, { type CartItem } from "@/components/MiniCart";
import type { Product } from "@/data/products";

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, qty }];
    });
  }, []);

  const updateQty = useCallback((id: number, qty: number) => {
    if (qty <= 0) setCart((prev) => prev.filter((i) => i.product.id !== id));
    else setCart((prev) => prev.map((i) => i.product.id === id ? { ...i, qty } : i));
  }, []);

  const removeItem = useCallback((id: number) => setCart((prev) => prev.filter((i) => i.product.id !== id)), []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <HeroSection />
      <CategoriesSection />
      <BestSellers onAddToCart={addToCart} onQuickView={setModalProduct} />
      <ProductGrid onAddToCart={addToCart} onQuickView={setModalProduct} />
      <WhyChoose />
      <Testimonials />
      <Footer />
      {modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} onAddToCart={addToCart} />
      )}
      {cartOpen && (
        <MiniCart items={cart} onClose={() => setCartOpen(false)} onUpdateQty={updateQty} onRemove={removeItem} />
      )}
    </div>
  );
};

export default Index;
