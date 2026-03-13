import { Document, Types } from "mongoose";

export interface IShop extends Document {
  shopName: string;
  ownerId: Types.ObjectId;
  ownerName: string;
  image: string;
  location: string;
  rating: number;
  isOpen: boolean;
  phone: string;
  status: "approved" | "rejected" | "pending" | "closed",
  isDeleted: boolean,
  deletedAt: Date | null
}

export interface IProduct {
  name: string;
  category: string;
  quantity: number;
  price: number;
  rating: number;
  shopId: Types.ObjectId;
  images: string[];
  description: string;
}

export interface IUser {
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

export interface OrderType {
  orderId: string;
  product: IProduct;
  qty: number;
  status: "confirmed" | "cancelled" | "pending";
  bookedAt: Date;
}

export interface ICartItem {
  product: Types.ObjectId,
  qty: number,
}

export interface ICart {
  user: Types.ObjectId,
  items: ICartItem[]
}