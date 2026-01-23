import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { assets, dummyProducts } from "../assets/assets";
import type { Product } from "../types/product";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [qty, setQty] = useState<number>(0);
  const [selectQty, setSelectQty] = useState(false);
  const product = dummyProducts.find(
    (item: Product) => item._id === Number(id),
  );

  const [thumbnail, setThumbnail] = React.useState(product?.images[0]);
  const maxQty = product?.quantity ?? 0;

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

            <p className="text-base font-medium mt-2">
              Quantity : <span className="text-sm">{product.quantity}</span>
            </p>

            <p className="text-base font-medium mt-2">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              <li>{product.description}</li>
            </ul>
            {product.quantity === 0 && (
              <p className="text-sm text-amber-400  mt-6">
                ! Product is not Available
              </p>
            )}
            <p className="text-sm mt-1">Contact</p>
            <div className=" gap-3 flex mt-2">
              <div className="flex flex-col gap-2 ">
                <p className="inline-flex gap-2 text-secondary">
                  <img src={assets.store} width={15} alt="" />
                  {product.shop.shopName}
                </p>
                <p className="inline-flex gap-2 text-xs text-secondary">
                  <img src={assets.phone} width={12} alt="" />
                  {product.shop.phone}
                </p>
              </div>
              <div>
                <p className="inline-flex gap-2 text-secondary">
                  <img src={assets.location} width={15} alt="" />
                  {product.shop.location}
                </p>
              </div>
            </div>
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
              <button
                onClick={() => product.quantity > 0 && setSelectQty(true)}
                className={`w-full py-3.5 font-medium
              ${
                product.quantity === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : " bg-primary text-white hover:bg-primary/80 cursor-pointer"
              } transition`}
              >
                Book now
              </button>
            </div>
            {selectQty && (
              <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/5">
                <div className="flex flex-col items-center bg-white shadow-md rounded py-6 px-5 md:w-[400px] w-[370px] border border-gray-200 ">
                  <h2 className="text-gray-900 font-semibold mt-4 text-xl">
                    Enter Quantity
                  </h2>
                  {/* <select name="qty" id="qty" className="px-2 py-1.5 border border-secondary outline-none rounded my-2">
                  {Array(5).fill('').map((_, i) =>(
                  <option key={i+1} value={i+1}>{i+1}</option>
                  ))}
                </select> */}

                  {/* <input
                    type="number"
                    name="qty"
                    id="qty"
                    className="px-2 py-1.5 border border-secondary outline-none rounded my-2"
                    max={maxQty}
                    min={1}
                    value={String(qty)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value < 1) {
                        setQty(1);
                      } else if (value > maxQty) {
                        setQty(maxQty);
                      } else {
                        setQty(value);
                      }
                    }}
                  /> */}
                  <p className="text-xs text-gray-500 mt-2">
                    Available: {maxQty}
                  </p>
                  <div className="flex gap-4 items-center justify-center text-center mt-4">
                    <button
                      disabled={qty <= 1}
                      onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                      className={`h-7 w-7 rounded-full
                         ${qty <= 1 ? "bg-light/80 cursor-not-allowed" : "bg-light cursor-pointer"} inline-flex items-center justify-center `}
                    >
                      <span className="text-xl">-</span>
                    </button>

                    <p className="">{qty}</p>

                    <button
                      disabled={qty >= maxQty}
                      onClick={() =>
                        setQty((prev) => Math.min(maxQty, prev + 1))
                      }
                      className={`h-7 w-7 rounded-full
                         ${qty >= maxQty ? "bg-light/80 cursor-not-allowed" : "bg-light cursor-pointer"} inline-flex items-center justify-center `}
                    >
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-5 w-full">
                    <button
                      onClick={() => setSelectQty(false)}
                      type="button"
                      className="w-full md:w-36 h-10 border border-gray-300 bg-white text-gray-600 font-medium text-sm hover:bg-gray-100 active:scale-95 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setSelectQty(false)}
                      disabled={qty < 1 || qty > maxQty}
                      className={`w-full md:w-36 h-10 text-white font-medium text-sm transition ${
                        qty < 1 || qty > maxQty
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-primary hover:bg-primary/80"
                      }`}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDetails;
