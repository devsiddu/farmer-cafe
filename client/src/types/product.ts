export interface Product {
  _id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  rating: number;
  shop: {
    shopName: string;
    location: string;
    phone: number;
  };
  images: string[];
  description: string;
}
