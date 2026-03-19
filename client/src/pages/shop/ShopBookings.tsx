import { useEffect, useState } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import type { BookingType } from "../../types";
import { useApp } from "../../context/AppContext";
import toast from "react-hot-toast";

type BookingStatus = "confirmed" | "pending" | "cancelled";
type StatusFilter = "all" | BookingStatus;

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-green-50 text-green-600",
  pending: "bg-amber-50 text-amber-600",
  cancelled: "bg-red-50 text-red-400",
};

const ShopBookings = () => {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [cancelConfirm, setCancelConfirm] = useState<string | null>(null);

  const { axios } = useApp();

  const getBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/shop");
      if (data.success) {
        setBookings(data.bookings)
      } else {
        toast.error(data.message)
      }


    } catch (error: any) {
      console.error(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getBookings()
  }, [])

  // --- Actions ---
  const updateStatus = (_id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => ({
        ...b,
        items: b.items.map((item) =>
          item.product._id === _id
            ? { ...item, status }
            : item
        ),
      }))
    );

    setCancelConfirm(null);
  };
  const filtered = bookings.filter((b) => {
    const matchSearch = b.items.some((item: any) => {
      const product = item.product;

      return (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        b._id.toString().toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      );
    });
    const matchStatus =
      statusFilter === "all" ||
      b.items.some((item: any) => item.status === statusFilter);

    return matchSearch && matchStatus;
  });


  // --- Summary ---
  const confirmedCount = bookings.reduce(
    (count, b) =>
      count + b.items.filter((item: any) => item.status === "confirmed").length,
    0
  );

  const pendingCount = bookings.reduce(
    (count, b) =>
      count + b.items.filter((item: any) => item.status === "pending").length,
    0
  );

  const cancelledCount = bookings.reduce(
    (count, b) =>
      count + b.items.filter((item: any) => item.status === "cancelled").length,
    0
  );

  const totalRevenue = bookings.reduce((sum, b) => {
    return (
      sum +
      b.items
        .filter((item: any) => item.status === "confirmed")
        .reduce((itemSum: number, item: any) => itemSum + item.price * item.qty, 0)
    );
  }, 0);

  const cancelTarget = bookings
    .flatMap((b) => b.items)
    .find((item) => item.product._id === cancelConfirm);

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bookings</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage all customer bookings for your shop.
        </p>
      </div>

      {/* Summary Pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: "Total", value: bookings.length, color: "bg-primary" },
          { label: "Confirmed", value: confirmedCount, color: "bg-green-400" },
          { label: "Pending", value: pendingCount, color: "bg-amber-400" },
          { label: "Cancelled", value: cancelledCount, color: "bg-red-400" },
          { label: "Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, color: "bg-emerald-400" },
        ].map((pill) => (
          <div key={pill.label} className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${pill.color}`} />
            <span className="text-sm text-gray-500">{pill.label}</span>
            <span className="text-sm font-bold text-gray-800">{pill.value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product, shop or booking ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3">
        Showing {filtered.length} of {bookings.length} bookings
      </p>

      {/* ── TABLE — Desktop ── */}
      <div className="hidden md:block bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-semibold">Order ID</th>
              <th className="text-left px-5 py-3 font-semibold">Product</th>
              <th className="text-left px-5 py-3 font-semibold">Qty</th>
              <th className="text-left px-5 py-3 font-semibold">Total</th>
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Status</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-sm">No bookings found</p>
                </td>
              </tr>
            ) : (
              filtered.flatMap((booking) =>
                booking.items.map((item: any) => {

                  const date = new Date(item.bookedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  });

                  const status = item.status as BookingStatus;
                  const product = item.product;

                  return (
                    <tr key={`${booking._id}-${product._id}`} className="hover:bg-gray-50/60 transition">

                      {/* Order ID */}
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-mono font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                          #{product._id.slice(0, 10)}
                        </span>
                      </td>

                      {/* Product */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images?.[0]}
                            alt={product.name}
                            className="w-9 h-9 rounded-xl object-cover border border-gray-100 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-gray-800 text-sm truncate max-w-37.5">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-400">{product.category}</p>
                          </div>
                        </div>
                      </td>

                      {/* Qty */}
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-semibold text-gray-700 bg-gray-100 px-2 py-1 rounded-lg">
                          ×{item.qty}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="px-5 py-3.5 font-bold text-primary text-sm">
                        ₹{item.totalAmount.toLocaleString("en-IN")}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-3.5 text-gray-400 text-xs">{date}</td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${statusStyles[status]}`}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-1">
                          {status === "pending" && (
                            <button
                              onClick={() => updateStatus(product._id, "confirmed")}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-green-50 text-green-600 hover:bg-green-100 transition"
                            >
                              Confirm
                            </button>
                          )}
                          {status !== "cancelled" && (
                            <button
                              onClick={() => setCancelConfirm(product._id)}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-500 hover:bg-red-100 transition"
                            >
                              Cancel
                            </button>
                          )}
                          {status === "cancelled" && (
                            <span className="text-xs text-gray-300 px-2">—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )
            )}
          </tbody>
        </table>
      </div>

      {/* ── CARDS — Mobile ── */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">📋</div>
            <p className="text-sm">No bookings found</p>
          </div>
        ) : (
          filtered.flatMap((booking) =>
            booking.items.map((item) => {
              const date = new Date(item.bookedAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              });
              const status = item.status as BookingStatus;
              const product = item.product;

              return (
                <div key={booking._id} className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                  {/* Card Header */}
                  <div
                    className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    onClick={() => setExpandedId(expandedId === booking._id ? null : booking._id)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-11 h-11 rounded-xl object-cover border border-gray-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${statusStyles[status]}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${expandedId === booking._id ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Expanded */}
                  {expandedId === booking._id && (
                    <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                      <div className="flex flex-col gap-1.5 text-xs text-gray-500 mb-4">
                        <p>🔖 Order ID: <span className="font-mono font-semibold text-gray-700">#{booking._id.slice(0, 10)}</span></p>
                        <p>📦 Category: {product.category}</p>
                        <p>💰 Unit Price: ₹{product.price}</p>
                        <p>🔢 Qty: <span className="font-semibold text-gray-700">{product.quantity} units</span></p>
                        <p>💵 Total: <span className="font-bold text-primary">₹{item.totalAmount.toLocaleString("en-IN")}</span></p>
                        <p>📅 Booked: {date}</p>
                      </div>

                      <div className="flex gap-2">
                        {status === "pending" && (
                          <button
                            onClick={() => updateStatus(product._id, "confirmed")}
                            className="flex-1 py-2 rounded-xl text-xs font-semibold border border-green-200 text-green-600 hover:bg-green-50 transition"
                          >
                            ✓ Confirm
                          </button>
                        )}
                        {status !== "cancelled" && (
                          <button
                            onClick={() => setCancelConfirm(product._id)}
                            className="flex-1 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition"
                          >
                            <X className="w-3 h-3 inline mr-1" />Cancel
                          </button>
                        )}
                        {status === "cancelled" && (
                          <p className="text-xs text-gray-400 text-center w-full py-2">No actions available</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })


          )
        )}
      </div>

      {/* Cancel Confirm Modal */}
      {cancelConfirm && cancelTarget && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 w-[320px] flex flex-col items-center text-center">
            <img
              src={cancelTarget.product.images[0]}
              alt={cancelTarget.product.name}
              className="w-16 h-16 rounded-2xl object-cover border border-gray-100 mb-3"
            />
            <h2 className="text-base font-bold text-gray-800">Cancel Booking?</h2>
            <p className="text-sm text-gray-600 font-medium mt-1">{cancelTarget.product.name}</p>
            <p className="text-xs text-gray-400 mb-6">
              Order <span className="font-mono font-semibold">#{cancelTarget._id.slice(0, 10)}</span> will be permanently cancelled.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setCancelConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
              >
                Keep It
              </button>
              <button
                onClick={() => updateStatus(cancelConfirm, "cancelled")}
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

export default ShopBookings;