import { LayoutDashboard, List, Store } from "lucide-react";
import { NavLink } from "react-router-dom";
const navLinks = [
  { to: "/shop-dashboard", label: "Dashboard", icon: <LayoutDashboard />, end: true },
  { to: "/shop-dashboard/users", label: "Users", icon: <List /> },
  { to: "/shop-dashboard/shops", label: "Shops", icon: <Store /> },
];

const ShopSidebar = () => {

  return (
    <div className="md:w-64 w-16 border-r h-137.5 border-gray-300 pt-4 flex flex-col">

      {/* Static nav links */}
      {navLinks.map(({ to, label, icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex items-center py-3 px-4 gap-3 ${isActive
              ? "border-r-4 md:border-r-[6px] bg-secondary/10 border-secondary text-secondary"
              : "hover:bg-gray-100/90 text-gray-700"
            }`
          }
        >
          {icon}
          <p className="md:block hidden">{label}</p>
        </NavLink>
      ))}


    </div>
  );
};

export default ShopSidebar;