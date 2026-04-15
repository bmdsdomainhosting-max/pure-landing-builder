import { ShieldCheck, Leaf, Truck, ThumbsUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const trustBadges = [
  { icon: ShieldCheck, label: "Organic Certified" },
  { icon: Leaf, label: "100% Natural" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: ThumbsUp, label: "100% Satisfaction" },
];

const HeroSection = () => (
  <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
    <img src={heroBg} alt="Premium organic products by SIDRA" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
    <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/30" />
    <div className="container mx-auto relative z-10 px-4 py-20">
      <div className="max-w-2xl space-y-6 animate-fade-in">
        <span className="inline-block bg-primary/20 text-primary-foreground border border-primary/40 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
          🌿 Premium Organic Foods
        </span>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight">
          Purely Yours – <span className="text-primary">100% Organic</span> Goodness from Nature
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-xl">
          Premium honey, cold-pressed oils, dates, spices & superfoods delivered fresh to your door.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <a href="#shop" className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/30">
            Shop Now
          </a>
          <a href="#categories" className="inline-flex items-center px-8 py-3.5 border-2 border-primary-foreground/40 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-all backdrop-blur-sm">
            Explore Categories
          </a>
        </div>
      </div>
      {/* Trust badges */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {trustBadges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 bg-primary-foreground/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-primary-foreground/10">
            <Icon className="w-6 h-6 text-primary flex-shrink-0" />
            <span className="text-primary-foreground text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroSection;
