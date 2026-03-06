export interface IShop {
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

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  rating: number;
  shopId: string;
  shop?: {
    shopName: string;
    location: string;
    phone: number;
  };
  images: string[];
  description: string;
}

export interface IUser {
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
  product: IProduct;
  qty: number;
  status: "confirmed" | "cancelled" | "pending";
  bookedAt: Date;
}
