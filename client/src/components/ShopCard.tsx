import { assets } from "../assets/assets";
import type { Shop } from "../types/shop";

interface ShopCardProps {
  shop: Shop;
  onView?: (shopId: string) => void; // optional callback
}

const ShopCard = ({ shop, onView }: ShopCardProps) => {
  return (
    <div className="w-72 bg-white  shadow-md flex flex-col transition hover:shadow-lg">
      {/* Image */}
      <img src={shop.image ? shop.image : assets.shop} alt="" className=" w-90 object-cover" />
      <div className=" p-4 ">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-primary line-clamp-1">
            {shop.shopName}
          </h3>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              shop.isOpen
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {shop.isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* Body */}
        <p className="text-sm text-gray-500 mt-1">Owner: {shop.ownerName}</p>

        <p className="text-sm text-gray-600 mt-1">📍 {shop.location}</p>

        <p className="text-sm mt-2">
          ⭐ Rating: <span className="font-medium">{shop.rating}</span>
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4 flex gap-2">
          <a
            href={`tel:${shop.phone}`}
            className="flex-1 text-center py-2 bg-light text-secondary  hover:bg-light/80 transition"
          >
            Call
          </a>

          <button
            onClick={() => onView?.(shop.shopId)}
            className="flex-1 py-2 bg-primary text-white  hover:bg-primary/90 transition"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
