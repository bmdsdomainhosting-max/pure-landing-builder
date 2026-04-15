import { categories } from "@/data/products";

const CategoriesSection = () => (
  <section id="categories" className="py-16 md:py-20 bg-surface-green">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Browse By</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">Featured Categories</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className="group flex flex-col items-center gap-3 bg-card rounded-2xl p-5 shadow-sm border border-border hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
          >
            <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
            <span className="text-sm font-semibold text-foreground">{cat.name}</span>
          </button>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
