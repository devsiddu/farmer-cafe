import { useParams } from "react-router-dom";
import { assets, dummyProducts, dummyShops } from "../assets/assets";
import type { Shop } from "../types/shop";
import type { Product } from "../types/product";
import Card from "../components/Card";

const ShopDetails = () => {
  const { id } = useParams<{ id: string }>();

  const shop = dummyShops.find((s: Shop) => s.shopId === id);
  const products = dummyProducts.filter((p: Product) => p.shop.shopId === id);

  if (!shop) {
    return <div className="text-center mt-20 text-red-500">Shop not found</div>;
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
          {/* Avatar */}
          <img
            src={shop.image ? shop.image : assets.shop}
            alt={shop.shopName}
            className="w-24 h-24 rounded-full bg-gray-100"
          />

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-primary">
              {shop.shopName}
            </h1>

            <p className="text-gray-500 mt-1">Owner: {shop.ownerName}</p>

            <div className="flex flex-wrap gap-3 mt-2">
              <span className="text-sm bg-gray-100 px-3 py-1 rounded">
                📍 {shop.location}
              </span>
              <span
                className={`text-sm px-3 py-1 rounded ${
                  shop.isOpen
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {shop.isOpen ? "Open Now" : "Closed"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8" />

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left */}
          <div>
            <h2 className="text-lg font-medium mb-4">Shop Information</h2>

            <p className="text-gray-600 mb-2">
              ⭐ Rating: <strong>{shop.rating}</strong>
            </p>

            <p className="text-gray-600 mb-2">
              📞 Phone:{" "}
              <a href={`tel:${shop.phone}`} className="text-primary">
                {shop.phone}
              </a>
            </p>
          </div>

          {/* Right */}
          <div>
            <h2 className="text-lg font-medium mb-4">Actions</h2>

            <div className="flex gap-4">
              <a
                href={`tel:${shop.phone}`}
                className="flex-1 text-center py-3 bg-light text-secondary hover:bg-light/80 transition"
              >
                Call Shop
              </a>

              <button className="flex-1 py-3 bg-primary text-white hover:bg-primary/90 transition">
                View Products
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-center gap-3 ">
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </>
  );
};

export default ShopDetails;
