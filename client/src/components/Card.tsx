import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import { assets } from "../assets/assets";

interface cardProps {
  product: Product;
}

const Card = ({ product }: cardProps) => {
  const navigate = useNavigate();

  return (
    <div className="group w-72 bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image */}
      <div
        className="relative h-48 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/product/${product._id}`)}
      >
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={product.images.at(1)}
          alt={product.name}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Price badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-secondary text-sm font-bold px-3 py-1 rounded-full shadow">
          ₹ {product.price}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Product name */}
        <h3
          className="text-primary font-bold text-base leading-snug line-clamp-1 cursor-pointer hover:underline underline-offset-2"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          {product.name}
        </h3>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Shop & Location */}
        <div className="flex flex-col gap-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <img src={assets.store} alt="store" width={13} className="opacity-60 shrink-0" />
            <span className="line-clamp-1 font-medium">{product.shop.shopName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <img src={assets.location} alt="location" width={13} className="opacity-60 shrink-0" />
            <span className="line-clamp-1">{product.shop.location}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <button className="py-2.5 rounded-xl text-sm font-semibold bg-light text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all duration-200 active:scale-95">
            🛒 Cart
          </button>
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30 transition-all duration-200 active:scale-95"
          >
            View →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;