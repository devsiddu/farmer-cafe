import { useState } from "react";
import { dummyProducts } from "../assets/assets";
import Card from "./Card";
import Title from "./Title";
import type { Product } from "../types/product";

const FeaturedProducts = () => {
  // 2. Initialize state using the Interface and the imported data
  const [products, setProducts] = useState<Product[]>(dummyProducts);

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-7xl w-full px-6">
        <Title title="Featured Products" />
        <div className="flex flex-wrap items-start justify-start gap-6">
          {products.slice(0, 4).map((product) => (
            <Card product={product} key={product._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
