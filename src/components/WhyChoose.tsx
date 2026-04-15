import { Leaf, Sprout, ShieldCheck, Award, Heart } from "lucide-react";

const reasons = [
  { icon: Leaf, title: "100% Organic", desc: "Every product is naturally sourced with zero chemicals or pesticides." },
  { icon: Sprout, title: "Farm to Table", desc: "Directly sourced from trusted farmers across Bangladesh." },
  { icon: ShieldCheck, title: "No Preservatives", desc: "Pure, fresh, and free from artificial additives." },
  { icon: Award, title: "Quality Certified", desc: "Rigorous quality checks at every step of the process." },
  { icon: Heart, title: "Purely Yours Promise", desc: "If you're not satisfied, we'll make it right. Always." },
];

const WhyChoose = () => (
  <section className="py-16 md:py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">We Care</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Why Choose SIDRA</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {reasons.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center space-y-3 p-6 rounded-2xl bg-surface-green border border-border hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
              <Icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;
