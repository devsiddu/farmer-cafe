import { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useCart } from "../context/CartContext";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user } = useApp();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const navLinks = [
    { to: "/",         label: "Home"     },
    { to: "/products", label: "Products" },
    { to: "/shops",    label: "Shops"    },
  ];

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 text-primary bg-white relative transition-all z-40">

      {/* Logo */}
      <Link to="/">
        <img src={assets.logoLight} alt="logo" width={157} />
      </Link>

      {/* ── Desktop Links ── */}
      <div className="hidden sm:flex items-center gap-8 text-sm text-primary">
        {navLinks.map(({ to, label }) => (
          <Link key={to} to={to} className="hover:text-secondary transition font-medium">
            {label}
          </Link>
        ))}

        {user && (
          <Link to="/bookings" className="hover:text-secondary transition font-medium">
            My Bookings
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin-dashboard" className="text-xs border border-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-50 transition">
            Dashboard
          </Link>
        )}
        {user?.role === "shop" && (
          <Link to="/shop-dashboard" className="text-xs border border-gray-300 px-3 py-1.5 rounded-full hover:bg-gray-50 transition">
            Dashboard
          </Link>
        )}

        {/* Search */}
        <div className="hidden lg:flex items-center gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-400 text-sm"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search} width={16} alt="search" />
        </div>
      </div>

      {/* ── Desktop Right ── */}
      <div className="hidden sm:flex items-center gap-4">
        {/* Cart with badge */}
        <button onClick={() => navigate("/cart")} className="relative p-1" aria-label="Cart">
          <img src={assets.cart} alt="cart" className="size-5 cursor-pointer" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>

        {user ? <ProfileDropdown /> : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary/90 transition text-white text-sm rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* ── Mobile: profile + cart + hamburger ── */}
      <div className="flex sm:hidden items-center gap-3">
        {/* Cart */}
        <button onClick={() => navigate("/cart")} className="relative p-1">
          <img src={assets.cart} alt="cart" className="size-5" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {totalItems > 9 ? "9+" : totalItems}
            </span>
          )}
        </button>

        {/* Profile avatar (inline, not in drawer) */}
        {user ? (
          <ProfileDropdown />
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="text-xs px-3 py-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition"
          >
            Login
          </button>
        )}

        {/* Hamburger */}
        <button onClick={() => setOpen((p) => !p)} aria-label="Menu">
          <img src={assets.menu} alt="menu" />
        </button>
      </div>

      {/* ── Mobile Menu Drawer ── */}
      <div className={`${open ? "flex" : "hidden"} sm:hidden absolute top-16.25 left-0 w-full bg-white shadow-md border-t border-gray-100 py-4 flex-col gap-0.5 px-5 text-sm z-50`}>

        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className="py-2.5 font-medium text-gray-700 hover:text-primary border-b border-gray-50 transition"
          >
            {label}
          </Link>
        ))}

        {user && (
          <Link to="/bookings" onClick={() => setOpen(false)} className="py-2.5 font-medium text-gray-700 hover:text-primary border-b border-gray-50 transition">
            My Bookings
          </Link>
        )}

        {user?.role === "admin" && (
          <Link to="/admin-dashboard" onClick={() => setOpen(false)} className="py-2.5 font-medium text-gray-700 hover:text-primary border-b border-gray-50 transition">
            Dashboard
          </Link>
        )}
        {user?.role === "shop" && (
          <Link to="/shop-dashboard" onClick={() => setOpen(false)} className="py-2.5 font-medium text-gray-700 hover:text-primary border-b border-gray-50 transition">
            Dashboard
          </Link>
        )}


      </div>

    </nav>
  );
};

export default Navbar;