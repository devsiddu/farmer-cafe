import { useState } from "react";
import { Search, Trash2, ChevronDown, PackageX, Package, Pencil, Check, X } from "lucide-react";
import { dummyProducts } from "../../assets/assets";
import type { ProductType } from "../../types";
import { useApp } from "../../context/AppContext";
import toast from "react-hot-toast";

type StockFilter = "all" | "instock" | "outofstock";

const ShopProducts = () => {
  const { products, setProducts, shop, axios } = useApp();
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<StockFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [editingQty, setEditingQty] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  // --- Derived ---
  const categories = ["all", ...Array.from(new Set(dummyProducts.map((p) => p.category)))];
  const totalInStock = products.filter((p) => p.quantity > 0).length;
  const totalOutOfStock = products.filter((p) => p.quantity === 0).length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);

  // --- Actions ---
  const toggleStock = async (id: string) => {
    const product = products.find(p => p._id === id);
    if (!product) return;
    const newQty = product.quantity === 0 ? 10 : 0;
    try {
      const { data } = await axios.patch(`/api/products/${id}/quantity`, { quantity: newQty });
      if (data.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p._id === id ? { ...p, quantity: p.quantity === 0 ? 10 : 0 } : p
          )
        )
        toast.success(data.message)
        setEditingQty(null);
      } else {
        toast.error(data.message)
      }

    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }

  };

  const startEditQty = (p: ProductType) => {
    setEditingQty(p._id);
    setQuantity(p.quantity);
  };

  const confirmQty = async (id: string) => {

    try {
      const { data } = await axios.patch(`/api/products/${id}/quantity`, { quantity });
      if (data.success) {
        setProducts(prev =>
          prev.map(p => p._id === id ? { ...p, quantity: Math.max(0, quantity) } : p)
        )
        toast.success(data.message)
        setEditingQty(null);
      } else {
        toast.error(data.message)
      }

    } catch (error: any) {
      console.log(error.message)
      toast.error(error.message)
    }

    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, quantity: Math.max(0, quantity) } : p))
    );
    setEditingQty(null);
  };

  const deleteProduct = async (id: string) => {

    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      if (data.success) {
        toast.success(data.message)
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.message)
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
    setDeleteConfirm(null);
  };
  const shopProducts = products.filter(p => p.shopId._id === shop?._id)
  // --- Filters ---
  const filtered = shopProducts.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.shopId?.shopName.toLowerCase().includes(search.toLowerCase());
    const matchStock =
      stockFilter === "all" ||
      (stockFilter === "instock" && p.quantity > 0) ||
      (stockFilter === "outofstock" && p.quantity === 0);
    const matchCat = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchStock && matchCat;
  });

  const deleteTarget = products.find((p) => p._id === deleteConfirm);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Shop Products</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage product listings, stock status and quantities.
        </p>
      </div>

      {/* Summary Pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: "Total Products", value: products.length, color: "bg-primary" },
          { label: "In Stock", value: totalInStock, color: "bg-green-400" },
          { label: "Out of Stock", value: totalOutOfStock, color: "bg-red-400" },
          { label: "Total Units", value: totalStock, color: "bg-amber-400" },
        ].map((pill) => (
          <div
            key={pill.label}
            className="bg-white border border-gray-100 rounded-xl px-4 py-2.5 shadow-sm flex items-center gap-2"
          >
            <span className={`w-2 h-2 rounded-full ${pill.color}`} />
            <span className="text-sm text-gray-500">{pill.label}</span>
            <span className="text-sm font-bold text-gray-800">{pill.value}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product name, category or shop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Stock Filter */}
        <div className="relative">
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as StockFilter)}
            className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
          >
            <option value="all">All Stock</option>
            <option value="instock">In Stock</option>
            <option value="outofstock">Out of Stock</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-3">
        Showing {filtered.length} of {products.length} products
      </p>

      {/* ── TABLE — Desktop ── */}
      <div className="hidden md:block bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
              <th className="text-left px-5 py-3 font-semibold">Product</th>
              <th className="text-left px-5 py-3 font-semibold">Category</th>
              <th className="text-left px-5 py-3 font-semibold">Shop</th>
              <th className="text-left px-5 py-3 font-semibold">Price</th>
              <th className="text-left px-5 py-3 font-semibold">Quantity</th>
              <th className="text-left px-5 py-3 font-semibold">Stock</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  <div className="text-3xl mb-2">📦</div>
                  <p className="text-sm">No products found</p>
                </td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50/60 transition">
                  {/* Product */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.images?.[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                      />
                      <p className="font-semibold text-gray-800 text-sm leading-snug max-w-35 truncate">
                        {product.name}
                      </p>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-3.5">
                    <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2.5 py-1 rounded-lg">
                      {product.category}
                    </span>
                  </td>

                  {/* Shop */}
                  <td className="px-5 py-3.5 text-gray-500 text-xs">{product.shopId?.shopName}</td>

                  {/* Price */}
                  <td className="px-5 py-3.5 text-primary font-bold text-sm">₹{product.price}</td>

                  {/* Quantity — inline edit */}
                  <td className="px-5 py-3.5">
                    {editingQty === product._id ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          min={0}
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="w-16 px-2 py-1 text-xs border border-primary/40 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
                          autoFocus
                        />
                        <button
                          onClick={() => confirmQty(product._id)}
                          className="p-1 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingQty(null)}
                          className="p-1 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-gray-700">{product.quantity}</span>
                        <button
                          onClick={() => startEditQty(product)}
                          className="p-1 rounded-lg text-gray-300 hover:text-primary hover:bg-primary/5 transition"
                          title="Edit quantity"
                        >
                          <Pencil className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Stock Status */}
                  <td className="px-5 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${product.quantity > 0
                        ? "bg-green-50 text-green-600"
                        : "bg-red-50 text-red-500"
                        }`}
                    >
                      {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {/* Toggle Stock */}
                      <button
                        onClick={() => toggleStock(product._id)}
                        title={product.quantity > 0 ? "Mark out of stock" : "Mark in stock"}
                        className={`p-2 rounded-lg transition ${product.quantity > 0
                          ? "hover:bg-amber-50 text-gray-400 hover:text-amber-500"
                          : "hover:bg-green-50 text-gray-400 hover:text-green-500"
                          }`}
                      >
                        {product.quantity > 0 ? (
                          <PackageX className="w-4 h-4" />
                        ) : (
                          <Package className="w-4 h-4" />
                        )}
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => setDeleteConfirm(product._id)}
                        title="Delete product"
                        className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── CARDS — Mobile ── */}
      <div className="md:hidden flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <div className="text-3xl mb-2">📦</div>
            <p className="text-sm">No products found</p>
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Card Header */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                onClick={() =>
                  setExpandedProduct(expandedProduct === product._id ? null : product._id)
                }
              >
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-11 h-11 rounded-xl object-cover border border-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.category} · ₹{product.price}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${product.quantity > 0
                      ? "bg-green-50 text-green-600"
                      : "bg-red-50 text-red-500"
                      }`}
                  >
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedProduct === product._id ? "rotate-180" : ""
                      }`}
                  />
                </div>
              </div>

              {/* Expanded */}
              {expandedProduct === product._id && (
                <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                  <div className="flex flex-col gap-1.5 text-xs text-gray-500 mb-4">
                    <p>🏪 {product.shopId?.shopName}</p>
                    <p>📍 {product.shopId?.location}</p>
                    <p>📞 {product.shopId?.phone}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span>📦 Quantity:</span>
                      {editingQty === product._id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min={0}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-16 px-2 py-1 text-xs border border-primary/40 rounded-lg focus:outline-none"
                            autoFocus
                          />
                          <button
                            onClick={() => confirmQty(product._id)}
                            className="p-1 rounded-lg bg-green-50 text-green-600"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingQty(null)}
                            className="p-1 rounded-lg bg-gray-100 text-gray-400"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span className="font-semibold text-gray-700">{product.quantity} units</span>
                          <button
                            onClick={() => startEditQty(product)}
                            className="p-0.5 text-gray-300 hover:text-primary transition"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStock(product._id)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition ${product.quantity > 0
                        ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                        : "border-green-200 text-green-600 hover:bg-green-50"
                        }`}
                    >
                      {product.quantity > 0 ? (
                        <PackageX className="w-3.5 h-3.5" />
                      ) : (
                        <Package className="w-3.5 h-3.5" />
                      )}
                      {product.quantity > 0 ? "Mark Out" : "Mark In"}
                    </button>
                    <button
                      onClick={() => startEditQty(product)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-primary/20 text-primary hover:bg-primary/5 transition"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Edit Qty
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(product._id)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Confirm Modal */}
      {deleteConfirm !== null && deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 w-[320px] flex flex-col items-center text-center">
            <img
              src={deleteTarget.images?.[0]}
              alt={deleteTarget.name}
              className="w-16 h-16 rounded-2xl object-cover border border-gray-100 mb-3"
            />
            <h2 className="text-base font-bold text-gray-800">Delete Product?</h2>
            <p className="text-sm text-gray-600 mt-1 font-medium">{deleteTarget.name}</p>
            <p className="text-xs text-gray-400 mt-1 mb-6">
              This will permanently remove the product listing. This action cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProduct(deleteConfirm)}
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

export default ShopProducts;