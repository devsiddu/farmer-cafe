import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
const Cart = () => {
    const { cartItems, removeFromCart, updateQty, clearCart, totalItems, totalPrice } = useCart();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);


    if (cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-xl font-bold text-gray-700">Your cart is empty</h2>
                <p className="text-sm text-gray-400 mt-2 mb-6">
                    Add some fertilizer products to get started.
                </p>
                <button
                    onClick={() => navigate("/products")}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition active:scale-95"
                >
                    Browse Products
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Your Cart</h1>
                    <p className="text-sm text-gray-400 mt-0.5">{totalItems} item{totalItems > 1 ? "s" : ""} selected</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="text-xs text-red-400 hover:text-red-600 font-medium border border-red-100 hover:border-red-300 px-3 py-1.5 rounded-lg transition"
                >
                    Clear All
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Cart Items */}
                <div className="flex-1 flex flex-col gap-3">
                    {cartItems.map(({ product, qty }) => {
                        const maxQty = product.quantity;
                        return (
                            <div
                                key={product._id}
                                className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 shadow-sm"
                            >
                                {/* Image */}
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-20 h-20 rounded-xl object-cover border border-gray-100 shrink-0 cursor-pointer"
                                    onClick={() => navigate(`/products/${product._id}`)}
                                />

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className="font-semibold text-gray-800 text-sm leading-snug truncate cursor-pointer hover:text-primary transition"
                                        onClick={() => navigate(`/products/${product._id}`)}
                                    >
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                                    <p className="text-primary font-bold mt-1 text-sm">₹{product.price} / unit</p>

                                    {/* Qty Controls */}
                                    <div className="flex items-center gap-3 mt-3">
                                        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1">
                                            <button
                                                disabled={qty <= 1}
                                                onClick={() => updateQty(product._id, qty - 1)}
                                                className={`w-7 h-7 rounded-lg text-lg font-medium flex items-center justify-center transition ${qty <= 1
                                                    ? "text-gray-300 cursor-not-allowed"
                                                    : "text-secondary hover:bg-secondary hover:text-white cursor-pointer"
                                                    }`}
                                            >
                                                −
                                            </button>
                                            <span className="text-sm font-bold text-gray-800 w-6 text-center">{qty}</span>
                                            <button
                                                disabled={qty >= maxQty}
                                                onClick={() => updateQty(product._id, qty + 1)}
                                                className={`w-7 h-7 rounded-lg text-lg font-medium flex items-center justify-center transition ${qty >= maxQty
                                                    ? "text-gray-300 cursor-not-allowed"
                                                    : "text-secondary hover:bg-secondary hover:text-white cursor-pointer"
                                                    }`}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <span className="text-xs text-gray-400">of {maxQty} available</span>
                                    </div>
                                </div>

                                {/* Right: subtotal + remove */}
                                <div className="flex flex-col items-end justify-between shrink-0">
                                    <button
                                        onClick={() => removeFromCart(product._id)}
                                        className="text-gray-300 hover:text-red-400 transition text-lg leading-none"
                                        title="Remove"
                                    >
                                        ✕
                                    </button>
                                    <p className="text-sm font-bold text-gray-800">₹{product.price * qty}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Order Summary */}
                <div className="lg:w-72 shrink-0">
                    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 sticky top-6">
                        <h2 className="text-base font-bold text-gray-800 mb-4">Order Summary</h2>

                        <div className="flex flex-col gap-2 text-sm">
                            {cartItems.map(({ product, qty }) => (
                                <div key={product._id} className="flex justify-between text-gray-500">
                                    <span className="truncate max-w-40">{product.name} × {qty}</span>
                                    <span className="font-medium text-gray-700 shrink-0 ml-2">₹{product.price * qty}</span>
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-gray-100 my-4" />

                        <div className="flex justify-between text-sm font-semibold text-gray-500">
                            <span>Total Items</span>
                            <span className="text-gray-800">{totalItems}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-sm font-semibold text-gray-500">Total Amount</span>
                            <span className="text-lg font-bold text-primary">₹{totalPrice}</span>
                        </div>

                        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5 text-xs text-amber-700 leading-relaxed">
                            💡 No payment required. Visit the shop and show this booking to collect your items.
                        </div>

                        <button
                            onClick={() =>
                                navigate("/bookings", {
                                    state: { cartItems, totalPrice },
                                })
                            }
                            className="w-full mt-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200"
                        >
                            Confirm Booking
                        </button>

                        <button
                            onClick={() => navigate("/products")}
                            className="w-full mt-2 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (

                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 w-85 flex flex-col items-center text-center">
                        <h2 className="text-base font-bold text-gray-800">Are you sure ?</h2>
                        <p className="text-xs text-gray-400 mt-1 mb-6">
                            This will permanently remove the cart item. This action cannot be undone.
                        </p>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => { setShowModal(false), clearCart() }}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition active:scale-95"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

            )}
        </div>
    );
};

export default Cart;