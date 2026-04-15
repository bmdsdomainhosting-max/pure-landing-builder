import { Star } from "lucide-react";
import { testimonials } from "@/data/products";
import { useState } from "react";

const Testimonials = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Real Stories</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mt-2">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="bg-card rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2">
                <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" loading="lazy" />
                <span className="font-semibold text-foreground text-sm">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.slice(0, 3).map((_, i) => (
            <button key={i} onClick={() => setActive(i)} className={`w-3 h-3 rounded-full transition-colors ${i === active ? "bg-primary" : "bg-primary-foreground/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
