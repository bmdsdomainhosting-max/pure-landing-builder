import { X } from "lucide-react";
import type { Product } from "@/data/products";
import { getWhatsAppLink } from "@/lib/whatsapp";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: Props) => {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

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
            {discount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">-{discount}%</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {product.inStock ? "✅ In Stock — Ready to ship" : "❌ Out of Stock"}
          </p>
          {product.badge && (
            <p className="text-xs font-semibold text-accent">🔥 {product.badge} — Order before it's gone!</p>
          )}
          <a
            href={getWhatsAppLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20 text-base"
          >
            <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
              <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.923 15.923 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.336 22.594c-.39 1.1-1.932 2.012-3.166 2.278-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.81-8.064-7.124-.23-.314-1.932-2.572-1.932-4.904 0-2.332 1.222-3.476 1.656-3.952.39-.432.924-.604 1.222-.604.152 0 .296.008.422.014.432.018.648.044.934.724.356.846 1.222 2.918 1.33 3.13.11.212.22.5.076.796-.136.304-.254.44-.466.686-.212.246-.416.434-.628.7-.196.23-.416.476-.17.908.246.432 1.094 1.8 2.348 2.918 1.616 1.44 2.878 1.91 3.352 2.11.356.152.78.11 1.068-.194.364-.39.814-.94 1.272-1.482.326-.39.738-.44 1.128-.28.398.152 2.462 1.162 2.884 1.374.424.212.704.314.81.494.102.178.102 1.048-.288 2.148z" />
            </svg>
            Order Now on WhatsApp
          </a>
          <span className="text-xs text-center text-muted-foreground">⚡ Order now before stock runs out</span>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
