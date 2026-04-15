import { Eye, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  onAddToCart: (p: Product) => void;
  onQuickView: (p: Product) => void;
}

const ProductCard = ({ product, onAddToCart, onQuickView }: Props) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
            Save {discount}%
          </span>
        )}
        <button
          onClick={() => onQuickView(product)}
          className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          <Eye size={18} />
        </button>
      </div>
      <div className="p-4 space-y-2">
        <p className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</p>
        <h3 className="font-display font-semibold text-foreground leading-snug line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-2 pt-1">
          <span className="text-lg font-bold text-foreground">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">৳{product.originalPrice}</span>
          )}
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
