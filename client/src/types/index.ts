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
