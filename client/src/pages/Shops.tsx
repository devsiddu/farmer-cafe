import { useNavigate } from "react-router-dom";
import ShopCard from "../components/ShopCard";
import Title from "../components/Title";
import { useApp } from "../context/AppContext";

const Shops = () => {

  const { shops } = useApp();

  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-center">
      <div className="max-w-7xl w-full px-6">
        <Title title="Shops" />

        <div className="flex flex-wrap items-start justify-start gap-6">
          {shops?.map((shop) => (
            <ShopCard
              key={shop._id}
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