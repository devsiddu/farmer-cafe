import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import type { ShopType } from "../types";

interface ShopCardProps {
  shop: ShopType;
  onView?: (shopId: string) => void;
}

const ShopCard = ({ shop, onView }: ShopCardProps) => {
  return (
    <div className="group w-72 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden h-44">
        <img
          src={shop.image ? shop.image : assets.shop}
          alt={shop.shopName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* Status badge — floated over image */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm border ${shop.isOpen
            ? "bg-green-50/80 border-green-200 text-green-700"
            : "bg-red-50/80 border-red-200 text-red-600"
            }`}
        >
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full mr-1.5 mb-px align-middle ${shop.isOpen ? "bg-green-500 animate-pulse" : "bg-red-400"
              }`}
          />
          {shop.isOpen ? "Open" : "Closed"}
        </span>

        {/* Rating chip — bottom-left of image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-amber-500 px-2.5 py-1 rounded-full shadow">
          ★ <span className="text-gray-700">{shop.rating}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 gap-1">
        {/* Shop name */}
        <h3 className="text-base font-bold text-primary leading-tight line-clamp-1 tracking-tight">
          {shop.shopName}
        </h3>

        {/* Owner */}
        <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">
          {shop.ownerName}
        </p>

        {/* Divider */}
        <div className="my-2 h-px bg-gray-100" />

        {/* Location */}
        <div className="flex items-start gap-1.5 text-sm text-gray-500">
          <span className="mt-0.5 shrink-0 text-primary opacity-70">📍</span>
          <span className="line-clamp-1">{shop.location}</span>
        </div>

        {/* Footer Buttons */}
        <div className="mt-4 flex gap-2">
          <Link
            to={`tel:${shop.phone}`}
            className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold bg-light text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all duration-200"
          >
            📞 Call
          </Link>

          <button
            onClick={() => onView?.(shop._id)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 hover:shadow-md hover:shadow-primary/30 transition-all duration-200 active:scale-95"
          >
            View Shop →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;