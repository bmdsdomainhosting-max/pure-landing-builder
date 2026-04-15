import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import BestSellers from "@/components/BestSellers";
import ProductGrid from "@/components/ProductGrid";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ProductModal from "@/components/ProductModal";
import AdminLogin from "@/components/AdminLogin";
import AdminBar from "@/components/AdminBar";
import type { Product } from "@/data/products";

const Index = () => {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onAdminClick={() => setShowLogin(true)} />
      <HeroSection />
      <CategoriesSection />
      <BestSellers onQuickView={setModalProduct} />
      <ProductGrid onQuickView={setModalProduct} />
      <WhyChoose />
      <Testimonials />
      <Footer />
      {modalProduct && (
        <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
      )}
      {showLogin && <AdminLogin onClose={() => setShowLogin(false)} />}
      <AdminBar />
    </div>
  );
};

export default Index;
