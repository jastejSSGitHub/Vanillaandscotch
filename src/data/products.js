import cakeImg from '../assets/nav-cake.png';
import dessertImg from '../assets/nav-dessert.png';
import accessoriesImg from '../assets/nav-accessories.png';

export const PRODUCTS = [
    { id: 1, name: "Signature Chocolate Truffle", category: "Cakes", price: 1200, image: cakeImg, description: "Decadent layers of dark chocolate ganache." },
    { id: 2, name: "Vanilla Bean Dream", category: "Cakes", price: 950, image: cakeImg, description: "Light and airy vanilla sponge with buttercream." },
    { id: 3, name: "Red Velvet Elegance", category: "Cakes", price: 1100, image: cakeImg, description: "Classic red velvet with cream cheese frosting." },
    { id: 4, name: "Lemon Meringue Delight", category: "Cakes", price: 1050, image: cakeImg, description: "Zesty lemon curd filled cake." },
    { id: 5, name: "Assorted Macaron Box", category: "Desserts", price: 850, image: dessertImg, description: "12-piece box of premium macarons." },
    { id: 6, name: "Artisan Brownies", category: "Desserts", price: 650, image: dessertImg, description: "Fudgy, rich chocolate brownies." },
    { id: 7, name: "Gold Cake Server", category: "Accessories", price: 1500, image: accessoriesImg, description: "Elegant gold-plated serving set." },
    { id: 8, name: "Celebration Candles", category: "Accessories", price: 450, image: accessoriesImg, description: "Luxury long-burning candles." },
];

export const CATEGORIES = ["All", "Cakes", "Desserts", "Accessories"];
