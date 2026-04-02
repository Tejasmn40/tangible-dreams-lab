import { useState, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import gsap from "gsap";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Geometric Vase",
    category: "Home Decor",
    price: 34.99,
    rating: 4.8,
    reviews: 124,
    image: "🏺",
    description: "Low-poly geometric vase with organic curves",
  },
  {
    id: 2,
    name: "Articulated Dragon",
    category: "Figurines",
    price: 49.99,
    rating: 4.9,
    reviews: 312,
    image: "🐉",
    description: "Fully articulated dragon with 24 joints",
  },
  {
    id: 3,
    name: "Phone Dock Pro",
    category: "Accessories",
    price: 19.99,
    rating: 4.6,
    reviews: 89,
    image: "📱",
    description: "Minimalist charging dock with cable management",
  },
  {
    id: 4,
    name: "Desk Organizer",
    category: "Office",
    price: 27.99,
    rating: 4.7,
    reviews: 201,
    image: "🗂️",
    description: "Modular hex-tile desk organization system",
  },
  {
    id: 5,
    name: "Miniature Castle",
    category: "Figurines",
    price: 59.99,
    rating: 4.9,
    reviews: 76,
    image: "🏰",
    description: "Highly detailed medieval castle model",
  },
  {
    id: 6,
    name: "Lamp Shade",
    category: "Home Decor",
    price: 42.99,
    rating: 4.5,
    reviews: 143,
    image: "💡",
    description: "Voronoi pattern lampshade with warm diffusion",
  },
];

const ShowroomSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const offset = i - activeIndex;
      gsap.to(card, {
        x: offset * 320,
        scale: offset === 0 ? 1 : 0.88,
        opacity: Math.abs(offset) > 2 ? 0 : offset === 0 ? 1 : 0.5,
        rotateY: offset * -5,
        zIndex: offset === 0 ? 10 : 5 - Math.abs(offset),
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }, [activeIndex]);

  const navigate = (dir: number) => {
    setActiveIndex((prev) => Math.max(0, Math.min(products.length - 1, prev + dir)));
  };

  return (
    <section id="showroom" className="section-padding overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-primary">
            Digital Showroom
          </span>
          <h2 className="font-heading text-4xl font-bold md:text-5xl">
            Curated <span className="text-gradient">Templates</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Browse our handpicked collection of premium 3D-printable designs, ready to customize and manufacture.
          </p>
        </div>

        {/* Carousel */}
        <div className="perspective-1000 relative flex items-center justify-center" style={{ height: 440 }}>
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="glass-card absolute w-72 cursor-pointer p-6 transition-shadow"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-muted text-6xl">
                {product.image}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-primary">
                {product.category}
              </span>
              <h3 className="mt-1 font-heading text-lg font-semibold">{product.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{product.description}</p>
              <div className="mt-3 flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-heading text-xl font-bold text-primary">
                  ${product.price}
                </span>
                <button className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20">
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            disabled={activeIndex === 0}
            className="glass-card rounded-full p-2 text-foreground transition-colors hover:text-primary disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === activeIndex ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => navigate(1)}
            disabled={activeIndex === products.length - 1}
            className="glass-card rounded-full p-2 text-foreground transition-colors hover:text-primary disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShowroomSection;
