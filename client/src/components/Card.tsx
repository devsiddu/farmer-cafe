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
      <div className="flex flex-col bg-white shadow-md w-72">
        <img className="w-72 h-48 object-cover" src={card.image} alt="image" />
        <div className="p-4 text-sm">
          <p className="text-slate-600">{card.price}</p>
          <p className="text-slate-800 text-base font-medium my-1.5">
            {card.title}
          </p>
          <p className="text-slate-500">{card.description}</p>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <button className="bg-slate-100 text-slate-600 py-2">
              Add to cart
            </button>
            <button className="bg-slate-800 text-white py-2">Buy now</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
