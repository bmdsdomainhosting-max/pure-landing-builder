import { useState } from "react";
import { Search, Heart, User, Menu, X, Lock } from "lucide-react";
import sidraLogo from "@/assets/sidra-logo.png";
import { useAdmin } from "@/contexts/AdminContext";

interface NavbarProps {
  onAdminClick: () => void;
}

const navLinks = ["Shop", "Categories", "Best Sellers", "About Us", "Contact"];

const Navbar = ({ onAdminClick }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { isAdmin } = useAdmin();

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#" className="flex-shrink-0">
          <img src={sidraLogo} alt="SIDRA – Purely Yours" className="h-12 w-auto" />
        </a>
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors whitespace-nowrap">
              {link}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-foreground/60 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button className="hidden sm:block p-2 text-foreground/60 hover:text-primary transition-colors">
            <Heart size={20} />
          </button>
          {!isAdmin && (
            <button onClick={onAdminClick} className="p-2 text-foreground/60 hover:text-primary transition-colors" title="Admin Login">
              <Lock size={20} />
            </button>
          )}
          <button className="lg:hidden p-2 text-foreground/60" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {searchOpen && (
        <div className="border-t border-border px-4 py-3 bg-card">
          <div className="container mx-auto">
            <input type="text" placeholder="Search for honey, oils, dates..." className="w-full bg-muted rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
      )}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, "-")}`} className="block text-sm font-medium text-foreground/70 hover:text-primary py-2" onClick={() => setMobileOpen(false)}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
