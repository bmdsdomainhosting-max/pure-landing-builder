import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellers from "@/components/BestSellers";
import ProductGrid from "@/components/ProductGrid";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import AdminLogin from "@/components/AdminLogin";
import AdminBar from "@/components/AdminBar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useProducts, type Product } from "@/hooks/useProducts";

const Index = () => {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [showLogin, setShowLogin] = useState(false);
const { products, loading } = useProducts();
  return (
    <div className="min-h-screen">
      <Navbar onAdminClick={() => setShowLogin(true)} />
      <HeroSection />
      <CategoriesSection />
      <BestSellers products={products} onQuickView={setModalProduct} />
<ProductGrid products={products} onQuickView={setModalProduct} />
      <WhyChoose />
      <Testimonials />
      <OrderCTA />
      <Footer />
      {modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
      )}
      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
      <AdminBar />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
