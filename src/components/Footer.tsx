import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import sidraLogo from "@/assets/sidra-logo.png";

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container mx-auto px-4 py-14">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <img src={sidraLogo} alt="SIDRA" className="h-12 brightness-0 invert" />
          <p className="text-secondary-foreground/70 text-sm leading-relaxed">Premium organic foods sourced directly from nature. Purely Yours – always natural, always authentic.</p>
          <div className="flex gap-3">
            {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/70">
            {["Shop All", "Best Sellers", "New Arrivals", "About Us", "Contact", "Blog"].map((l) => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/70">
            {["Honey", "Dates", "Cold-Pressed Oils", "Spices", "Nuts & Seeds", "Superfoods"].map((l) => (
              <li key={l}><a href="#" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 flex-shrink-0" /> Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +880 1XXX-XXXXXX</li>
            <li className="flex items-center gap-2"><Mail size={16} /> hello@sidra.com.bd</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="border-t border-secondary-foreground/10">
      <div className="container mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-secondary-foreground/50">
        <span>© 2026 SIDRA – Purely Yours. All rights reserved.</span>
        <div className="flex gap-4">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Refund Policy</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
