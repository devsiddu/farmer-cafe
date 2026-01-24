import logoDark from './logo-dark.svg'
import logoLight from './logo-light.svg'
import logoIconLight from './logo-icon-light.svg'
import logoIconDark from './logo-icon-dark.svg'
import search from './search.svg'
import cart from './shopping-cart.svg'
import arrowRight from './arrow-small-right.svg'
import menu from './menu.svg'
import starFilled from './star-fill.svg'
import star from './star.svg'
import location from './map-pin.svg'
import store from './store.svg'
import phone from './phone.svg'
import shop from './shops.png'

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
}

export const dummyProducts = [
    {
        _id: 12121,
        name: "Nike Pegasus 41 Shoes",
        category: "Sports",
        price: 189,
        rating: 4.5,
        quantity: 4,
        shop: {
            shopId: '1',
            shopName: "Test Shop",
            location: "Gokak Bustand",
            phone: 1234567890,
        },
        images: [
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        ],
        description:
            "High-quality material, available in different sizes. Comfortable for everyday use.",
    },
    {
        _id: 12122,
        name: "Adidas Ultraboost 23",
        category: "Sports",
        price: 219,
        quantity: 0,
        rating: 4.7,
        shop: {
            shopId: '1',
            shopName: "Runner's World",
            location: "Belagavi",
            phone: 1234567890,
        },
        images: [
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        ],
        description:
            "Lightweight running shoes with responsive cushioning for long-distance comfort.",
    },
    {
        _id: 12123,
        name: "Puma RS-X Sneakers",
        category: "Casual",
        price: 159,
        quantity: 20,
        rating: 4.2,
        shop: {
            shopId: '1',
            shopName: "Urban Store",
            location: "Hubballi",
            phone: 1234567890,
        },
        images: [
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        ],
        description:
            "Stylish everyday sneakers with durable build and modern design.",
    },
    {
        _id: 12124,
        name: "Reebok Flexagon Training Shoes",
        category: "Training",
        price: 139,
        quantity: 101,
        rating: 4.0,
        shop: {
            shopId: '1',
            shopName: "FitZone",
            location: "Dharwad",
            phone: 1234567890,
        },
        images: [
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
        ],
        description:
            "Flexible training shoes designed for gym workouts and cross training.",
    },
    {
        _id: 12125,
        name: "New Balance Fresh Foam X",
        category: "Running",
        price: 199,
        quantity: 10,
        rating: 4.6,
        shop: {
            shopId: '1',
            shopName: "NB Official Store",
            location: "Bengaluru",
            phone: 1234567890,
        },
        images: [
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
            "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        ],
        description:
            "Premium running shoes with plush cushioning and breathable mesh upper.",
    },
];

export const dummyShops = [
    {
        shopId: '1',
        shopName: "Urban Sports Hub",
        ownerName: "Ramesh Patil",
        location: "Gokak",
        rating: 4.6,
        isOpen: true,
        phone: "+91 98765 43210",
    },
    {
        shopId: '2',
        shopName: "Runner's World",
        ownerName: "Suresh Kulkarni",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Belagavi",
        rating: 4.4,
        isOpen: true,
        phone: "+91 91234 56789",
    },
    {
        shopId: '3',
        shopName: "FitZone Store",
        ownerName: "Mahesh Naik",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Hubballi",
        rating: 4.2,
        isOpen: false,
        phone: "+91 99887 66554",
    },
    {
        shopId: '4',
        shopName: "Active Life",
        ownerName: "Prakash Desai",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Dharwad",
        rating: 4.1,
        isOpen: true,
        phone: "+91 90123 45678",
    },
    {
        shopId: '5',
        shopName: "Sneaker Point",
        ownerName: "Amit Shah",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Bengaluru",
        rating: 4.8,
        isOpen: true,
        phone: "+91 98700 11223",
    },
    {
        shopId: '6',
        shopName: "Gym Pro Shop",
        ownerName: "Naveen Kumar",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Mysuru",
        rating: 4.3,
        isOpen: false,
        phone: "+91 93456 77889",
    },
    {
        shopId: '7',
        shopName: "Outdoor Adventures",
        ownerName: "Vikram Rao",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Shivamogga",
        rating: 4.5,
        isOpen: true,
        phone: "+91 98876 55443",
    },
    {
        shopId: '8',
        shopName: "Elite Sports Store",
        ownerName: "Kiran Joshi",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Davangere",
        rating: 4.0,
        isOpen: true,
        phone: "+91 97654 33221",
    },
    {
        shopId: '9',
        shopName: "PowerFit Supplies",
        ownerName: "Rohit Mehta",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Ballari",
        rating: 4.7,
        isOpen: false,
        phone: "+91 98989 12345",
    },
    {
        shopId: '10',
        shopName: "Daily Active Store",
        ownerName: "Sunil Hegde",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
        location: "Udupi",
        rating: 4.2,
        isOpen: true,
        phone: "+91 95544 66778",
    },
];
