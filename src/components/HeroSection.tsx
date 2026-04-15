import { ShieldCheck, Leaf, Truck, ThumbsUp } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useAdmin } from "@/contexts/AdminContext";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";
import { getWhatsAppLink } from "@/lib/whatsapp";

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
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/80 via-secondary/50 to-transparent" />

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
          <EditableText as="p" value={hero.subheadline} onSave={(v) => updateHero({ subheadline: v })} className="text-primary-foreground/90 text-lg md:text-xl leading-relaxed max-w-xl" multiline />
          <div className="flex flex-wrap gap-4 pt-2">
            <a href="#shop" className="inline-flex items-center px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/30">
              {hero.ctaText}
            </a>
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-primary-foreground/40 text-primary-foreground font-semibold rounded-lg hover:bg-primary-foreground/10 transition-all backdrop-blur-sm"
            >
              <svg viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.923 15.923 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.336 22.594c-.39 1.1-1.932 2.012-3.166 2.278-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.81-8.064-7.124-.23-.314-1.932-2.572-1.932-4.904 0-2.332 1.222-3.476 1.656-3.952.39-.432.924-.604 1.222-.604.152 0 .296.008.422.014.432.018.648.044.934.724.356.846 1.222 2.918 1.33 3.13.11.212.22.5.076.796-.136.304-.254.44-.466.686-.212.246-.416.434-.628.7-.196.23-.416.476-.17.908.246.432 1.094 1.8 2.348 2.918 1.616 1.44 2.878 1.91 3.352 2.11.356.152.78.11 1.068-.194.364-.39.814-.94 1.272-1.482.326-.39.738-.44 1.128-.28.398.152 2.462 1.162 2.884 1.374.424.212.704.314.81.494.102.178.102 1.048-.288 2.148z" />
              </svg>
              Order via WhatsApp
            </a>
          </div>
          <p className="text-primary-foreground/60 text-sm">⚡ 100+ happy customers across Bangladesh</p>
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
