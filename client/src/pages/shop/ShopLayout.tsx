import { Outlet } from "react-router-dom";
import ShopNavbar from "../../components/shop/ShopNavbar";
import ShopSidebar from "../../components/shop/ShopSidebar";
import { useApp } from "../../context/AppContext";
import ApprovalLoader from "../../components/ApprovalLoader";
import ShopDeleted from "../../components/shop/ShopDeleted";

const ShopLayout = () => {
  const { user, shop} = useApp();

  if (user?.role === "shop" && shop?.status !== "approved") {
    return <ApprovalLoader />
  }
  if (shop?.isDeleted) {
    return <ShopDeleted />
  }
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