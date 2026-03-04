import type React from "react";

export interface Shop {
  shopId: string;
  shopName: string;
  ownerName: string;
  image: string;
  location: string;
  rating: number;
  isOpen: boolean;
  phone: string;
}

export interface Product {
  _id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  rating: number;
  shop: {
    shopId: string;
    shopName: string;
    location: string;
    phone: number;
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


export interface AppContext {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void,
  farmerSignUp: () => void
}