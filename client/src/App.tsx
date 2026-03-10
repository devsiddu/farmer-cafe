import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Shops from "./pages/Shops";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProductDetails from "./pages/ProductDetails";
import ShopDetails from "./pages/ShopDetails";
import Login from "./pages/Login";
import BookingConfirmation from "./pages/BookingConfirmation";
import Cart from "./pages/Cart";
import Layout from "./pages/admin/Layout";
import Users from "./pages/admin/Users";
import Dashboard from "./pages/admin/Dashboard";
import ShopsList from "./pages/admin/ShopsList";
import ShopLayout from "./pages/shop/ShopLayout";
import ShopDashboard from "./pages/shop/ShopDashboard";
import ShopProducts from "./pages/shop/ShopProducts";
import ShopBookings from "./pages/shop/ShopBookings";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./middleware/ProtectRoute";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import { useApp } from "./context/AppContext";
import NetworkBanner from "./components/NetworkBanner";
const App = () => {
  const { pathname } = useLocation();
  const { user } = useApp()
  const hideLayout = pathname === "/login";
  const isAdminPath = pathname.startsWith("/admin-dashboard");
  const isShopPath = pathname.startsWith("/shop-dashboard");

  return (
    <div>
      <Toaster toastOptions={{
        style: {
          fontSize: "15px"
        }
      }} />
      <NetworkBanner />
      {!hideLayout && !isAdminPath && !isShopPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/cart" element={<Cart />} />
        {user && <Route path="/bookings" element={<BookingConfirmation />} />}

        <Route path="/profile" element={<Profile />} />

        <Route element={<ProtectRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="shops" element={<ShopsList />} />
          </Route>
        </Route>

        <Route element={<ProtectRoute allowedRoles={['shop']} />}>
          <Route path="/shop-dashboard" element={<ShopLayout />}>
            <Route index element={<ShopDashboard />} />
            <Route path="products" element={<ShopProducts />} />
            <Route path="bookings" element={<ShopBookings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && !isAdminPath && !isShopPath && <Footer />}
    </div>
  );
};

export default App;