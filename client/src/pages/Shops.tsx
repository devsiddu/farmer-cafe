import { useNavigate } from "react-router-dom";
import { dummyShops } from "../assets/assets";
import ShopCard from "../components/ShopCard";
import Title from "../components/Title";

const Shops = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-center">
      <div className="max-w-7xl w-full px-6">
        <Title title="Shops" />
        <div className="flex flex-wrap items-start justify-start gap-6">
          {dummyShops.map((shop) => (
            <ShopCard
              key={shop.shopId}
              shop={shop}
              onView={(id) => navigate(`/shop/${id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shops;
