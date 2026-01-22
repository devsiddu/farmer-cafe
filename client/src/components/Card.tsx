import { useNavigate } from "react-router-dom";
import type { Product } from "../types/product";
import { assets } from "../assets/assets";

interface cardProps {
  product: Product;
}
const Card = ({ product }: cardProps) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col bg-white shadow-md w-72 ">
        <img
          onClick={() => navigate(`/product/${product._id}`)}
          className="w-72 h-48 object-cover cursor-pointer"
          src={product.images.at(1)}
          alt="image"
        />
        <div className="p-4 text-sm">
          <p className="text-secondary">₹ {product.price}</p>
          <p className="text-primary line-clamp-1 font-medium my-1.5">
            {product.name}
          </p>
          <div className="flex items-center justify-between">
            <p className="text-ternary inline-flex gap-2">
              <img src={assets.store} alt="store" width={15} />
              {product.shop.shopName}
            </p>
            <p className="text-ternary inline-flex gap-2">
              <img src={assets.location} alt="store" width={15} />
              {product.shop.location}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button className="bg-light text-slate-600 py-2 cursor-pointer">
              Add to cart
            </button>
            <button
              onClick={() => navigate(`/product/${product._id}`)}
              className="bg-primary text-white py-2 cursor-pointer"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
