import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, qty: number) => void;
}

const ProductModal = ({ product, onClose, onAddToCart }: Props) => {
  const [qty, setQty] = useState(1);

  return (
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
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2.5 hover:bg-muted transition-colors"><Minus size={16} /></button>
              <span className="px-5 font-semibold text-foreground">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-2.5 hover:bg-muted transition-colors"><Plus size={16} /></button>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => { onAddToCart(product, qty); onClose(); }} className="flex-1 flex items-center justify-center gap-2 bg-accent text-accent-foreground font-semibold py-3 rounded-xl hover:brightness-110 transition-all">
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button onClick={onClose} className="flex-1 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:brightness-110 transition-all">
              Buy Now
            </button>
          </div>
          <p className="text-xs text-muted-foreground text-center pt-1">
            {product.inStock ? "✅ In Stock – Ships within 24 hours" : "❌ Out of Stock"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
