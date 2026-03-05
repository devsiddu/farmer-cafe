import { Package, ShoppingBag, TrendingUp, ArrowUpRight, PackageX, Star } from "lucide-react";
import { dummyProducts } from "../../assets/assets";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

interface Booking {
  bookingId: string;
  productName: string;
  productImage: string;
  customerName: string;
  qty: number;
  total: number;
  status: "confirmed" | "pending" | "cancelled";
  date: string;
}

const mockBookings: Booking[] = [
  {
    bookingId: "BK001",
    productName: "IFFCO DAP Fertilizer",
    productImage: dummyProducts[0]?.images?.[0] ?? "",
    customerName: "Ramesh Kumar",
    qty: 3,
    total: 4050,
    status: "confirmed",
    date: "2 Jan 2025",
  },
  {
    bookingId: "BK002",
    productName: "Neem Coated Urea",
    productImage: dummyProducts[1]?.images?.[0] ?? "",
    customerName: "Suresh Patil",
    qty: 2,
    total: 590,
    status: "pending",
    date: "4 Jan 2025",
  },
  {
    bookingId: "BK003",
    productName: "NPK 10:26:26",
    productImage: dummyProducts[2]?.images?.[0] ?? "",
    customerName: "Anita Desai",
    qty: 5,
    total: 7350,
    status: "confirmed",
    date: "5 Jan 2025",
  },
  {
    bookingId: "BK004",
    productName: "Zinc Sulphate",
    productImage: dummyProducts[3]?.images?.[0] ?? "",
    customerName: "Vikram Rao",
    qty: 1,
    total: 85,
    status: "cancelled",
    date: "6 Jan 2025",
  },
  {
    bookingId: "BK005",
    productName: "Single Super Phosphate",
    productImage: dummyProducts[4]?.images?.[0] ?? "",
    customerName: "Deepa Nair",
    qty: 4,
    total: 1600,
    status: "confirmed",
    date: "7 Jan 2025",
  },
];

const statusStyles = {
  confirmed: "bg-green-50 text-green-600",
  pending:   "bg-amber-50 text-amber-600",
  cancelled: "bg-red-50 text-red-400",
};

const statusLabels = {
  confirmed: "Confirmed",
  pending:   "Pending",
  cancelled: "Cancelled",
};

const ShopOwnerDashboard = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  const myProducts    = dummyProducts;
  const recentProducts = [...myProducts].slice(-5).reverse();

  const totalProducts  = myProducts.length;
  const outOfStock     = myProducts.filter((p) => p.quantity === 0).length;
  const inStock        = myProducts.filter((p) => p.quantity > 0).length;
  const totalStock     = myProducts.reduce((sum, p) => sum + (p.quantity ?? 0), 0);
  const totalBookings  = mockBookings.length;
  const confirmedCount = mockBookings.filter((b) => b.status === "confirmed").length;
  const pendingCount   = mockBookings.filter((b) => b.status === "pending").length;
  const totalRevenue   = mockBookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + b.total, 0);
  const avgRating =
    myProducts.length > 0
      ? (myProducts.reduce((sum, p) => sum + (p.rating ?? 0), 0) / myProducts.length).toFixed(1)
      : "0.0";

  return (
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.firstName ?? "Shop Owner"} 👋
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Here's an overview of your shop's activity today.
        </p>
      </div>

      {/* ── Row 1: 4 Main Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div
          onClick={() => navigate("/shop-dashboard/products")}
          className="bg-white border border-primary/20 rounded-2xl p-5 flex flex-col gap-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <Package className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
            <p className="text-xs text-gray-400 mt-0.5">Total Products</p>
          </div>
        </div>

        <div
          onClick={() => navigate("/shop-dashboard/bookings")}
          className="bg-white border border-violet-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div className="bg-violet-50 text-violet-500 p-2 rounded-xl">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{totalBookings}</p>
            <p className="text-xs text-gray-400 mt-0.5">Total Bookings</p>
          </div>
        </div>

        <div className="bg-white border border-red-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
          <div className="bg-red-50 text-red-400 p-2 rounded-xl w-fit">
            <PackageX className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{outOfStock}</p>
            <p className="text-xs text-gray-400 mt-0.5">Out of Stock</p>
          </div>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 flex flex-col gap-3 shadow-sm">
          <div className="bg-emerald-50 text-emerald-500 p-2 rounded-xl w-fit">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">Total Revenue</p>
          </div>
        </div>
      </div>

      {/* ── Row 2: 4 Sub Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-green-100 rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 shrink-0" />
          <div>
            <p className="text-lg font-bold text-gray-800">{inStock}</p>
            <p className="text-xs text-gray-400">In Stock</p>
          </div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
          <div>
            <p className="text-lg font-bold text-gray-800">{totalStock}</p>
            <p className="text-xs text-gray-400">Total Units</p>
          </div>
        </div>
        <div className="bg-white border border-amber-100 rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
          <div>
            <p className="text-lg font-bold text-gray-800">{pendingCount}</p>
            <p className="text-xs text-gray-400">Pending Bookings</p>
          </div>
        </div>
        <div className="bg-white border border-amber-100 rounded-2xl px-4 py-3.5 shadow-sm flex items-center gap-3">
          <Star className="w-4 h-4 fill-amber-400 stroke-amber-400 shrink-0" />
          <div>
            <p className="text-lg font-bold text-gray-800">{avgRating}</p>
            <p className="text-xs text-gray-400">Avg Rating</p>
          </div>
        </div>
      </div>

      {/* ── Row 3: Recent Products + Recent Bookings ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Products */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 text-sm">Recent Products</h2>
            <button
              onClick={() => navigate("/shop-dashboard/products")}
              className="text-xs text-primary hover:underline"
            >
              Manage →
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {recentProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary">₹{product.price}</p>
                  <p className={`text-xs font-medium ${product.quantity === 0 ? "text-red-400" : "text-green-500"}`}>
                    {product.quantity === 0 ? "Out of stock" : `${product.quantity} left`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 text-sm">Recent Bookings</h2>
            <button
              onClick={() => navigate("/shop-dashboard/bookings")}
              className="text-xs text-primary hover:underline"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {mockBookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition"
              >
                <img
                  src={booking.productImage}
                  alt={booking.productName}
                  className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">{booking.productName}</p>
                  <p className="text-xs text-gray-400">{booking.customerName} · {booking.date}</p>
                </div>
                <div className="flex flex-col items-end shrink-0 gap-1">
                  <p className="text-sm font-bold text-primary">₹{booking.total}</p>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${statusStyles[booking.status]}`}>
                    {statusLabels[booking.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-500">
            <span>{confirmedCount} confirmed · {pendingCount} pending</span>
            <span className="font-bold text-primary">₹{totalRevenue.toLocaleString("en-IN")} earned</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShopOwnerDashboard;