import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface Props {
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

const MiniCart = ({ items, onClose, onUpdateQty, onRemove }: Props) => {
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="fixed inset-0 z-[90]" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h3 className="font-display font-bold text-lg text-foreground">Your Cart ({items.length})</h3>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors"><X size={20} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag className="mx-auto text-muted-foreground" size={48} />
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : items.map((item) => (
            <div key={item.product.id} className="flex gap-4 p-3 rounded-xl bg-muted/50">
              <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-lg object-cover" />
              <div className="flex-1 space-y-1">
                <h4 className="font-semibold text-sm text-foreground">{item.product.name}</h4>
                <p className="text-primary font-bold text-sm">৳{item.product.price}</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => onUpdateQty(item.product.id, Math.max(0, item.qty - 1))} className="p-1 hover:bg-muted rounded"><Minus size={14} /></button>
                  <span className="text-sm font-medium w-6 text-center">{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.product.id, item.qty + 1)} className="p-1 hover:bg-muted rounded"><Plus size={14} /></button>
                  <button onClick={() => onRemove(item.product.id)} className="ml-auto text-xs text-destructive hover:underline">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-t border-border space-y-4">
            <div className="flex justify-between font-display font-bold text-lg">
              <span>Total</span>
              <span className="text-foreground">৳{total}</span>
            </div>
            <button className="w-full bg-primary text-primary-foreground font-semibold py-3.5 rounded-xl hover:brightness-110 transition-all">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCart;
