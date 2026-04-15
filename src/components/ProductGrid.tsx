import { products, type Product } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

const ProductGrid = ({ onAddToCart, onQuickView }: Props) => (
  <section id="shop" className="py-16 md:py-20 bg-surface-green">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Shop Now</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Our Pure Collection</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onQuickView={onQuickView} />
        ))}
      </div>
      <div className="text-center mt-10">
        <button className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all">
          View All Products
        </button>
      </div>
    </div>
  </section>
);

export default ProductGrid;
