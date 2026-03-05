import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, dummyProducts } from "../assets/assets";
import type { ProductType } from "../types";
import Title from "../components/Title";

interface Order {
    orderId: string;
    product: ProductType;
    qty: number;
    status: "confirmed" | "cancelled" | "pending";
    bookedAt: string;
}

// Mock orders from dummyProducts
const mockOrders: Order[] = dummyProducts.slice(0, 6).map((product, i) => ({
    orderId: `ORD${100 + i}`,
    product,
    qty: Math.ceil(Math.random() * 4) + 1,
    status: i % 3 === 2 ? "cancelled" : i % 3 === 1 ? "pending" : "confirmed",
    bookedAt: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }),
}));

const statusStyles = {
    confirmed: "bg-green-50 text-green-600",
    pending: "bg-amber-50 text-amber-600",
    cancelled: "bg-red-50 text-red-400",
};

const statusLabels = {
    confirmed: "✓ Confirmed",
    pending: "⏳ Pending",
    cancelled: "✕ Cancelled",
};

const BookingConfirmation = () => {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);
    const navigate = useNavigate();

    const cancelOrder = (orderId: string) => {
        setOrders((prev) =>
            prev.map((o) => (o.orderId === orderId ? { ...o, status: "cancelled" } : o))
        );
        setCancelConfirm(null);
    };

    const cancelTarget = orders.find((o) => o.orderId === cancelConfirm);

    return (
        <div className="max-w-5xl ml-40 px-4">
            {/* Header */}
            <div className="mb-6">
                <Title title="My Bookings" />
                <p className="text-sm text-gray-400">{orders.length} booking{orders.length !== 1 ? "s" : ""} placed</p>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <div className="text-5xl mb-3">📦</div>
                    <p className="font-semibold text-gray-600">No orders yet</p>
                    <p className="text-sm mt-1 mb-6">You haven't booked any products.</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
                    >
                        Browse Products
                    </button>
                </div>
            ) : (
                <div className="flex flex-col gap-3">
                    {orders.map((order) => {
                        const { product, qty, status, bookedAt, orderId } = order;
                        const total = product.price * qty;
                        const isCancellable = status !== "cancelled";

                        return (
                            <div
                                key={orderId}
                                className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4"
                            >
                                {/* Product Image */}
                                <img
                                    src={product.images?.[0]}
                                    alt={product.name}
                                    onClick={() => navigate(`/products/${product._id}`)}
                                    className="w-16 h-16 rounded-xl object-cover border border-gray-100 shrink-0 cursor-pointer"
                                />

                                {/* Product Info */}
                                <div className="flex-1 min-w-0">
                                    <p
                                        className="font-semibold text-gray-800 text-sm truncate cursor-pointer hover:text-primary transition"
                                        onClick={() => navigate(`/products/${product._id}`)}
                                    >
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Qty: {qty} units</p>
                                </div>

                                {/* Shop Info */}
                                <div className="flex flex-col gap-1 text-xs text-gray-500 shrink-0 min-w-32.5">
                                    <div className="flex items-center gap-1.5">
                                        <img src={assets.store} width={11} alt="" />
                                        <span className="font-medium text-secondary truncate">{product.shop?.shopName}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <img src={assets.location} width={11} alt="" />
                                        <span className="truncate">{product.shop?.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <img src={assets.phone} width={10} alt="" />
                                        <span>{product.shop?.phone}</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex flex-col items-end shrink-0 min-w-17.5">
                                    <p className="text-base font-bold text-primary">₹{total}</p>
                                    <p className="text-[10px] text-gray-400">₹{product.price} × {qty}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{bookedAt}</p>
                                </div>

                                {/* Status + Cancel */}
                                <div className="flex flex-col items-end gap-2 shrink-0">
                                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${statusStyles[status]}`}>
                                        {statusLabels[status]}
                                    </span>
                                    {isCancellable && (
                                        <button
                                            onClick={() => setCancelConfirm(orderId)}
                                            className="text-[11px] font-semibold text-gray-400 hover:text-red-500 border border-gray-200 hover:border-red-200 px-2.5 py-1 rounded-lg transition"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Cancel Confirm Modal */}
            {cancelConfirm && cancelTarget && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 w-[320px] flex flex-col items-center text-center">
                        <img
                            src={cancelTarget.product.images?.[0]}
                            alt={cancelTarget.product.name}
                            className="w-16 h-16 rounded-2xl object-cover border border-gray-100 mb-3"
                        />
                        <h2 className="text-base font-bold text-gray-800">Cancel Booking?</h2>
                        <p className="text-sm text-gray-600 font-medium mt-1">{cancelTarget.product.name}</p>
                        <p className="text-xs text-gray-400 mt-1 mb-6">
                            Are you sure you want to cancel this booking? This cannot be undone.
                        </p>
                        <div className="flex gap-3 w-full">
                            <button
                                onClick={() => setCancelConfirm(null)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                            >
                                Keep It
                            </button>
                            <button
                                onClick={() => cancelOrder(cancelConfirm)}
                                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition active:scale-95"
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingConfirmation;