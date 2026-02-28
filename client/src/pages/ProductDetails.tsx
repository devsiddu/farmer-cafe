import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { assets, dummyProducts } from "../assets/assets";
import type { Product } from "../types/product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [qty, setQty] = useState<number>(1);
  const [selectQty, setSelectQty] = useState(false);
  const product = dummyProducts.find((item: Product) => item._id === Number(id));
  const [thumbnail, setThumbnail] = React.useState(product?.images[0]);
  const maxQty = product?.quantity ?? 0;
  const outOfStock = product?.quantity === 0;

  return (
    product && (
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <p className="text-xs text-gray-400 mb-6">
          Home <span className="mx-1">/</span>
          Products <span className="mx-1">/</span>
          {product.category} <span className="mx-1">/</span>
          <span className="text-secondary">{product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Images */}
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="flex flex-col gap-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className={`w-16 h-16 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${thumbnail === image
                      ? "border-primary"
                      : "border-transparent hover:border-gray-200"
                    }`}
                >
                  <img src={image} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm w-80 h-96 bg-gray-50">
              <img
                src={thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-2">
              {Array(5).fill("").map((_, i) =>
                product.rating > i ? (
                  <img src={assets.starFilled} key={i} alt="star" className="w-4 h-4" />
                ) : (
                  <img src={assets.star} key={i} alt="star" className="w-4 h-4" />
                )
              )}
              <span className="text-xs text-gray-400 ml-1">({product.rating})</span>
            </div>

            {/* Price */}
            <div className="mt-4">
              <p className="text-2xl font-bold text-primary">₹{product.price}</p>
              <p className="text-xs text-gray-400 mt-0.5">Inclusive of all taxes</p>
            </div>

            <div className="h-px bg-gray-100 my-4" />

            {/* Stock */}
            <p className="text-sm text-gray-600">
              Availability:{" "}
              {outOfStock ? (
                <span className="text-amber-500 font-medium">Out of stock</span>
              ) : (
                <span className="text-green-600 font-medium">{product.quantity} units left</span>
              )}
            </p>

            {/* Description */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">About this product</p>
              <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
            </div>

            <div className="h-px bg-gray-100 my-4" />

            {/* Shop info */}
            <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-secondary">
                <img src={assets.store} width={14} alt="" />
                <span>{product.shop.shopName}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <img src={assets.location} width={14} alt="" />
                <span>{product.shop.location}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <img src={assets.phone} width={12} alt="" />
                <span>{product.shop.phone}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                disabled={outOfStock}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 ${outOfStock
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-light text-secondary border-secondary/20 hover:bg-secondary hover:text-white"
                  }`}
              >
                Add to Cart
              </button>
              <button
                disabled={outOfStock}
                onClick={() => !outOfStock && setSelectQty(true)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${outOfStock
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90"
                  }`}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>

        {/* Quantity Modal */}
        {selectQty && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-[340px] flex flex-col items-center">
              <h2 className="text-lg font-bold text-gray-800">Select Quantity</h2>
              <p className="text-xs text-gray-400 mt-1">Available: {maxQty} units</p>

              <div className="flex items-center gap-6 mt-6">
                <button
                  disabled={qty <= 1}
                  onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                  className={`w-9 h-9 rounded-full text-xl font-medium flex items-center justify-center transition ${qty <= 1
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "bg-light text-secondary hover:bg-secondary hover:text-white cursor-pointer"
                    }`}
                >
                  −
                </button>

                <span className="text-2xl font-bold text-gray-800 w-8 text-center">{qty}</span>

                <button
                  disabled={qty >= maxQty}
                  onClick={() => setQty((prev) => Math.min(maxQty, prev + 1))}
                  className={`w-9 h-9 rounded-full text-xl font-medium flex items-center justify-center transition ${qty >= maxQty
                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                      : "bg-light text-secondary hover:bg-secondary hover:text-white cursor-pointer"
                    }`}
                >
                  +
                </button>
              </div>

              <div className="flex gap-3 mt-8 w-full">
                <button
                  onClick={() => setSelectQty(false)}
                  className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setSelectQty(false)}
                  disabled={qty < 1 || qty > maxQty}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition active:scale-95 ${qty < 1 || qty > maxQty
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primary/90"
                    }`}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default ProductDetails;