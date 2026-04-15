import { ShieldCheck, Leaf, Truck, ThumbsUp, ImageIcon } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useAdmin } from "@/contexts/AdminContext";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import { useState } from "react";

const trustBadges = [
  { icon: ShieldCheck, label: "Organic Certified" },
  { icon: Leaf, label: "100% Natural" },
  { icon: Truck, label: "Fast Delivery" },
  { icon: ThumbsUp, label: "100% Satisfaction" },
];

const HeroSection = () => {
  const { siteData, updateHero, isEditing } = useAdmin();
  const { hero } = siteData;
  const heroImage = hero.image || heroBg;

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      <img src={heroImage} alt="Premium organic products by SIDRA" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-secondary/30" />

      {isEditing && (
        <EditableImage
          src={heroImage}
          alt="Hero background"
          onSave={(url) => updateHero({ image: url })}
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          buttonMode
        />
      )}

      <div className="container mx-auto relative z-10 px-4 py-20">
        <div className="max-w-2xl space-y-6 animate-fade-in">
          <EditableText value={hero.badge} onSave={(v) => updateHero({ badge: v })} className="inline-block bg-primary/20 text-primary-foreground border border-primary/40 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm" />
          <EditableText as="h1" value={hero.headline} onSave={(v) => updateHero({ headline: v })} className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight" />
          <EditableText as="p" value={hero.subheadline} onSave={(v) => updateHero({ subheadline: v })} className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed max-w-xl" multiline />
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#shop" className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/30">
              {hero.ctaText}
            </a>
            <a href="#categories" className="inline-flex items-center px-8 py-3.5 border-2 border-primary-foreground/40 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-all backdrop-blur-sm">
              {hero.secondaryCta}
            </a>
          </div>
        </div>
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
};

export default HeroSection;
