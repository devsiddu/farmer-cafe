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
import type { OrderType, ProductType, ShopType, UserType } from "../types";

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

export const dummyShops: ShopType[] = [
  {
    _id: "698198hdweh343c913f84d13f4",
    shopName: "Kisan Agro Center",
    ownerId: "69819801a343c913f84d13f4",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop",
    location: "Gokak, Belagavi",
    rating: 4.6,
    isOpen: true,
    status: "approved",
    phone: "9876543210",
    deletedAt: null,
    isDeleted: false,
  },
  {
    _id: "698198hdweh343c913f84d13fd",
    shopName: "Green Field Supplies",
    ownerId: "69819801a343c913f84d13f4",
    image:
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&auto=format&fit=crop",
    location: "Belagavi",
    rating: 4.4,
    isOpen: true,
    status: "approved",
    phone: "9123456789",
    deletedAt: null,
    isDeleted: false,
  },
  {
    _id: "698198hdweheww3c913f84d13f4",
    shopName: "Krishi Bhandar",
    ownerId: "69819801a872c913f84d13f4",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&auto=format&fit=crop",
    location: "Hubballi",
    rating: 4.2,
    isOpen: false,
    status: "pending",
    phone: "9988766554",
    deletedAt: null,
    isDeleted: false,
  },
  {
    _id: "4d54f5s4s545f544w45f45e",
    shopName: "Farmer's Choice Store",
    ownerId: "69819801a872c913f84d13f4",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&auto=format&fit=crop",
    location: "Dharwad",
    rating: 4.1,
    isOpen: true,
    status: "approved",
    phone: "9012345678",
    deletedAt: null,
    isDeleted: false,
  },
  {
    _id: "645545fg5t56y6y677u77uu7",
    shopName: "Soil & Seed Mart",
    ownerId: "69819801a343c913f84d13f4",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&auto=format&fit=crop",
    location: "Bengaluru Rural",
    rating: 4.8,
    isOpen: true,
    status: "rejected",
    phone: "9870011223",
    deletedAt: null,
    isDeleted: false,
  },
  {
    _id: "6dgu3e73g7363f35r63f63",
    shopName: "Agri Plus",
    ownerId: "69819801a872c913f84d13f1",
    image:
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&auto=format&fit=crop",
    location: "Mysuru",
    rating: 4.3,
    isOpen: false,
    status: "approved",
    phone: "9345677889",
    deletedAt: null,
    isDeleted: false,
  },
  {
    _id: "6vyd73yh7dy73h7d3t7",
    shopName: "Rural Krishi Store",
    ownerId: "69819801a343c913f84d13f4",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&auto=format&fit=crop",
    location: "Shivamogga",
    rating: 4.5,
    isOpen: true,
    status: "approved",
    phone: "9887655443",
    deletedAt: null,
    isDeleted: false,
  },
  {
    _id: "87378y7y7e3yndy73ye7",
    shopName: "Nandini Agro Supplies",
    ownerId: "69819801a872c913f84d13f1",
    image:
      "https://images.unsplash.com/photo-1560493676-04071185765b?w=400&auto=format&fit=crop",
    location: "Davangere",
    rating: 4.0,
    isOpen: true,
    status: "approved",
    phone: "9765433221",
    deletedAt: null,
    isDeleted: false,
  },
];

export const dummyProducts: ProductType[] = [
  {
    _id: "698198hdweh343c913f84hyer6",
    name: "Urea Fertilizer (50kg)",
    category: "Fertilizer",
    price: 320,
    rating: 4.5,
    quantity: 40,
    shopId: "698198hdweh343c913f84d13f4",
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
    _id: '698198hdweh343c913fi337',
    name: "DAP Fertilizer (50kg)",
    category: "Fertilizer",
    price: 1350,
    rating: 4.7,
    quantity: 0,
    shopId: "698198hdweh343c913f84d13f4",

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
    _id: '73673huye7yh73y7',
    name: "Potash (MOP) 50kg",
    category: "Fertilizer",
    price: 920,
    quantity: 25,
    rating: 4.2,
    shopId: "698198hdweh343c913f84d13f4",

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
    _id: "j7d3yy27887ye73y7y7",
    name: "Neem Cake Organic Fertilizer (25kg)",
    category: "Organic",
    price: 450,
    quantity: 60,
    rating: 4.0,
    shopId: "698198hdweh343c913f84d13f4",

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
    _id: "88738uhed6736t6e36t",
    name: "NPK 19-19-19 (25kg)",
    category: "Fertilizer",
    price: 1100,
    quantity: 15,
    rating: 4.6,
    shopId: "698198hdweh343c913f84d13f4",

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
    _id: "7y3h7ey7hd73h7d3y7",
    name: "Vermicompost (30kg)",
    category: "Organic",
    price: 380,
    quantity: 80,
    rating: 4.4,
    shopId: "698198hdweh343c913f84d13f4",

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
    _id: "uye73676376723e",
    name: "SSP Fertilizer (50kg)",
    category: "Fertilizer",
    price: 480,
    quantity: 35,
    rating: 4.1,
    shopId: "698198hdweh343c913f84d13f4",

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
    _id: "7y37y7ey37736762",
    name: "Bio Fertilizer Rhizobium (1L)",
    category: "Bio Fertilizer",
    price: 120,
    quantity: 0,
    rating: 4.3,
    shopId: "698198hdweh343c913f84d13f4",

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


export const dummyUsers: UserType[] = [
  {
    _id: "69819801a872c913f84d13f1",
    firstName: "Arjun",
    lastName: "Sharma",
    email: "arjun.sharma@gmail.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Arjun",
    role: "shop",
    password: "test",
    phone: "9876543210",
    isBlocked: false,
    location: "Bengaluru, Karnataka",
    createdAt: "2024-01-15",
  },
  {
    _id: "69819801a872c913f84d13f2",
    firstName: "Priya",
    lastName: "Nair",
    email: "priya.nair@gmail.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Priya",
    role: "user",
    password: "test",
    phone: "9123456789",
    isBlocked: false,
    location: "Kochi, Kerala",
    createdAt: "2024-02-20",
  },
  {
    _id: "69819801a872c913f84d13f3",
    firstName: "Ravi",
    lastName: "Kumar",
    email: "ravi.kumar@yahoo.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Ravi",
    role: "user",
    password: "test",
    phone: "8765432109",
    isBlocked: true,
    location: "Chennai, Tamil Nadu",
    createdAt: "2024-03-05",
  },
  {
    _id: "69819801a872c913f84d13f4",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240",
    role: "shop",
    password: "test",
    phone: "1234567890",
    isBlocked: false,
    location: "Mumbai, Maharashtra",
    createdAt: "2024-03-18",
  },
  {
    _id: "69819801a343c913f84d13f4",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=240",
    role: "shop",
    password: "test",
    phone: "1234567890",
    isBlocked: false,
    location: "Mumbai, Maharashtra",
    createdAt: "2024-03-18",
  },
  {
    _id: "69819801a872c913f84d13f5",
    firstName: "Mohammed",
    lastName: "Irfan",
    email: "irfan.m@outlook.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Irfan",
    role: "user",
    password: "test",
    phone: "9345678901",
    isBlocked: false,
    location: "Hyderabad, Telangana",
    createdAt: "2024-04-02",
  },
  {
    _id: "69819801a872c913f84d13f6",
    firstName: "Deepa",
    lastName: "Reddy",
    email: "deepa.reddy@gmail.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Deepa",
    role: "user",
    password: "test",
    phone: "9632154870",
    isBlocked: false,
    location: "Vijayawada, Andhra Pradesh",
    createdAt: "2024-04-14",
  },
  {
    _id: "69819801a872c913f84d13f7",
    firstName: "Vikram",
    lastName: "Singh",
    email: "vikram.singh@gmail.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Vikram",
    role: "user",
    password: "test",
    phone: "8800123456",
    isBlocked: true,
    location: "Jaipur, Rajasthan",
    createdAt: "2024-05-01",
  },
  {
    _id: "69819801a872c913f84d13f8",
    firstName: "Anita",
    lastName: "Desai",
    email: "anita.desai@gmail.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Anita",
    role: "user",
    password: "test",
    phone: "9753124680",
    isBlocked: false,
    location: "Surat, Gujarat",
    createdAt: "2024-05-22",
  },
  {
    _id: "69819801a872c913f84d13f9",
    firstName: "Karthik",
    lastName: "Menon",
    email: "karthik.menon@gmail.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Karthik",
    role: "user",
    password: "test",
    phone: "9440011223",
    isBlocked: false,
    location: "Kozhikode, Kerala",
    createdAt: "2024-06-10",
  },
  {
    _id: "69819801a872c913f84d13fa",
    firstName: "Pooja",
    lastName: "Iyer",
    email: "pooja.iyer@gmail.com",
    imageUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=Pooja",
    role: "admin",
    password: "test",
    phone: "9110022334",
    isBlocked: false,
    location: "Coimbatore, Tamil Nadu",
    createdAt: "2024-06-28",
  },
];

export const dummyBookings: OrderType[] = [
  {
    _id: "4er4578er7845w4",
    product: {
      _id: '73673huye7yh73y7',
      name: "Potash (MOP) 50kg",
      category: "Fertilizer",
      price: 920,
      quantity: 25,
      rating: 4.2,
      shopId: "698198hdweh343c913f84d13f4",
      images: [
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
      ],
      description:
        "Muriate of Potash improves crop quality, disease resistance, and water regulation in plants. Ideal for sugarcane and vegetables.",
    },
    qty: 2,
    status: "confirmed",
    bookedAt: new Date(),
  },
  {
    _id: "54r78ew845ws",
    product: {
      _id: "698198hdweh343c913f84hyer6",
      name: "Urea Fertilizer (50kg)",
      category: "Fertilizer",
      price: 320,
      rating: 4.5,
      quantity: 40,
      shopId: "698198hdweh343c913f84d13f4",
      images: [
        "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
      ],
      description:
        "High nitrogen content urea fertilizer suitable for all crops. Improves soil fertility and boosts plant growth effectively.",
    },
    qty: 3,
    status: "cancelled",
    bookedAt: new Date(),
  },
  {
    _id: "485e78w7rwe",
    product: {
      _id: "88738uhed6736t6e36t",
      name: "NPK 19-19-19 (25kg)",
      category: "Fertilizer",
      price: 1100,
      quantity: 15,
      rating: 4.6,
      shopId: "698198hdweh343c913f84d13f4",
      images: [
        "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1560493676-04071185765b?w=600&auto=format&fit=crop",
      ],
      description:
        "Balanced NPK water-soluble fertilizer suitable for drip irrigation and foliar spray. Promotes healthy all-round growth.",
    },
    qty: 5,
    status: "pending",
    bookedAt: new Date(),
  }
]