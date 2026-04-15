import type { Product } from "@/supabase/products";
import { useAdmin } from "@/contexts/AdminContext";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";
interface Props {
  onQuickView: (p: Product) => void;
}

const ProductGrid = ({ onQuickView }: Props) => {
  const { siteData } = useAdmin();
const { products, loading } = useProducts();
  return (
    <section id="shop" className="py-16 md:py-20 bg-surface-green">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Shop Now</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Our Pure Collection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
{products.map((p) => (
                      <ProductCard key={p.id} product={p} onQuickView={onQuickView} />
                    ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
