import React, { createContext, useContext, useState } from "react";
import { useApp } from "./AppContext";
import toast from "react-hot-toast";
import type { CartContextType, CartItem, ProductType } from "../types";


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user, navigate, axios } = useApp();


  const addToCart = async (product: ProductType, qty: number) => {
    if (!user) {
      toast.error("Please login to add product to cart");
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post("/api/cart/", { product, qty });
      if (data.success) {
        setCartItems((prev) => {
          const existing = prev.find((item) => item.product._id === product._id);
          if (existing) {
            return prev.map((item) =>
              item.product._id === product._id
                ? { ...item, qty: Math.min(item.qty + qty, product.quantity) }
                : item
            );
          }
          return [...prev, { product, qty }];
        });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message)

    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const updateQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};