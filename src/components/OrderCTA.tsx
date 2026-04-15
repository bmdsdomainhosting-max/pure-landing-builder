const OrderCTA = () => (
  <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/10">
    <div className="container mx-auto px-4 text-center space-y-6">
      <h2 className="font-display text-3xl md:text-5xl font-extrabold text-foreground">
        Ready to Go <span className="text-primary">Organic</span>?
      </h2>
      <p className="text-muted-foreground text-lg max-w-xl mx-auto">
        Order directly via WhatsApp — fast, easy & personal. Get your premium organic products delivered to your doorstep.
      </p>
      <div className="flex flex-col items-center gap-3 pt-4">
        <a
          href="https://wa.me/8801612233973?text=Hi%2C%20I%27d%20like%20to%20place%20an%20order"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-primary text-primary-foreground font-bold text-lg px-10 py-4 rounded-2xl shadow-xl shadow-primary/30 hover:brightness-110 hover:scale-105 transition-all duration-300"
        >
          <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.923 15.923 0 0016.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.336 22.594c-.39 1.1-1.932 2.012-3.166 2.278-.846.18-1.95.324-5.67-1.218-4.762-1.972-7.826-6.81-8.064-7.124-.23-.314-1.932-2.572-1.932-4.904 0-2.332 1.222-3.476 1.656-3.952.39-.432.924-.604 1.222-.604.152 0 .296.008.422.014.432.018.648.044.934.724.356.846 1.222 2.918 1.33 3.13.11.212.22.5.076.796-.136.304-.254.44-.466.686-.212.246-.416.434-.628.7-.196.23-.416.476-.17.908.246.432 1.094 1.8 2.348 2.918 1.616 1.44 2.878 1.91 3.352 2.11.356.152.78.11 1.068-.194.364-.39.814-.94 1.272-1.482.326-.39.738-.44 1.128-.28.398.152 2.462 1.162 2.884 1.374.424.212.704.314.81.494.102.178.102 1.048-.288 2.148z" />
          </svg>
          Order Now on WhatsApp
        </a>
        <span className="text-sm text-muted-foreground">⚡ Order now before stock runs out</span>
        <div className="flex items-center gap-6 pt-2 text-sm text-muted-foreground">
          <span>✅ 100+ Happy Customers</span>
          <span>🚚 Fast Delivery</span>
          <span>💯 Genuine Products</span>
        </div>
      </div>
    </div>
  </section>
);

export default OrderCTA;
