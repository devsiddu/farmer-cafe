import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  ClipboardList,
  PackagePlus
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const navLinks = [
  { to: "/shop-dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/shop-dashboard/add-product", label: "Add Products", icon: PackagePlus, end: false },
  { to: "/shop-dashboard/products", label: "Products", icon: Package, end: false },
  { to: "/shop-dashboard/bookings", label: "Bookings", icon: ClipboardList, end: false },
];

const ShopSidebar = () => {
  const { totalItems } = useCart();

  const linkClass = (isActive: boolean) =>
    `group relative flex items-center gap-3 py-2.5 px-3 mx-2 rounded-xl transition-all duration-150 ${isActive
      ? "bg-primary text-white shadow-sm shadow-primary/30"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
    }`;

  return (
    <div className="md:w-60 w-15 border-r border-gray-200 min-h-screen bg-white pt-6 pb-4 flex flex-col gap-0.5">

      {/* Section label - desktop only */}
      <p className="hidden md:block text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-5 mb-2">
        Main Menu
      </p>

      {/* Nav links */}
      {navLinks.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => linkClass(isActive)}
        >
          {({ isActive }) => (
            <>
              {/* Active pill indicator on mobile */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full md:hidden" />
              )}

              <Icon
                className={`w-4.5 h-4.5 shrink-0 transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary"
                  }`}
              />
              <span className="hidden md:block text-sm font-medium">{label}</span>
            </>
          )}
        </NavLink>
      ))}

      {/* Divider */}
      <div className="mx-4 my-3 border-t border-dashed border-gray-200" />

      {/* Cart link */}
      <NavLink
        to="/cart"
        className={({ isActive }) => linkClass(isActive)}
      >
        {({ isActive }) => (
          <>
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full md:hidden" />
            )}

            {/* Icon + badge */}
            <div className="relative shrink-0">
              <ShoppingCart
                className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-primary"
                  }`}
              />
              {totalItems > 0 && (
                <span className={`absolute -top-2 -right-2 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none ${isActive ? "bg-white text-primary" : "bg-primary text-white"
                  }`}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </div>

            {/* Label + count pill - desktop */}
            <div className="hidden md:flex items-center justify-between flex-1">
              <span className="text-sm font-medium">Cart</span>
              {totalItems > 0 && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full leading-none ${isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                  }`}>
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </div>
          </>
        )}
      </NavLink>

    </div>
  );
};

export default ShopSidebar;