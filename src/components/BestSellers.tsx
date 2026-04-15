import type { Product } from "@/data/products";
import { useAdmin } from "@/contexts/AdminContext";
import ProductCard from "./ProductCard";

interface Props {
  onQuickView: (p: Product) => void;
}

const BestSellers = ({ onQuickView }: Props) => {
  const { siteData } = useAdmin();
  const bestSellers = siteData.products.filter((p) => p.badge === "Best Seller" || p.badge === "Popular" || p.badge === "Premium").slice(0, 6);
  const items = bestSellers.length < 6 ? [...bestSellers, ...siteData.products.filter((p) => !bestSellers.includes(p)).slice(0, 6 - bestSellers.length)] : bestSellers;

  return (
    <section id="best-sellers" className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Most Loved</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Best Sellers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
