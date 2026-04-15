import { Eye } from "lucide-react";
import type { Product } from "@/data/products";
import { useAdmin } from "@/contexts/AdminContext";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";

interface Props {
  product: Product;
  onQuickView: (p: Product) => void;
}

const ProductCard = ({ product, onQuickView }: Props) => {
  const { isEditing, updateProduct } = useAdmin();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <EditableImage
          src={product.image}
          alt={product.name}
          onSave={(url) => updateProduct(product.id, { image: url })}
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
        {!isEditing && (
          <button
            onClick={() => onQuickView(product)}
            className="absolute bottom-3 right-3 bg-card/90 backdrop-blur-sm p-2.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            <Eye size={18} />
          </button>
        )}
      </div>
      <div className="p-4 space-y-2">
        <EditableText value={product.category} onSave={(v) => updateProduct(product.id, { category: v })} className="text-xs font-medium text-primary uppercase tracking-wider" as="p" />
        <EditableText value={product.name} onSave={(v) => updateProduct(product.id, { name: v })} className="font-display font-semibold text-foreground leading-snug line-clamp-1" as="h3" />
        <EditableText value={product.description} onSave={(v) => updateProduct(product.id, { description: v })} className="text-sm text-muted-foreground line-clamp-2" as="p" multiline />
        <div className="flex items-center gap-2 pt-1">
          {isEditing ? (
            <EditableText value={`${product.price}`} onSave={(v) => updateProduct(product.id, { price: Number(v) || product.price })} className="text-lg font-bold text-foreground" />
          ) : (
            <span className="text-lg font-bold text-foreground">৳{product.price}</span>
          )}
          {product.originalPrice && !isEditing && (
            <span className="text-sm text-muted-foreground line-through">৳{product.originalPrice}</span>
          )}
        </div>
        <button
          onClick={() => onQuickView(product)}
          className="w-full mt-2 flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-2.5 rounded-xl hover:brightness-110 transition-all"
        >
          <Eye size={16} /> View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
