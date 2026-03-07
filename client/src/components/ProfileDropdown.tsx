import { LogOut, ArrowLeftRight, User, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useState } from "react";
import SwitchToShop from "./SwitchToShop";

const ProfileDropdown = () => {
  const { user, logout } = useApp();
  const [switchToShop, setSwitchToShop] = useState(false);
  const navigate = useNavigate();

  if (switchToShop) {
    return <SwitchToShop onClose={() => setSwitchToShop(false)} />
  }

  return (
    <div className="relative group">

      {/* Avatar trigger */}
      <button className="focus:outline-none">
        <img
          src={user?.imageUrl}
          alt={`${user?.firstName} ${user?.lastName}`}
          className="size-8 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-primary/30 transition-all object-cover"
        />
      </button>

      {/* Dropdown */}
      <div className="hidden group-focus-within:block absolute right-0 top-12 w-60 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50">

        {/* User Info Header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2.5">
            <img
              src={user?.imageUrl}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <ul className="py-1.5 flex flex-col">

          {/* My Profile */}
          <li>
            <button
              onClick={() => navigate("/profile")}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              <User className="w-3.5 h-3.5 text-gray-400" />
              My Profile
            </button>
          </li>
          {/* Divider */}
          <li className="h-px bg-gray-100 mx-3 my-1" />

          {/* My Orders */}
          <li>
            <button
              onClick={() => navigate("/bookings")}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
              My Bookings
            </button>
          </li>

          {/* Divider */}
          <li className="h-px bg-gray-100 mx-3 my-1" />

          {/* Switch Account */}
          <li>
            {user?.role === "user" && (
              <button
                onClick={() => setSwitchToShop(true)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-secondary hover:bg-secondary/5 transition"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                Switch to Shop
              </button>
            )}
          </li>

          {/* Divider */}
          <li className="h-px bg-gray-100 mx-3 my-1" />

          {/* Logout */}
          <li>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-red-500 hover:bg-red-50 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default ProfileDropdown;