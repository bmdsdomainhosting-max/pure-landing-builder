import { Star } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import EditableText from "./EditableText";
import EditableImage from "./EditableImage";

const Testimonials = () => {
  const { siteData, updateTestimonial } = useAdmin();

  return (
    <section className="py-16 md:py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Real Stories</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary-foreground mt-2">What Our Customers Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {siteData.testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="bg-card rounded-2xl p-6 shadow-lg space-y-4">
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <EditableText value={t.text} onSave={(v) => updateTestimonial(t.id, { text: v })} className="text-muted-foreground leading-relaxed text-sm italic" as="p" multiline />
              <div className="flex items-center gap-3 pt-2">
                <EditableImage src={t.photo} alt={t.name} onSave={(url) => updateTestimonial(t.id, { photo: url })} className="w-10 h-10 rounded-full object-cover" />
                <EditableText value={t.name} onSave={(v) => updateTestimonial(t.id, { name: v })} className="font-semibold text-foreground text-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
