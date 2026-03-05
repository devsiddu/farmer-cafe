import { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useApp } from "../context/AppContext";
// import assets from '../assets/assets.';
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { user, logout } = useApp();


  const navigate = useNavigate();



  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 text-primary bg-white relative transition-all">
      <Link to="/">
        <img src={assets.logoLight} alt="logo" width={157} />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8 text-primary">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/shops">Shops</Link>

        {user && <Link to="/booking-confirmation">Bookings</Link>}
        {user && user.role === 'admin' && <Link to="/admin-dashboard" className="items-center text-sm border border-gray-300 px-3 py-1 rounded-full">Dashboard</Link>}
        {user && user.role === 'shop' && <Link to="/shop-dashboard" className="items-center text-sm border border-gray-300 px-3 py-1 rounded-full">Dashboard</Link>}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search} width={16} alt="search" />
        </div>

        <button onClick={() => navigate('/cart')}>
          <img src={assets.cart} alt="" className="size-5 cursor-pointer" />
        </button>
        {user ? (
          <div className="relative group">

            <button>
              <img src={user?.imageUrl} alt="profile" className="size-9 rounded-full cursor-pointer" />
            </button>

            <div className="absolute right-0 top-13 hidden group-focus-within:block text-sm w-35 p-1 bg-white border border-gray-300/30 text-gray-500 rounded-md font-medium">
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-3 cursor-pointer px-3 py-2 rounded hover:bg-red-300/40 hover:text-red-500 transition">
                  <LogOut size={15} />
                  <button onClick={logout} >Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary transition text-white rounded-full">
            Login
          </button>
        )}

      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden cursor-pointer"
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu} alt="" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${open ? "flex" : "hidden"} absolute top-15 left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50`}
      >
        <Link to="/" className="block">Home</Link>
        <Link to="/products" className="block">Products</Link>
        <Link to="/shops" className="block">Shops</Link>
        <button onClick={() => navigate("/login")} className="cursor-pointer px-6 py-2 mt-2 bg-secondary hover:bg-primary transition text-white rounded-full text-sm">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
