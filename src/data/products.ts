export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  badge?: string;
  inStock: boolean;
}

export const categories = [
  { id: 1, name: "Honey", icon: "🍯" },
  { id: 2, name: "Dates", icon: "🌴" },
  { id: 3, name: "Spices", icon: "🌶️" },
  { id: 4, name: "Nuts & Seeds", icon: "🥜" },
  { id: 5, name: "Cold-Pressed Oils", icon: "🫒" },
  { id: 6, name: "Superfoods", icon: "🥗" },
  { id: 7, name: "Ghee", icon: "🧈" },
  { id: 8, name: "Wellness", icon: "🌿" },
];

export const products: Product[] = [
  { id: 1, name: "Sundarbans Raw Honey", description: "Pure wild honey from the Sundarbans mangrove forest. Unprocessed & naturally flavored.", price: 850, originalPrice: 1000, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop", category: "Honey", badge: "Best Seller", inStock: true },
  { id: 2, name: "Lychee Flower Honey", description: "Delicate lychee blossom honey with floral aroma. Single-origin from Rajshahi.", price: 750, originalPrice: 900, image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400&h=400&fit=crop", category: "Honey", badge: "New", inStock: true },
  { id: 3, name: "Black Seed Honey", description: "Premium honey infused with black seed (Kalonji) for added health benefits.", price: 950, image: "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=400&h=400&fit=crop", category: "Honey", inStock: true },
  { id: 4, name: "Ajwa Dates Premium", description: "Hand-picked Ajwa dates from Madinah. Soft, sweet & nutrient-rich.", price: 1200, originalPrice: 1500, image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400&h=400&fit=crop", category: "Dates", badge: "Premium", inStock: true },
  { id: 5, name: "Medjool Dates", description: "Large, caramel-like Medjool dates. Perfect for snacking & smoothies.", price: 1100, image: "https://images.unsplash.com/photo-1610917040803-1fccf9623064?w=400&h=400&fit=crop", category: "Dates", inStock: true },
  { id: 6, name: "Cold-Pressed Mustard Oil", description: "Traditional wooden ghani pressed mustard oil. Rich flavor, zero chemicals.", price: 450, originalPrice: 550, image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop", category: "Cold-Pressed Oils", badge: "Popular", inStock: true },
  { id: 7, name: "Black Seed Oil (Kalonji)", description: "Pure cold-pressed black seed oil. Known for immunity boosting properties.", price: 650, image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop", category: "Cold-Pressed Oils", inStock: true },
  { id: 8, name: "Organic Turmeric Powder", description: "Lakadong turmeric with high curcumin content. Sun-dried & stone ground.", price: 280, originalPrice: 350, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&h=400&fit=crop", category: "Spices", inStock: true },
  { id: 9, name: "Mixed Dry Fruits Pack", description: "Premium assortment of almonds, cashews, pistachios, walnuts & raisins.", price: 980, originalPrice: 1200, image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400&h=400&fit=crop", category: "Nuts & Seeds", badge: "Value Pack", inStock: true },
  { id: 10, name: "Chia Seeds Organic", description: "Nutrient-dense chia seeds. Rich in omega-3, fiber & protein.", price: 380, image: "https://images.unsplash.com/photo-1511690743698-d9d18f7e20f1?w=400&h=400&fit=crop", category: "Superfoods", inStock: true },
  { id: 11, name: "Pure Desi Ghee", description: "Traditional slow-cooked desi ghee from grass-fed cow milk. Rich aroma.", price: 720, originalPrice: 850, image: "https://images.unsplash.com/photo-1631209121750-a9f656d1cae5?w=400&h=400&fit=crop", category: "Ghee", badge: "Organic", inStock: true },
  { id: 12, name: "Moringa Leaf Powder", description: "Superfood moringa powder. Packed with vitamins, minerals & antioxidants.", price: 320, image: "https://images.unsplash.com/photo-1622467827417-bbe6014d3ea4?w=400&h=400&fit=crop", category: "Wellness", inStock: true },
{
  id: 13,
  name: "সুন্দরবনের প্রাকৃতিক চাকের মধু - 150 gm",
  description: "সুন্দরবনের মধু হলো সুন্দরবনের বনের ভেতরের বিভিন্ন বুনো ফুল ও গাছ থেকে মৌমাছি সংগ্রহ করা প্রাকৃতিক মধু। এটি খুব বিশুদ্ধ ও পুষ্টিকর হিসেবে পরিচিত। এই মধু শরীরের শক্তি বাড়াতে, রোগ প্রতিরোধ ক্ষমতা উন্নত করতে এবং হজমে সহায়তা করতে পারে। এতে অ্যান্টিঅক্সিডেন্ট থাকায় শরীরের ক্ষতিকর উপাদান কমাতে সাহায্য করে। এছাড়া এটি ঠান্ডা, কাশি ও গলা ব্যথায় কিছুটা আরাম দিতে পারে।",
  price: 280,
  originalPrice: 300,
  image: "https://ibb.co/Hf3hcyYN",
  category: "Honey",
  badge: "Best Seller",
  inStock: true
}];

export const testimonials = [
  { id: 1, name: "Fatima Rahman", photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop", rating: 5, text: "The Sundarbans honey from SIDRA is the purest I've ever tasted. My whole family loves it! Truly organic and authentic." },
  { id: 2, name: "Karim Ahmed", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", rating: 5, text: "Their cold-pressed mustard oil has the most authentic flavor. It reminds me of my grandmother's cooking. Excellent quality!" },
  { id: 3, name: "Nusrat Jahan", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", rating: 5, text: "I've been ordering Ajwa dates and black seed oil for months now. Consistent quality and fast delivery every time." },
  { id: 4, name: "Rafiq Islam", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", rating: 5, text: "SIDRA's products are genuinely organic. The turmeric powder and moringa are staples in our home now. Highly recommended!" },
  { id: 5, name: "Aisha Begum", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", rating: 5, text: "Best organic brand in Bangladesh! Their packaging is beautiful and every product feels premium. Love the pocket honey too." },
];
