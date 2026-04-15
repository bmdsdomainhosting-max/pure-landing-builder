import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Plus, Pencil, Trash2, ArrowLeft, Upload, Link, X, RefreshCw, ExternalLink } from "lucide-react";
import type { Product } from "@/data/products";
import { getSheetsUrl, setSheetsUrl, fetchProductsFromSheet } from "@/lib/googleSheets";

const ADMIN_PASSWORD = "sidra2026";

const emptyProduct: Omit<Product, "id"> = {
  name: "",
  image: "",
  price: 0,
  description: "",
  category: "Honey",
  badge: undefined,
  inStock: true,
};

const categoryOptions = ["Honey", "Dates", "Spices", "Nuts & Seeds", "Cold-Pressed Oils", "Superfoods", "Ghee", "Wellness"];
const badgeOptions = ["", "Best Seller", "Popular", "Premium", "New", "Value Pack", "Organic"];

const Admin = () => {
  const { isAdmin, login, siteData, updateProduct, addProduct, deleteProduct, importProducts } = useAdmin();
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [sheetsUrl, setSheetsUrlState] = useState(getSheetsUrl());
  const [sheetsLoading, setSheetsLoading] = useState(false);
  const [sheetsError, setSheetsError] = useState("");
  const [tab, setTab] = useState<"products" | "sheets">("products");
  const fileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      login(password);
    } else {
      setAuthError(true);
      setPassword("");
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    addProduct({
      ...newProduct,
      id: Date.now(),
      badge: newProduct.badge || undefined,
    } as Product);
    setNewProduct(emptyProduct);
    setAddingProduct(false);
  };

  const handleEditSave = () => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  const handleSheetsSync = async () => {
    if (!sheetsUrl) return;
    setSheetsLoading(true);
    setSheetsError("");
    try {
      setSheetsUrl(sheetsUrl);
      const products = await fetchProductsFromSheet(sheetsUrl);
      if (products.length === 0) {
        setSheetsError("No products found. Check your sheet format.");
      } else {
        importProducts(products);
        setSheetsError("");
      }
    } catch {
      setSheetsError("Failed to fetch. Make sure the sheet is published to web.");
    } finally {
      setSheetsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm p-8 border border-border">
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="font-display text-xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter password to access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setAuthError(false); }}
              placeholder="Admin password"
              className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              autoFocus
            />
            {authError && <p className="text-destructive text-sm text-center">Incorrect password</p>}
            <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:brightness-110 transition-all">Login</button>
          </form>
          <button onClick={() => navigate("/")} className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">← Back to site</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={18} /> Back to site
            </button>
            <h1 className="font-display text-lg font-bold text-foreground">SIDRA Admin</h1>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">{siteData.products.length} Products</span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab("products")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "products" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"}`}>
            Products
          </button>
          <button onClick={() => setTab("sheets")} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${tab === "sheets" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground hover:bg-muted/80"}`}>
            Google Sheets
          </button>
        </div>

        {tab === "sheets" && (
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-foreground">Google Sheets Sync</h2>
            <p className="text-sm text-muted-foreground">
              Connect a Google Sheet to import products in bulk. Your sheet should have columns:
              <code className="mx-1 bg-muted px-2 py-0.5 rounded text-xs">name, image, price, originalPrice, description, category, badge, inStock</code>
            </p>
            <div className="bg-muted/50 rounded-xl p-4 text-xs text-muted-foreground space-y-1">
              <p><strong>Steps:</strong></p>
              <p>1. Open your Google Sheet</p>
              <p>2. Go to <strong>File → Share → Publish to web</strong></p>
              <p>3. Choose <strong>Entire document</strong> and <strong>CSV</strong> format</p>
              <p>4. Click Publish and copy the link</p>
              <p>5. Paste it below and click Sync</p>
            </div>
            <div className="flex gap-2">
              <input
                type="url"
                value={sheetsUrl}
                onChange={(e) => setSheetsUrlState(e.target.value)}
                placeholder="Paste Google Sheet URL or published CSV link..."
                className="flex-1 bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                onClick={handleSheetsSync}
                disabled={sheetsLoading || !sheetsUrl}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50"
              >
                <RefreshCw size={16} className={sheetsLoading ? "animate-spin" : ""} />
                {sheetsLoading ? "Syncing..." : "Sync Now"}
              </button>
            </div>
            {sheetsError && <p className="text-destructive text-sm">{sheetsError}</p>}
            <p className="text-xs text-muted-foreground">⚠️ Syncing will replace all current products with data from the sheet.</p>
          </div>
        )}

        {tab === "products" && (
          <div className="space-y-4">
            {/* Add button */}
            <div className="flex justify-between items-center">
              <h2 className="font-display text-lg font-bold text-foreground">All Products</h2>
              <button
                onClick={() => setAddingProduct(true)}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:brightness-110 transition-all"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            {/* Add Product Form */}
            {addingProduct && (
              <div className="bg-card rounded-2xl border-2 border-primary/30 p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-display font-bold text-foreground">New Product</h3>
                  <button onClick={() => setAddingProduct(false)} className="p-1 hover:bg-muted rounded-full"><X size={18} /></button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Name *</label>
                    <input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Product name" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Price (৳) *</label>
                    <input type="number" value={newProduct.price || ""} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="0" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Original Price (৳)</label>
                    <input type="number" value={newProduct.originalPrice || ""} onChange={(e) => setNewProduct({ ...newProduct, originalPrice: Number(e.target.value) || undefined })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" placeholder="Optional" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Category</label>
                    <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                      {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Badge</label>
                    <select value={newProduct.badge || ""} onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value || undefined })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                      {badgeOptions.map((b) => <option key={b} value={b}>{b || "None"}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={newProduct.inStock} onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })} className="w-4 h-4 accent-primary" />
                    <label className="text-sm text-foreground">In Stock</label>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Description</label>
                  <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y" rows={2} placeholder="Product description" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Image</label>
                  <div className="flex gap-2">
                    <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 bg-muted px-4 py-2.5 rounded-xl text-sm hover:bg-muted/80 transition-all">
                      <Upload size={16} /> Upload
                    </button>
                    <input
                      type="url"
                      value={newProduct.image.startsWith("data:") ? "" : newProduct.image}
                      onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                      placeholder="Or paste image URL..."
                      className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setNewProduct({ ...newProduct, image: url }))} className="hidden" />
                  {newProduct.image && <img src={newProduct.image} alt="Preview" className="w-20 h-20 object-cover rounded-xl mt-2" />}
                </div>
                <button onClick={handleAddProduct} className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm hover:brightness-110 transition-all">
                  Add Product
                </button>
              </div>
            )}

            {/* Edit Product Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={() => setEditingProduct(null)}>
                <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
                <div className="relative bg-card rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setEditingProduct(null)} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full"><X size={18} /></button>
                  <h3 className="font-display font-bold text-lg text-foreground mb-4">Edit Product</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Name</label>
                      <input value={editingProduct.name} onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Price (৳)</label>
                        <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Original Price</label>
                        <input type="number" value={editingProduct.originalPrice || ""} onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: Number(e.target.value) || undefined })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Category</label>
                        <select value={editingProduct.category} onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                          {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Badge</label>
                        <select value={editingProduct.badge || ""} onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value || undefined })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
                          {badgeOptions.map((b) => <option key={b} value={b}>{b || "None"}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Description</label>
                      <textarea value={editingProduct.description} onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })} className="w-full bg-muted rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y" rows={2} />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Image</label>
                      <div className="flex gap-2">
                        <button onClick={() => editFileRef.current?.click()} className="flex items-center gap-2 bg-muted px-4 py-2.5 rounded-xl text-sm hover:bg-muted/80 transition-all">
                          <Upload size={16} /> Upload
                        </button>
                        <input
                          type="url"
                          value={editingProduct.image.startsWith("data:") ? "" : editingProduct.image}
                          onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                          placeholder="Image URL"
                          className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>
                      <input ref={editFileRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, (url) => setEditingProduct({ ...editingProduct!, image: url }))} className="hidden" />
                      {editingProduct.image && <img src={editingProduct.image} alt="Preview" className="w-20 h-20 object-cover rounded-xl mt-2" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={editingProduct.inStock} onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })} className="w-4 h-4 accent-primary" />
                      <label className="text-sm text-foreground">In Stock</label>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={handleEditSave} className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:brightness-110 transition-all">Save Changes</button>
                    <button onClick={() => setEditingProduct(null)} className="px-6 py-3 rounded-xl text-sm font-semibold bg-muted hover:bg-muted/80 transition-all">Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {/* Product List */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Image</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Category</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Price</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Badge</th>
                      <th className="text-left px-4 py-3 font-semibold text-muted-foreground hidden md:table-cell">Stock</th>
                      <th className="text-right px-4 py-3 font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siteData.products.map((product) => (
                      <tr key={product.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground">{product.name}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{product.category}</td>
                        <td className="px-4 py-3 text-foreground font-semibold">
                          ৳{product.price}
                          {product.originalPrice && <span className="text-muted-foreground line-through ml-1 text-xs">৳{product.originalPrice}</span>}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          {product.badge && <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">{product.badge}</span>}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`text-xs font-medium ${product.inStock ? "text-accent" : "text-destructive"}`}>
                            {product.inStock ? "In Stock" : "Out"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => setEditingProduct({ ...product })} className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-foreground hover:text-primary">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => { if (confirm("Delete this product?")) deleteProduct(product.id); }} className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-foreground hover:text-destructive">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {siteData.products.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg">No products yet</p>
                  <p className="text-sm">Add your first product or sync from Google Sheets</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
