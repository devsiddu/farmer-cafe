import React, { useState } from "react";
import { products as initialProducts } from "../assets/assets";
import Card from "./Card";
import Title from "./Title";

// 1. Define an interface for the Product type
interface Product {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

const FeaturedProducts = () => {
  // 2. Initialize state using the Interface and the imported data
  const [products, setProducts] = useState<Product[]>(initialProducts);

  return (
    <div className="w-full items-center flex flex-col justify-center">
      <Title
        title="Featured Products"
        subTitle="Preferred choice ofPreferred choice of"
      />
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl px-6">
        {products.slice(0, 4).map((product) => (
          <Card
            description={product.description}
            image={product.image}
            price={product.price}
            title={product.title}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
