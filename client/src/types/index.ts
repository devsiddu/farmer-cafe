import type { AxiosInstance } from "axios";
import type React from "react";
import type { NavigateFunction } from "react-router-dom";

export interface ShopType {
  _id: string;
  shopName: string;
  ownerId: string;
  ownerName?: string;
  image: string;
  location: string;
  rating: number;
  isOpen: boolean;
  phone: string;
  status: "approved" | "rejected" | "pending" | "closed",
  isDeleted: boolean,
  deletedAt: Date | null
}

export interface ProductType {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  rating: number;
  shopId: {
    _id: string,
    shopName: string,
    location: string,
    phone: string,
  },
  images: string[];
  description: string;
}

export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  role: string;
  password: string;
  phone: string;
  // Admin-managed fields
  isBlocked: boolean;
  location: string;
  createdAt: string;
}


export interface BookingType {
  _id: string,
  user: string,
  product: ProductType,
  qty: number,
  createdAt:Date,
  totalAmount: number,
  status: "pending" | "confirmed" | "cancelled"
}

export interface AppContext {
  axios: AxiosInstance;
  websiteEmail: string;
  navigate: NavigateFunction;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
  authLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  login: (email: string, password: string) => void;
  register: (firstName: string, lastName: string, email: string, password: string, phone: string, location: string) => void;
  products: ProductType[] | [];
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
  shops: ShopType[] | [];
  shop: ShopType | null;
  fetchProductById: (id: string) => Promise<ProductType | undefined>;
  fetchUser: () => void;
}

export interface ResponseType {
  success: boolean,
  message?: string,
  user?: any
}

export interface FormType {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  phone: string
  location: string
}

export interface CartItem {
  product: ProductType;
  qty: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: ProductType, qty: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
