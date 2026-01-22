import React from "react";

interface Card {
  price: number;
  title: string;
  description: string;
  image: string;
}
const Card = (card: Card) => {
  return (
    <>
      <div className="flex flex-col bg-white shadow-md w-72 ">
        <img className="w-72 h-48 object-cover cursor-pointer" src={card.image} alt="image" />
        <div className="p-4 text-sm">
          <p className="text-secondary">₹ {card.price}</p>
          <p className="text-primary text-base font-medium my-1.5">
            {card.title}
          </p>
          <p className="text-ternary">{card.description}</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button className="bg-light text-slate-600 py-2 cursor-pointer">
              Add to cart
            </button>
            <button className="bg-primary text-white py-2 cursor-pointer">Buy now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
