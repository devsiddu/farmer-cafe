import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Pencil, Check, X, LogOut, ShoppingBag, ArrowLeftRight, Camera } from "lucide-react";

type EditableField = "firstName" | "lastName" | "email" | "phone";

const Profile = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const [editField, setEditField] = useState<EditableField | null>(null);
  const [formData, setFormData] = useState({
    firstName: user?.firstName ?? "",
    lastName:  user?.lastName  ?? "",
    email:     user?.email     ?? "",
    phone:     String(user?.phone ?? ""),
  });
  const [savedData, setSavedData] = useState({ ...formData });

  const startEdit  = (field: EditableField) => setEditField(field);
  const cancelEdit = () => { setFormData({ ...savedData }); setEditField(null); };
  const saveEdit   = () => { setSavedData({ ...formData }); setEditField(null); };

  const fields: { key: EditableField; label: string; icon: string; type?: string }[] = [
    { key: "firstName", label: "First Name", icon: "👤" },
    { key: "lastName",  label: "Last Name",  icon: "👤" },
    { key: "email",     label: "Email",      icon: "✉️", type: "email" },
    { key: "phone",     label: "Phone",      icon: "📞", type: "tel"   },
  ];

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-4xl mb-3">🔒</p>
        <h2 className="text-lg font-semibold text-gray-700">You're not logged in</h2>
        <p className="text-sm text-gray-400 mt-1 mb-6">Please login to view your profile.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">

      {/* ── Profile Card ── */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-5">

        {/* Cover + Avatar */}
        <div className="h-24 bg-linear-to-r from-primary/20 via-secondary/20 to-primary/10 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="relative">
              <img
                src={user.imageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-sm"
              />
              <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center shadow-sm hover:bg-primary/90 transition">
                <Camera className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Name + Role */}
        <div className="pt-14 px-6 pb-5">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {savedData.firstName} {savedData.lastName}
              </h1>
              <p className="text-sm text-gray-400 mt-0.5">{savedData.email}</p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
              user.role === "admin"
                ? "bg-violet-50 text-violet-600"
                : user.role === "shop"
                ? "bg-secondary/10 text-secondary"
                : "bg-primary/10 text-primary"
            }`}>
              {user.role === "admin" ? "Admin" : user.role === "shop" ? "Shop Owner" : "Farmer"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Editable Fields ── */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-5">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700 text-sm">Personal Information</h2>
          <p className="text-xs text-gray-400 mt-0.5">Click the pencil icon to edit any field</p>
        </div>

        <div className="divide-y divide-gray-50">
          {fields.map(({ key, label, icon, type }) => (
            <div key={key} className="flex items-center gap-4 px-6 py-4">
              <span className="text-base shrink-0">{icon}</span>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                  {label}
                </p>
                {editField === key ? (
                  <input
                    type={type ?? "text"}
                    value={formData[key]}
                    autoFocus
                    onChange={(e) => setFormData((prev) => ({ ...prev, [key]: e.target.value }))}
                    className="w-full text-sm text-gray-800 border-b border-primary/40 focus:outline-none bg-transparent pb-0.5"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {key === "phone"
                      ? `+91 ${String(savedData.phone).replace(/(\d{5})(\d{5})/, "$1 $2")}`
                      : savedData[key] || <span className="text-gray-300 italic">Not set</span>
                    }
                  </p>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1 shrink-0">
                {editField === key ? (
                  <>
                    <button
                      onClick={saveEdit}
                      className="w-7 h-7 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center transition"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="w-7 h-7 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 flex items-center justify-center transition"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => startEdit(key)}
                    className="w-7 h-7 rounded-lg text-gray-300 hover:text-primary hover:bg-primary/5 flex items-center justify-center transition"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Account Info ── */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-5">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700 text-sm">Account</h2>
        </div>
        <div className="divide-y divide-gray-50 text-sm">
          <div className="flex justify-between items-center px-6 py-3.5">
            <span className="text-gray-500">User ID</span>
            <span className="font-mono text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-lg truncate max-w-40">
              {user._id}
            </span>
          </div>
          <div className="flex justify-between items-center px-6 py-3.5">
            <span className="text-gray-500">Role</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
              user.role === "admin"
                ? "bg-violet-50 text-violet-600"
                : user.role === "shop"
                ? "bg-secondary/10 text-secondary"
                : "bg-primary/10 text-primary"
            }`}>
              {user.role === "admin" ? "Admin" : user.role === "shop" ? "Shop Owner" : "Farmer"}
            </span>
          </div>
          <div className="flex justify-between items-center px-6 py-3.5">
            <span className="text-gray-500">Password</span>
            <button className="text-xs text-primary font-semibold hover:underline transition">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-5">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-700 text-sm">Quick Actions</h2>
        </div>
        <div className="divide-y divide-gray-50">

          <button
            onClick={() => navigate("/bookings")}
            className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50 transition text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">My Orders</p>
              <p className="text-xs text-gray-400">View your booking history</p>
            </div>
          </button>

          {user.role === "admin" && (
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50 transition text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Switch to Admin</p>
                <p className="text-xs text-gray-400">Go to admin dashboard</p>
              </div>
            </button>
          )}

          {user.role === "shop" && (
            <button
              onClick={() => navigate("/shop-dashboard")}
              className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-gray-50 transition text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Switch to Shop</p>
                <p className="text-xs text-gray-400">Go to shop dashboard</p>
              </div>
            </button>
          )}

        </div>
      </div>

      {/* ── Danger Zone ── */}
      <div className="bg-white border border-red-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100">
          <h2 className="font-semibold text-red-500 text-sm">Danger Zone</h2>
        </div>
        <div className="divide-y divide-red-50">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-red-50 transition text-left"
          >
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-500">Logout</p>
              <p className="text-xs text-red-300">Sign out of your account</p>
            </div>
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-3.5 hover:bg-red-50 transition text-left">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-400 flex items-center justify-center shrink-0">
              <X className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-red-400">Delete Account</p>
              <p className="text-xs text-red-300">Permanently remove your account</p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};

export default Profile;