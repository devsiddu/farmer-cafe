
import Card from "./Card";
import Title from "./Title";
import { useApp } from "../context/AppContext";

const FeaturedProducts = () => {
  const { products, loading } = useApp();
  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-7xl w-full px-6">
        <Title title="Featured Products" />
        <div className="flex flex-wrap items-start justify-start gap-6">
          {products?.map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
