import { useState } from "react";
import { ShoppingBag, Users, Store, Package, TrendingUp, ArrowUpRight } from "lucide-react";
import { dummyProducts, dummyShops } from "../../assets/assets";
import { useApp } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
  border: string;
  route?: string;
  suffix?: string;
}

const Dashboard = () => {
  const { user } = useApp();
  const navigate = useNavigate();

  // --- Derived stats from dummyProducts ---
  const totalProducts = dummyProducts.length;

  const uniqueShops = new Set(dummyProducts.map((p) => p.shopId)).size;

  const totalStock = dummyProducts.reduce((sum, p) => sum + (p.quantity ?? 0), 0);

  const outOfStock = dummyProducts.filter((p) => p.quantity === 0).length;

  const avgRating =
    dummyProducts.length > 0
      ? (
        dummyProducts.reduce((sum, p) => sum + (p.rating ?? 0), 0) /
        dummyProducts.length
      ).toFixed(1)
      : "0.0";

  // Categories
  const categories = [...new Set(dummyProducts.map((p) => p.category))];

  // Recent products (last 5)
  const recentProducts = [...dummyProducts].slice(-5).reverse();

  // Mock user count — replace with real API call if available
  const [userCount] = useState(24);

  const stats: StatCard[] = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Package className="w-5 h-5" />,
      color: "text-primary",
      bg: "bg-primary/10",
      border: "border-primary/20",
      route: "/products",
    },
    {
      title: "Total Shops",
      value: uniqueShops,
      icon: <Store className="w-5 h-5" />,
      color: "text-secondary",
      bg: "bg-secondary/10",
      border: "border-secondary/20",
      route: "/admin-dashboard/shops",
    },
    {
      title: "Registered Users",
      value: userCount,
      icon: <Users className="w-5 h-5" />,
      color: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-100",
      route: "/admin-dashboard/users",
    },
    {
      title: "Total Stock",
      value: totalStock,
      icon: <ShoppingBag className="w-5 h-5" />,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      suffix: "units",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.firstName ?? "Admin"} 👋
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Here's what's happening on your platform today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.title}
            onClick={() => stat.route && navigate(stat.route)}
            className={`bg-white border ${stat.border} rounded-2xl p-5 flex flex-col gap-3 shadow-sm ${stat.route ? "cursor-pointer hover:shadow-md transition-shadow" : ""
              }`}
          >
            <div className="flex items-center justify-between">
              <div className={`${stat.bg} ${stat.color} p-2 rounded-xl`}>
                {stat.icon}
              </div>
              {stat.route && (
                <ArrowUpRight className="w-4 h-4 text-gray-300" />
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">
                {stat.value.toLocaleString()}
                {stat.suffix && (
                  <span className="text-sm font-normal text-gray-400 ml-1">
                    {stat.suffix}
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        {/* Avg Rating */}
        <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-amber-50 text-amber-500 p-3 rounded-xl text-2xl">⭐</div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{avgRating}</p>
            <p className="text-xs text-gray-400">Avg Product Rating</p>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white border border-red-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-red-50 text-red-400 p-3 rounded-xl text-2xl">📦</div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{outOfStock}</p>
            <p className="text-xs text-gray-400">Out of Stock Products</p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 text-blue-400 p-3 rounded-xl">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
            <p className="text-xs text-gray-400">Product Categories</p>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Recent Products */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 text-sm">Recent Products</h2>
            <button
              onClick={() => navigate("/products")}
              className="text-xs text-primary hover:underline"
            >
              View all →
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

        {/* Categories Breakdown */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-700 text-sm">Products by Category</h2>
          </div>
          <div className="px-5 py-3 flex flex-col gap-3">
            {categories.map((cat) => {
              const count = dummyProducts.filter((p) => p.category === cat).length;
              const pct = Math.round((count / totalProducts) * 100);
              return (
                <div key={cat}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span className="font-medium text-gray-700">{cat}</span>
                    <span>{count} product{count > 1 ? "s" : ""} · {pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Shop list */}
          <div className="px-5 py-4 border-t border-gray-100 mt-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Shops</p>
            <div className="flex flex-wrap gap-2">
              {dummyShops.map((shop) => (
                <span
                  key={shop._id}
                  className="text-xs bg-secondary/10 text-secondary font-medium px-2.5 py-1 rounded-lg"
                >
                  {shop.shopName}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;