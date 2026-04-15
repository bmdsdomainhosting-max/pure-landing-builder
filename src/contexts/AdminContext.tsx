import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { products as defaultProducts, testimonials as defaultTestimonials, categories as defaultCategories, type Product } from "@/data/products";

interface HeroData {
  badge: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  secondaryCta: string;
}

interface Testimonial {
  id: number;
  name: string;
  photo: string;
  rating: number;
  text: string;
}

interface Category {
  id: number;
  name: string;
  icon: string;
}

interface SiteData {
  hero: HeroData;
  products: Product[];
  testimonials: Testimonial[];
  categories: Category[];
}

interface AdminContextType {
  isAdmin: boolean;
  isEditing: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  toggleEditing: () => void;
  siteData: SiteData;
  updateHero: (hero: Partial<HeroData>) => void;
  updateProduct: (id: number, data: Partial<Product>) => void;
  updateTestimonial: (id: number, data: Partial<Testimonial>) => void;
  updateCategory: (id: number, data: Partial<Category>) => void;
}

const ADMIN_PASSWORD = "sidra2026";
const STORAGE_KEY = "sidra-site-data";
const AUTH_KEY = "sidra-admin";

const defaultHero: HeroData = {
  badge: "🌿 Premium Organic Foods",
  headline: "Purely Yours – 100% Organic Goodness from Nature",
  subheadline: "Premium honey, cold-pressed oils, dates, spices & superfoods delivered fresh to your door.",
  ctaText: "Shop Now",
  secondaryCta: "Explore Categories",
};

const defaultSiteData: SiteData = {
  hero: defaultHero,
  products: defaultProducts,
  testimonials: defaultTestimonials,
  categories: defaultCategories,
};

function loadData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return defaultSiteData;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be inside AdminProvider");
  return ctx;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem(AUTH_KEY) === "true");
  const [isEditing, setIsEditing] = useState(false);
  const [siteData, setSiteData] = useState<SiteData>(loadData);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
  }, [siteData]);

  const login = useCallback((password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem(AUTH_KEY, "true");
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAdmin(false);
    setIsEditing(false);
    localStorage.removeItem(AUTH_KEY);
  }, []);

  const toggleEditing = useCallback(() => setIsEditing((v) => !v), []);

  const updateHero = useCallback((hero: Partial<HeroData>) => {
    setSiteData((d) => ({ ...d, hero: { ...d.hero, ...hero } }));
  }, []);

  const updateProduct = useCallback((id: number, data: Partial<Product>) => {
    setSiteData((d) => ({
      ...d,
      products: d.products.map((p) => (p.id === id ? { ...p, ...data } : p)),
    }));
  }, []);

  const updateTestimonial = useCallback((id: number, data: Partial<Testimonial>) => {
    setSiteData((d) => ({
      ...d,
      testimonials: d.testimonials.map((t) => (t.id === id ? { ...t, ...data } : t)),
    }));
  }, []);

  const updateCategory = useCallback((id: number, data: Partial<Category>) => {
    setSiteData((d) => ({
      ...d,
      categories: d.categories.map((c) => (c.id === id ? { ...c, ...data } : c)),
    }));
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, isEditing, login, logout, toggleEditing, siteData, updateHero, updateProduct, updateTestimonial, updateCategory }}>
      {children}
    </AdminContext.Provider>
  );
};
