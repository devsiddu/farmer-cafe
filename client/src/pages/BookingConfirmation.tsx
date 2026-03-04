import { useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import type { Product } from "../types/product";

interface LocationState {
    product: Product;
    qty: number;
}

const BookingConfirmation = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const locationState = state as LocationState | null;
    const product = locationState?.product;
    const qty = locationState?.qty;

    // Guard — if someone visits directly without state
    if (!product || !qty) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
                <p className="text-4xl mb-4">📦</p>
                <h2 className="text-lg font-semibold text-gray-700">No booking data found</h2>
                <p className="text-sm text-gray-400 mt-1 mb-6">
                    It looks like you reached this page directly.
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    const totalPrice = product.price * qty;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                {/* Success header */}
                <div className="bg-primary px-8 py-8 text-center">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white text-2xl">✓</span>
                    </div>
                    <h1 className="text-xl font-bold text-white">Booking Confirmed!</h1>
                    <p className="text-white/70 text-sm mt-1">
                        Your order has been placed successfully
                    </p>
                </div>

                {/* Product summary */}
                <div className="p-6">
                    <div className="flex gap-4 items-start">
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-20 h-20 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                        <div>
                            <h2 className="font-semibold text-gray-800 text-base leading-snug">
                                {product.name}
                            </h2>
                            <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                            <p className="text-primary font-bold mt-1">₹{product.price} / unit</p>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 my-5" />

                    {/* Booking details */}
                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Quantity</span>
                            <span className="font-semibold text-gray-700">{qty} units</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Total Amount</span>
                            <span className="font-bold text-primary text-base">₹{totalPrice}</span>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100 my-5" />

                    {/* Shop info */}
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
                        Pickup From
                    </p>
                    <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 text-secondary">
                            <img src={assets.store} width={14} alt="" />
                            <span className="font-medium">{product.shop.shopName}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <img src={assets.location} width={14} alt="" />
                            <span>{product.shop.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                            <img src={assets.phone} width={12} alt="" />
                            <a
                                href={`tel:${product.shop.phone}`}
                                className="hover:text-primary transition"
                            >
                                {product.shop.phone}
                            </a>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-700 leading-relaxed">
                        💡 No payment required. Visit the shop and show this booking to collect your items.
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 mt-6">
                        <button
                            onClick={() => navigate("/products")}
                            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                        >
                            Browse More
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-primary text-white hover:bg-primary/90 active:scale-95 transition-all duration-200"
                        >
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;