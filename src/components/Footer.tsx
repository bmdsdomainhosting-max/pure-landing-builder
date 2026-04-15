import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import sidraLogo from "@/assets/sidra-logo.png";

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/share/1LGAcvRhgZ/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/sidramartbd?igsh=aXRjd2p0b3ZjamRq", label: "Instagram" },
  { icon: MessageCircle, href: "https://wa.me/8801612233973", label: "WhatsApp" },
];

const Footer = () => (
  <footer className="bg-secondary text-secondary-foreground">
    <div className="container mx-auto px-4 py-14">
      <div className="grid md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <img src={sidraLogo} alt="SIDRA" className="h-12 brightness-0 invert" />
          <p className="text-secondary-foreground/70 text-sm leading-relaxed">Premium organic foods sourced directly from nature. Purely Yours – always natural, always authentic.</p>
          <div className="flex gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors" aria-label={label}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/70">
            {["Shop All", "Best Sellers", "New Arrivals", "About Us", "Contact"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-sm text-secondary-foreground/70">
            {["Honey", "Dates", "Cold-Pressed Oils", "Spices", "Nuts & Seeds", "Superfoods"].map((l) => (
              <li key={l}><a href="#categories" className="hover:text-primary transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-secondary-foreground/70">
            <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 flex-shrink-0" /> Dhaka, Bangladesh</li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <a href="tel:+8801612233973" className="hover:text-primary transition-colors">01612233973</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <a href="mailto:sidramartbd@gmail.com" className="hover:text-primary transition-colors">sidramartbd@gmail.com</a>
            </li>
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
