import { Link, useParams } from "react-router-dom";
import { assets, dummyProducts } from "../assets/assets";
import Card from "../components/Card";
import type { ProductType, ShopType } from "../types";
import { useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const ShopDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { axios, setLoading } = useApp();
  const [shop, setShop] = useState<ShopType | null>(null)

  const fetchShopById = async (id: string) => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/shop/${id}`);
      if (data.success) {
        setShop(data.shop)
      } else {
        toast.error(data.message);
      }
      setLoading(false);
    } catch (error: any) {
      console.error("Failed to fetch shops : " + error.message);
    }
  }

  useEffect(() => {
    fetchShopById(id as string);
  }, [id])

  const products = dummyProducts.filter((p: ProductType) => p.shopId === id);

  if (!shop) {
    return (
      <div className="text-center mt-20 text-red-500">Shop not found</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header Card */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <img
          src={shop.image ? shop.image : assets.shop}
          alt={shop.shopName}
          className="w-20 h-20 rounded-xl object-cover bg-gray-100"
        />

        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-primary">{shop.shopName}</h1>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full border ${shop.isOpen
                ? "bg-green-50 text-green-600 border-green-200"
                : "bg-red-50 text-red-500 border-red-200"
                }`}
            >
              {shop.isOpen ? "Open" : "Closed"}
            </span>
          </div>

          <p className="text-sm text-gray-400 mt-1">{shop.ownerName}</p>

          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            <span>📍 {shop.location}</span>
            <span>★ {shop.rating}</span>
            <Link to={`tel:${shop.phone}`} className="text-primary hover:underline">
              📞 {shop.phone}
            </Link>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 shrink-0">
          <Link
            to={`tel:${shop.phone}`}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-light text-secondary border border-secondary/20 hover:bg-secondary hover:text-white transition-all duration-200"
          >
            Call
          </Link>
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all duration-200 active:scale-95">
            View All
          </button>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-lg font-semibold text-gray-700">Products</h2>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {products.length}
          </span>
        </div>

        {products.length > 0 ? (
          <div className="flex flex-wrap justify-center md:justify-start gap-5">
            {products.map((product) => (
              <Card product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-16 text-sm">
            No products listed for this shop yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;