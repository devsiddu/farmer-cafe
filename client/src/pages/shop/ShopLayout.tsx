import { Outlet } from "react-router-dom";
import ShopNavbar from "../../components/shop/ShopNavbar";
import ShopSidebar from "../../components/shop/ShopSidebar";
import { useApp } from "../../context/AppContext";
import ApprovalLoader from "../../components/ApprovalLoader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { ShopType } from "../../types";
import ShopDeleted from "../../components/shop/ShopDeleted";

const ShopLayout = () => {
  const { user, axios } = useApp();
  const [shop, setShop] = useState<ShopType | null>(null);

  const fetchUserShop = async () => {
    try {
      const { data } = await axios.get("/api/shop/user");
      if (data.success) {
        setShop(data.shop);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.error("Failed to fetch user shop :" + error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchUserShop();
  }, [])

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