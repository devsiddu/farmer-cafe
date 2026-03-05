import Card from "../components/Card";
import Title from "../components/Title";
import { useApp } from "../context/AppContext";

const Products = () => {
  const { products, loading } = useApp();
  if (loading) {
    return (
      <div>
        Loading
      </div>
    )
  }
  return (
    <div className="flex w-full justify-center">
      <div className="max-w-7xl w-full px-6">
        <Title title="Products" />
        <div className="flex flex-wrap items-start justify-start gap-6">
          {products?.map((product, index) => (
            <Card product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
