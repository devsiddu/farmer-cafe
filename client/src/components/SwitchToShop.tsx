import { useState } from "react";
import { X, Store, MapPin, ArrowRight, Sprout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

interface SwitchToShopProps {
  onClose: () => void;
}

const SwitchToShop = ({ onClose }: SwitchToShopProps) => {
  const { user, axios, fetchUser } = useApp();
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ shopName?: string; location?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!shopName.trim()) newErrors.shopName = "Shop name is required";
    if (!location.trim()) newErrors.location = "Location is required";
    return newErrors;
  };

  const handleSubmit = async () => {
    try {
      const errs = validate();
      if (Object.keys(errs).length) { setErrors(errs); return; }
      setErrors({});
      setLoading(true);

      const { data } = await axios.post("/api/user/switch-to-shop", { shopName, location });
      if (data.success) {
        toast.success(data.message);
        fetchUser();

        setTimeout(() => {
          setLoading(false);
          onClose();
          navigate("/shop-dashboard");
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log("Failed to switch shop : " + error);
      toast.error(error.message)
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden">


        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition z-10"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="px-8 pt-8 pb-8">

          {/* Icon + Heading */}
          <div className="flex items-center gap-4 mb-7">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Store className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Open Your Shop</h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Register your agri store on Farmers Cafe
              </p>
            </div>
          </div>

          {/* User info pill */}
          {user && (
            <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5 mb-6">
              <img
                src={user.imageUrl}
                alt="profile"
                className="w-7 h-7 rounded-full object-cover border border-gray-200 shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-700 truncate">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
              </div>
              <span className="ml-auto text-[10px] font-semibold bg-secondary/10 text-secondary px-2 py-0.5 rounded-full shrink-0">
                Switching to Shop
              </span>
            </div>
          )}

          {/* Form Fields */}
          <div className="flex flex-col gap-4">

            {/* Shop Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Shop Name
              </label>
              <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-white transition-all ${errors.shopName
                ? "border-red-300 bg-red-50/30"
                : shopName
                  ? "border-primary/40 bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
                }`}>
                <Store className={`w-4 h-4 shrink-0 ${errors.shopName ? "text-red-400" : "text-gray-400"}`} />
                <input
                  type="text"
                  placeholder="e.g. Kisan Agro Center"
                  value={shopName}
                  onChange={(e) => { setShopName(e.target.value); setErrors((p) => ({ ...p, shopName: undefined })); }}
                  className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
                />
              </div>
              {errors.shopName && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.shopName}</p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">
                Location
              </label>
              <div className={`flex items-center gap-3 border rounded-xl px-4 py-3 bg-white transition-all ${errors.location
                ? "border-red-300 bg-red-50/30"
                : location
                  ? "border-primary/40 bg-primary/5"
                  : "border-gray-200 hover:border-gray-300"
                }`}>
                <MapPin className={`w-4 h-4 shrink-0 ${errors.location ? "text-red-400" : "text-gray-400"}`} />
                <input
                  type="text"
                  placeholder="e.g. Gokak, Belagavi"
                  value={location}
                  onChange={(e) => { setLocation(e.target.value); setErrors((p) => ({ ...p, location: undefined })); }}
                  className="flex-1 text-sm text-gray-800 placeholder-gray-400 bg-transparent outline-none"
                />
              </div>
              {errors.location && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.location}</p>
              )}
            </div>
          </div>

          {/* Info note */}
          <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 mt-5">
            <Sprout className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Your account will be switched to a <strong>Shop Owner</strong> role. You can always switch back from your profile.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-500 hover:bg-gray-50 transition active:scale-95"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition active:scale-95 ${loading
                ? "bg-primary/60 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
                }`}
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                  Setting up...
                </>
              ) : (
                <>
                  Switch to Shop
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SwitchToShop;