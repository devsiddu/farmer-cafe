import { Outlet } from "react-router-dom";
import ShopNavbar from "../../components/shop/ShopNavbar";
import ShopSidebar from "../../components/shop/ShopSidebar";

const ShopLayout = () => {
  return (
    <div className="min-h-screen">
      <ShopNavbar />
      <div className="flex">
        <ShopSidebar />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;