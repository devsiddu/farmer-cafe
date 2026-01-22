import React from "react";
import { useParams } from "react-router-dom";
import { assets, dummyProducts } from "../assets/assets";
import type { Product } from "../types/product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  const product = dummyProducts.find(
    (item: Product) => item._id === Number(id),
  );

  const [thumbnail, setThumbnail] = React.useState(product?.images[0]);

  return (
    product && (
      <div className="max-w-6xl w-full px-6 mt-10 md:ms-25">
        <p>
          <span>Home</span> /<span> Products</span> /
          <span> {product.category}</span> /
          <span className="text-secondary"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  product.rating > i ? (
                    <img src={assets.starFilled} key={i} alt="star" />
                  ) : (
                    <img src={assets.star} alt="star" key={i} />
                  ),
                )}
              <p className="text-base ml-2">({product.rating})</p>
            </div>

            <div className="mt-6">
              <p className="text-2xl font-medium">MRP: ₹{product.price}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">
              Quantity : <span className="text-sm">{product.quantity}</span>
            </p>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              <li>{product.description}</li>
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                className={`w-full py-3.5  font-medium 
                  ${
                    product.quantity === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-light text-secondary hover:bg-light/80 cursor-pointer"
                  } transition`}
                disabled={product.quantity === 0}
              >
                Add to Cart
              </button>
              <button className={`w-full py-3.5  font-medium
              ${ product.quantity === 0 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : ' bg-primary text-white hover:bg-primary/80'
              } transition`}>
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
