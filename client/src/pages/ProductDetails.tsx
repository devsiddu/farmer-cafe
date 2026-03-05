import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useApp } from "../context/AppContext";
import type { ProductType } from "../types";
import { assets } from "../assets/assets";
import Card from "../components/Card";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { fetchProductById, products } = useApp();

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };
  const [product, setProduct] = useState<ProductType | null>(null)
  const [qty, setQty] = useState<number>(1);
  const [selectQty, setSelectQty] = useState(false);
  const [cartQtyModal, setCartQtyModal] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [thumbnail, setThumbnail] = React.useState<string | undefined>();

  const maxQty = product?.quantity ?? 0;
  const outOfStock = product?.quantity === 0;

  // How many already in cart for this product
  const inCartQty = cartItems.find((i) => i.product._id === product?._id)?.qty ?? 0;

  const handleConfirmBookNow = () => {
    setSelectQty(false);
    navigate("/booking-confirmation", {
      state: { product, qty },
    });
  };

  const handleConfirmAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    setCartQtyModal(false);
    setQty(1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  useEffect(() => {
    if (!id) return;

    const data = fetchProductById(id);
    if (data) {
      setProduct(data);
      setThumbnail(data.images[0])
    }
  }, [id])


  const QtyModal = ({
    onConfirm,
    onCancel,
    confirmLabel,
    confirmStyle,
  }: {
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel: string;
    confirmStyle?: string;
  }) => (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 w-85 flex flex-col items-center">
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
            disabled={qty >= maxQty - inCartQty}
            onClick={() => setQty((prev) => Math.min(maxQty - inCartQty, prev + 1))}
            className={`w-9 h-9 rounded-full text-xl font-medium flex items-center justify-center transition ${qty >= maxQty - inCartQty
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-light text-secondary hover:bg-secondary hover:text-white cursor-pointer"
              }`}
          >
            +
          </button>
        </div>

        {inCartQty > 0 && (
          <p className="text-xs text-amber-500 mt-3">{inCartQty} already in cart</p>
        )}

        <div className="flex gap-3 mt-8 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={qty < 1 || qty > maxQty}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition active:scale-95 ${qty < 1 || qty > maxQty
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : confirmStyle ?? "bg-primary text-white hover:bg-primary/90 cursor-pointer"
              }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return (<>

    {product && (
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
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm w-80 h-96 bg-gray-50">
              <img src={thumbnail} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>

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

            <div className="mt-4">
              <p className="text-2xl font-bold text-primary">₹{product.price}</p>
              <p className="text-xs text-gray-400 mt-0.5">Inclusive of all taxes</p>
            </div>

            <div className="h-px bg-gray-100 my-4" />

            <p className="text-sm text-gray-600">
              Availability:{" "}
              {outOfStock ? (
                <span className="text-amber-500 font-medium">Out of stock</span>
              ) : (
                <span className="text-green-600 font-medium">{product.quantity} units left</span>
              )}
            </p>

            {inCartQty > 0 && (
              <p className="text-xs text-primary font-medium mt-1">
                🛒 {inCartQty} unit{inCartQty > 1 ? "s" : ""} already in your cart
              </p>
            )}

            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-1">About this product</p>
              <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
            </div>

            <div className="h-px bg-gray-100 my-4" />

            <div className="bg-gray-50 rounded-xl p-4 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-secondary">
                <img src={assets.store} width={14} alt="" />
                <span>{product.shop?.shopName}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <img src={assets.location} width={14} alt="" />
                <span>{product.shop?.location}</span>
              </div>
              <div className="flex items-center gap-2 text-secondary">
                <img src={assets.phone} width={12} alt="" />
                <span>{product.shop?.phone}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              {/* Add to Cart */}
              <button
                disabled={outOfStock || inCartQty >= maxQty}
                onClick={() => {
                  setQty(1);
                  setCartQtyModal(true);
                }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${outOfStock || inCartQty >= maxQty
                  ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                  : addedToCart
                    ? "border-green-400 text-green-600 bg-green-50 cursor-pointer"
                    : "border-primary text-primary hover:bg-primary/5 cursor-pointer"
                  }`}
              >
                {addedToCart ? "✓ Added!" : "🛒 Add to Cart"}
              </button>

              {/* Book Now */}
              <button
                disabled={outOfStock}
                onClick={() => {
                  setQty(1);
                  setSelectQty(true);
                }}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95 ${outOfStock
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 cursor-pointer"
                  }`}
              >
                Book Now
              </button>
            </div>

            {/* View Cart shortcut */}
            {inCartQty > 0 && (
              <button
                onClick={() => navigate("/cart")}
                className="w-full mt-2 py-2 rounded-xl text-xs font-semibold text-primary border border-primary/20 hover:bg-primary/5 transition"
              >
                View Cart ({inCartQty} item{inCartQty > 1 ? "s" : ""}) →
              </button>
            )}
          </div>
        </div>

        {/* Book Now Modal */}
        {selectQty && (
          <QtyModal
            onConfirm={handleConfirmBookNow}
            onCancel={() => setSelectQty(false)}
            confirmLabel="Confirm"
          />
        )}

        {/* Add to Cart Modal */}
        {cartQtyModal && (
          <QtyModal
            onConfirm={handleConfirmAddToCart}
            onCancel={() => setCartQtyModal(false)}
            confirmLabel="Add to Cart"
            confirmStyle="bg-secondary text-white hover:bg-secondary/90 cursor-pointer"
          />
        )}
      </div>
    )}

    <div className="relative max-w-6xl mx-auto">
      {/* <div
        className="absolute top-1/2 -translate-y-1/2 z-10 w-14 h-full rounded-l-xl bg-linear-to-r from-white to-transparent flex items-center justify-center "
      /> */}
      <button
        onClick={scrollLeft}
        className="absolute -left-20 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-primary border border-white/20 text-white flex items-center justify-center hover:bg-primary/90 transition"
      >
        <img src={assets.arrowRight} alt="" className="rotate-180" />
      </button>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto " style={{ scrollbarWidth: "none" }}>
        {[...(products || [])]?.sort(() => Math.random() - 0.5).slice(0, 8).map(item => (
          <Card product={item} key={item._id} />
        ))}
      </div>
      {/* <div
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-full rounded-l-xl bg-linear-to-l from-white to-transparent flex items-center justify-center "
      /> */}
      <button
        onClick={scrollRight}
        className="absolute -right-20 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-primary border border-white/20 text flex items-center justify-center hover:bg-primary/90 transition backdrop-blur-sm"
      >
        <img src={assets.arrowRight} alt="" />
      </button>
    </div>
  </>
  );
};

export default ProductDetails;