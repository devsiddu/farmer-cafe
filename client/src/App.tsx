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
const App = () => {
  const { pathname } = useLocation();

  const hideLayout = pathname === "/login";
  const isAdminPath = pathname.startsWith("/admin-dashboard");

  return (
    <div>
      {!hideLayout && !isAdminPath && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/shop/:id" element={<ShopDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />

        <Route path="/admin-dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="shops" element={<ShopsList />} />
        </Route>
      </Routes>

      {!hideLayout && !isAdminPath && <Footer />}
    </div>
  );
};

export default App;