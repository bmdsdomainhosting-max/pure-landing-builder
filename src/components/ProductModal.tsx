import { X } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: Props) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
    <div className="relative bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto grid md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
      <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
        <X size={18} />
      </button>
      <div className="aspect-square bg-muted">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-tl-2xl md:rounded-l-2xl" />
      </div>
      <div className="p-6 md:p-8 flex flex-col justify-center space-y-4">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">{product.category}</span>
        <h2 className="font-display text-2xl font-bold text-foreground">{product.name}</h2>
        <p className="text-muted-foreground leading-relaxed">{product.description}</p>
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground">৳{product.price}</span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">৳{product.originalPrice}</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground pt-2">
          {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
        </p>
      </div>
    </div>
  </div>
);

export default ProductModal;
