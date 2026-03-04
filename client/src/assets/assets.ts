import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import logoIconLight from "./logo-icon-light.svg";
import logoIconDark from "./logo-icon-dark.svg";
import search from "./search.svg";
import cart from "./shopping-cart.svg";
import arrowRight from "./arrow-small-right.svg";
import menu from "./menu.svg";
import starFilled from "./star-fill.svg";
import star from "./star.svg";
import location from "./map-pin.svg";
import store from "./store.svg";
import phone from "./phone.svg";
import shop from "./shops.png";

export const assets = {
  logoDark,
  logoLight,
  logoIconDark,
  logoIconLight,
  cart,
  search,
  arrowRight,
  menu,
  star,
  starFilled,
  store,
  location,
  phone,
  shop,
};

export const dummyShops = [
  {
    shopId: "1",
    shopName: "Kisan Agro Center",
    ownerName: "Ramesh Patil",
    image:
      "https://images.unsplash.com/photo-1592204854823-934e16967bb5?w=400&auto=format&fit=crop",
    location: "Gokak, Belagavi",
    rating: 4.6,
    isOpen: true,
    phone: "+91 98765 43210",
  },
  {
    shopId: "2",
    shopName: "Green Field Supplies",
    ownerName: "Suresh Kulkarni",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop",
    location: "Belagavi",
    rating: 4.4,
    isOpen: true,
    phone: "+91 91234 56789",
  },
  {
    shopId: "3",
    shopName: "Krishi Bhandar",
    ownerName: "Mahesh Naik",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&auto=format&fit=crop",
    location: "Hubballi",
    rating: 4.2,
    isOpen: false,
    phone: "+91 99887 66554",
  },
  {
    shopId: "4",
    shopName: "Farmer's Choice Store",
    ownerName: "Prakash Desai",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&auto=format&fit=crop",
    location: "Dharwad",
    rating: 4.1,
    isOpen: true,
    phone: "+91 90123 45678",
  },
  {
    shopId: "5",
    shopName: "Soil & Seed Mart",
    ownerName: "Amit Hegde",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop",
    location: "Bengaluru Rural",
    rating: 4.8,
    isOpen: true,
    phone: "+91 98700 11223",
  },
  {
    shopId: "6",
    shopName: "Agri Plus",
    ownerName: "Naveen Kumar",
    image:
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&auto=format&fit=crop",
    location: "Mysuru",
    rating: 4.3,
    isOpen: false,
    phone: "+91 93456 77889",
  },
  {
    shopId: "7",
    shopName: "Rural Krishi Store",
    ownerName: "Vikram Rao",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop",
    location: "Shivamogga",
    rating: 4.5,
    isOpen: true,
    phone: "+91 98876 55443",
  },
  {
    shopId: "8",
    shopName: "Nandini Agro Supplies",
    ownerName: "Kiran Joshi",
    image:
      "https://images.unsplash.com/photo-1560493676-04071185765b?w=400&auto=format&fit=crop",
    location: "Davangere",
    rating: 4.0,
    isOpen: true,
    phone: "+91 97654 33221",
  },
];

export const dummyProducts = [
  {
    _id: 1,
    name: "Urea Fertilizer (50kg)",
    category: "Fertilizer",
    price: 320,
    rating: 4.5,
    quantity: 40,
    shop: {
      shopId: "1",
      shopName: "Kisan Agro Center",
      location: "Gokak, Belagavi",
      phone: 9876543210,
    },
    images: [
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
    ],
    description:
      "High nitrogen content urea fertilizer suitable for all crops. Improves soil fertility and boosts plant growth effectively.",
  },
  {
    _id: 2,
    name: "DAP Fertilizer (50kg)",
    category: "Fertilizer",
    price: 1350,
    rating: 4.7,
    quantity: 0,
    shop: {
      shopId: "2",
      shopName: "Green Field Supplies",
      location: "Belagavi",
      phone: 9123456789,
    },
    images: [
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560493676-04071185765b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop",
    ],
    description:
      "Di-Ammonium Phosphate fertilizer rich in phosphorus and nitrogen. Best for root development and early plant growth.",
  },
  {
    _id: 3,
    name: "Potash (MOP) 50kg",
    category: "Fertilizer",
    price: 920,
    quantity: 25,
    rating: 4.2,
    shop: {
      shopId: "3",
      shopName: "Krishi Bhandar",
      location: "Hubballi",
      phone: 9988766554,
    },
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
    ],
    description:
      "Muriate of Potash improves crop quality, disease resistance, and water regulation in plants. Ideal for sugarcane and vegetables.",
  },
  {
    _id: 4,
    name: "Neem Cake Organic Fertilizer (25kg)",
    category: "Organic",
    price: 450,
    quantity: 60,
    rating: 4.0,
    shop: {
      shopId: "4",
      shopName: "Farmer's Choice Store",
      location: "Dharwad",
      phone: 9012345678,
    },
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop",
    ],
    description:
      "100% organic neem cake acts as both fertilizer and natural pesticide. Safe for soil, crops, and environment.",
  },
  {
    _id: 5,
    name: "NPK 19-19-19 (25kg)",
    category: "Fertilizer",
    price: 1100,
    quantity: 15,
    rating: 4.6,
    shop: {
      shopId: "5",
      shopName: "Soil & Seed Mart",
      location: "Bengaluru Rural",
      phone: 9870011223,
    },
    images: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560493676-04071185765b?w=600&auto=format&fit=crop",
    ],
    description:
      "Balanced NPK water-soluble fertilizer suitable for drip irrigation and foliar spray. Promotes healthy all-round growth.",
  },
  {
    _id: 6,
    name: "Vermicompost (30kg)",
    category: "Organic",
    price: 380,
    quantity: 80,
    rating: 4.4,
    shop: {
      shopId: "6",
      shopName: "Agri Plus",
      location: "Mysuru",
      phone: 9345677889,
    },
    images: [
      "https://images.unsplash.com/photo-1560493676-04071185765b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop",
    ],
    description:
      "Rich organic vermicompost made from earthworm castings. Improves soil texture, moisture retention, and microbial activity.",
  },
  {
    _id: 7,
    name: "SSP Fertilizer (50kg)",
    category: "Fertilizer",
    price: 480,
    quantity: 35,
    rating: 4.1,
    shop: {
      shopId: "7",
      shopName: "Rural Krishi Store",
      location: "Shivamogga",
      phone: 9887655443,
    },
    images: [
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
    ],
    description:
      "Single Super Phosphate fertilizer provides phosphorus and sulphur. Beneficial for oilseeds, pulses, and vegetables.",
  },
  {
    _id: 8,
    name: "Bio Fertilizer Rhizobium (1L)",
    category: "Bio Fertilizer",
    price: 120,
    quantity: 0,
    rating: 4.3,
    shop: {
      shopId: "8",
      shopName: "Nandini Agro Supplies",
      location: "Davangere",
      phone: 9765433221,
    },
    images: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560493676-04071185765b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop",
    ],
    description:
      "Liquid bio-fertilizer containing Rhizobium bacteria for nitrogen fixation in legume crops like groundnut and soybean.",
  },
];
