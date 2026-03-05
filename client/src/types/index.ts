import type React from "react";

export interface ShopType {
  _id: string;
  shopName: string;
  ownerId: string;
  ownerName?: string;
  image: string;
  location: string;
  rating: number;
  isOpen: boolean;
  phone: number;
}

export interface ProductType {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  rating: number;
  shopId: string,
  shop?: {
    shopName: string,
    location: string,
    phone: number,
  };
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
  phone: number;
  // Admin-managed fields
  isBlocked: boolean;
  location: string;
  createdAt: string;
}

export interface OrderType {
  orderId: string;
  product: ProductType;
  qty: number;
  status: "confirmed" | "cancelled" | "pending";
  bookedAt: Date;
}

export interface AppContext {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  farmerSignUp: () => void;
  products: ProductType[] | null;
  shops: ShopType[] | null;
  fetchProductById: (id: string) => ProductType | undefined;
}