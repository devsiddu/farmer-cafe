import { useEffect, useState } from "react";
import { Search, Trash2, ChevronDown, Star, Phone, MapPin, Store, ToggleLeft, ToggleRight } from "lucide-react";
import { dummyShops } from "../../assets/assets";
import type { ShopType } from "../../types";
import { useApp } from "../../context/AppContext";
import toast from "react-hot-toast";


type StatusFilter = "all" | "open" | "closed";

const ShopsList = () => {
  const [shops, setShops] = useState<ShopType[] | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<"rating" | "name">("rating");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const { axios } = useApp();
  const fetchShops = async () => {
    try {
      const { data } = await axios.get("/api/admin/shops");
      if (data) {
        setShops(data.shops)
      } else {
        toast.error(data.message)
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message)
    }
  }
  if (!shops) return;
  // --- Actions ---
  const toggleOpen = (shopId: string) =>
    setShops((prev) =>
      (prev || []).map((s) => (s._id === shopId ? { ...s, isOpen: !s.isOpen } : s))
    );

  const deleteShop = (shopId: string) => {
    setShops((prev) => (prev || []).filter((s) => s._id !== shopId));
    setDeleteConfirm(null);
  };

  // --- Filters + Sort ---
  const filtered = shops
    .filter((s) => {
      const matchSearch =
        s.shopName.toLowerCase().includes(search.toLowerCase()) ||
        s.ownerName?.toLowerCase().includes(search.toLowerCase()) ||
        s.location.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "open" && s.isOpen) ||
        (statusFilter === "closed" && !s.isOpen);
      return matchSearch && matchStatus;
    })
    .sort((a, b) =>
      sortBy === "rating" ? b.rating - a.rating : a.shopName.localeCompare(b.shopName)
    );

  const openCount = shops.filter((s) => s.isOpen).length;
  const closedCount = shops.filter((s) => !s.isOpen).length;
  const avgRating = (shops.reduce((sum, s) => sum + s.rating, 0) / shops.length).toFixed(1);

  const deleteTarget = shops.find((s) => s._id === deleteConfirm);

  useEffect(() => {
    fetchShops();
  }, [])


  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Shops</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Manage all registered shops on the platform.
        </p>
      </div>

      {/* Summary Pills */}
      <div className="flex flex-wrap gap-3 mb-6">
        {[
          { label: "Total Shops", value: shops.length, color: "bg-primary" },
          { label: "Open", value: openCount, color: "bg-green-400" },
          { label: "Closed", value: closedCount, color: "bg-red-400" },
          { label: "Avg Rating", value: `⭐ ${avgRating}`, color: "bg-amber-400", raw: true },
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

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by shop name, owner or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
          >
            <option value="all">All Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "rating" | "name")}
            className="appearance-none pl-4 pr-8 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-600"
          >
            <option value="rating">Sort: Rating</option>
            <option value="name">Sort: Name</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* View Toggle */}
        <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-white shrink-0">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-2.5 text-xs font-semibold transition ${viewMode === "grid" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-50"
              }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-2.5 text-xs font-semibold transition ${viewMode === "table" ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-50"
              }`}
          >
            Table
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 mb-4">
        Showing {filtered.length} of {shops.length} shops
      </p>

      {/* ── GRID VIEW ── */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400">
              <div className="text-4xl mb-2">🏪</div>
              <p className="text-sm">No shops found</p>
            </div>
          ) : (
            filtered.map((shop) => (
              <div
                key={shop._id}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col"
              >
                {/* Shop Image */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={shop.image}
                    alt={shop.shopName}
                    className="w-full h-full object-cover"
                  />
                  {/* Status Badge */}
                  <span
                    className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-lg ${shop.isOpen
                      ? "bg-green-500 text-white"
                      : "bg-gray-700/80 text-white"
                      }`}
                  >
                    {shop.isOpen ? "Open" : "Closed"}
                  </span>
                  {/* Rating Badge */}
                  <span className="absolute top-2 right-2 bg-white/90 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-lg flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 stroke-amber-400" />
                    {shop.rating}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 flex-1 flex flex-col gap-1">
                  <h3 className="font-bold text-gray-800 text-sm leading-snug">{shop.shopName}</h3>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Store className="w-3 h-3" /> {shop.ownerName}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {shop.location}
                  </p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {shop.phone}
                  </p>
                </div>

                {/* Actions */}
                <div className="px-4 pb-4 flex gap-2">
                  <button
                    onClick={() => toggleOpen(shop._id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold border transition ${shop.isOpen
                      ? "border-amber-200 text-amber-600 hover:bg-amber-50"
                      : "border-green-200 text-green-600 hover:bg-green-50"
                      }`}
                  >
                    {shop.isOpen ? (
                      <ToggleRight className="w-3.5 h-3.5" />
                    ) : (
                      <ToggleLeft className="w-3.5 h-3.5" />
                    )}
                    {shop.isOpen ? "Close" : "Open"}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(shop._id)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ── TABLE VIEW ── */}
      {viewMode === "table" && (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-400 uppercase tracking-wider">
                <th className="text-left px-5 py-3 font-semibold">Shop</th>
                <th className="text-left px-5 py-3 font-semibold">Owner</th>
                <th className="text-left px-5 py-3 font-semibold">Location</th>
                <th className="text-left px-5 py-3 font-semibold">Phone</th>
                <th className="text-left px-5 py-3 font-semibold">Rating</th>
                <th className="text-left px-5 py-3 font-semibold">Status</th>
                <th className="text-right px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <div className="text-3xl mb-2">🏪</div>
                    <p className="text-sm">No shops found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((shop) => (
                  <tr key={shop._id} className="hover:bg-gray-50/60 transition">
                    {/* Shop */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={shop.image}
                          alt={shop.shopName}
                          className="w-10 h-10 rounded-xl object-cover border border-gray-100 shrink-0"
                        />
                        <p className="font-semibold text-gray-800 text-sm">{shop.shopName}</p>
                      </div>
                    </td>
                    {/* Owner */}
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{shop.ownerName}</td>
                    {/* Location */}
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{shop.location}</td>
                    {/* Phone */}
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{shop.phone}</td>
                    {/* Rating */}
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                        {shop.rating}
                      </span>
                    </td>
                    {/* Status */}
                    <td className="px-5 py-3.5">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${shop.isOpen
                          ? "bg-green-50 text-green-600"
                          : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {shop.isOpen ? "Open" : "Closed"}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleOpen(shop._id)}
                          title={shop.isOpen ? "Close shop" : "Open shop"}
                          className={`p-2 rounded-lg transition ${shop.isOpen
                            ? "hover:bg-amber-50 text-gray-400 hover:text-amber-500"
                            : "hover:bg-green-50 text-gray-400 hover:text-green-500"
                            }`}
                        >
                          {shop.isOpen ? (
                            <ToggleRight className="w-4 h-4" />
                          ) : (
                            <ToggleLeft className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(shop._id)}
                          title="Delete shop"
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
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && deleteTarget && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/20 z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-7 w-85 flex flex-col items-center text-center">
            <img
              src={deleteTarget.image}
              alt={deleteTarget.shopName}
              className="w-16 h-16 rounded-2xl object-cover border border-gray-100 mb-3"
            />
            <h2 className="text-base font-bold text-gray-800">Delete Shop?</h2>
            <p className="text-sm text-gray-600 mt-1 font-medium">{deleteTarget.shopName}</p>
            <p className="text-xs text-gray-400 mt-1 mb-6">
              This will permanently remove the shop and all its listings. This action cannot be undone.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteShop(deleteConfirm)}
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

export default ShopsList;