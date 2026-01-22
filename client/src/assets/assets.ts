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
    location
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
            shopName: "Test Shop",
            location: "Gokak Bustand",
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
            shopName: "Runner's World",
            location: "Belagavi",
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
            shopName: "Urban Store",
            location: "Hubballi",
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
            shopName: "FitZone",
            location: "Dharwad",
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
            shopName: "NB Official Store",
            location: "Bengaluru",
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
