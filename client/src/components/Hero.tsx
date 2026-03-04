import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1470&auto=format&fit=crop",
    title: "Fresh Fertilizers at Your Doorstep",
    subtitle:
      "Browse a wide range of fertilizers from trusted local shops near you.",
    cta: "Explore Products",
    href: "/products",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1470&auto=format&fit=crop",
    title: "Find the Best Price Near You",
    subtitle:
      "Compare products from multiple shops and book at the lowest price.",
    cta: "Browse Shops",
    href: "/shops",
  },
  {
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1470&auto=format&fit=crop",
    title: "Book Before It Runs Out",
    subtitle:
      "Reserve farming materials instantly — no payment needed, just book and pick up.",
    cta: "Get Started",
    href: "/products",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  const slide = slides[current];

  return (
    <div className="relative w-full h-[520px] md:h-[600px] overflow-hidden">
      {/* Background image */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${animating ? "opacity-0" : "opacity-100"
          }`}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center text-center px-6 transition-all duration-500 ${animating
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
          }`}
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-3">
          🌾 Farmer Cafe
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl leading-tight">
          {slide.title}
        </h1>
        <p className="mt-4 text-white/70 text-sm sm:text-base max-w-xl leading-relaxed">
          {slide.subtitle}
        </p>
        <button
          onClick={() => navigate(slide.href)}
          className="mt-8 px-7 py-3 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          {slide.cta}
          <img src={assets.arrowRight} alt="arrow" width={16} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === current
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm"
      >
        ‹
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition backdrop-blur-sm"
      >
        ›
      </button>
    </div>
  );
};

export default Hero;