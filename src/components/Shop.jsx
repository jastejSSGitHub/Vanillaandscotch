import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingBag, FiPlus, FiMinus, FiX, FiFilter, FiTrash2 } from 'react-icons/fi';
import './Shop.css';

// Import assets
import emptyCartImg from '../assets/empty-cart.png';
import cakeImg from '../assets/nav-cake.png';
import dessertImg from '../assets/nav-dessert.png';
import accessoriesImg from '../assets/nav-accessories.png';

// Mock Data
const PRODUCTS = [
    { id: 1, name: "Signature Chocolate Truffle", category: "Cakes", price: 1200, image: cakeImg, description: "Decadent layers of dark chocolate ganache." },
    { id: 2, name: "Vanilla Bean Dream", category: "Cakes", price: 950, image: cakeImg, description: "Light and airy vanilla sponge with buttercream." },
    { id: 3, name: "Red Velvet Elegance", category: "Cakes", price: 1100, image: cakeImg, description: "Classic red velvet with cream cheese frosting." },
    { id: 4, name: "Lemon Meringue Delight", category: "Cakes", price: 1050, image: cakeImg, description: "Zesty lemon curd filled cake." },
    { id: 5, name: "Assorted Macaron Box", category: "Desserts", price: 850, image: dessertImg, description: "12-piece box of premium macarons." },
    { id: 6, name: "Artisan Brownies", category: "Desserts", price: 650, image: dessertImg, description: "Fudgy, rich chocolate brownies." },
    { id: 7, name: "Gold Cake Server", category: "Accessories", price: 1500, image: accessoriesImg, description: "Elegant gold-plated serving set." },
    { id: 8, name: "Celebration Candles", category: "Accessories", price: 450, image: accessoriesImg, description: "Luxury long-burning candles." },
];

const CATEGORIES = ["All", "Cakes", "Desserts", "Accessories"];

const Shop = ({ cart, addToCart, removeFromCart, updateQuantity }) => {
    const [activeCategory, setActiveCategory] = useState("All");
    const [showMobileCart, setShowMobileCart] = useState(false);

    const filteredProducts = activeCategory === "All"
        ? PRODUCTS
        : PRODUCTS.filter(product => product.category === activeCategory);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="shop-page">
            <div className="shop-container">
                {/* Main Content Area */}
                <div className="shop-main">
                    <header className="shop-header">
                        <h1 className="shop-title">Online Shop</h1>
                        <p className="shop-subtitle">Curated confections for every occasion.</p>
                    </header>

                    {/* Filter Chips */}
                    <div className="filter-bar">
                        <div className="filter-chips">
                            {CATEGORIES.map(category => (
                                <button
                                    key={category}
                                    className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <motion.div
                        className="product-grid"
                        layout
                    >
                        <AnimatePresence>
                            {filteredProducts.map(product => {
                                const cartItem = cart.find(item => item.id === product.id);
                                const quantity = cartItem ? cartItem.quantity : 0;

                                return (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className={`product-card ${quantity > 0 ? 'in-cart' : ''}`}
                                    >
                                        <div className="product-image-container">
                                            <img src={product.image} alt={product.name} className="product-image" />
                                            <AnimatePresence>
                                                {!quantity ? (
                                                    <motion.button
                                                        key="add-btn"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="btn-add-quick"
                                                        onClick={() => addToCart(product)}
                                                        layoutId={`action-${product.id}`}
                                                    >
                                                        <FiPlus />
                                                    </motion.button>
                                                ) : (
                                                    <motion.div
                                                        key="controls"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="product-card-controls overlay"
                                                        layoutId={`action-${product.id}`}
                                                    >
                                                        <button
                                                            className="qty-btn delete"
                                                            onClick={() => quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, -1)}
                                                        >
                                                            {quantity === 1 ? <FiTrash2 size={16} /> : <FiMinus size={16} />}
                                                        </button>
                                                        <span className="qty-count">{quantity}</span>
                                                        <button
                                                            className="qty-btn add"
                                                            onClick={() => updateQuantity(product.id, 1)}
                                                        >
                                                            <FiPlus size={16} />
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="product-info">
                                            <h3>{product.name}</h3>
                                            <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Sticky Cart Sidebar */}
                <React.Fragment>
                    {/* Backdrop for mobile */}
                    {showMobileCart && (
                        <div className="mobile-cart-overlay" onClick={() => setShowMobileCart(false)} />
                    )}

                    <aside className={`shop-sidebar ${showMobileCart ? 'mobile-open' : ''}`}>
                        <div className="sticky-cart">
                            <div className="cart-header">
                                <h2>Your Selection</h2>
                                {showMobileCart && (
                                    <button className="mobile-close-btn" onClick={() => setShowMobileCart(false)}>
                                        <FiX size={24} />
                                    </button>
                                )}
                                <span className="cart-count-badge">{cart.reduce((a, b) => a + b.quantity, 0)} items</span>
                            </div>

                            {cart.length === 0 ? (
                                <div className="empty-cart-state">
                                    <img src={emptyCartImg} alt="Empty Cart" className="empty-cart-img" />
                                    <h3>Your basket is empty</h3>
                                    <p>Looks like you haven't made your choice yet. Add some sweetness to your day!</p>
                                </div>
                            ) : (
                                <div className="cart-items-container">
                                    {cart.map(item => (
                                        <div key={item.id} className="cart-item">
                                            <img src={item.image} alt={item.name} className="cart-item-img" />
                                            <div className="cart-item-details">
                                                <h4>{item.name}</h4>
                                                <p>₹{item.price.toLocaleString('en-IN')}</p>
                                                <div className="quantity-controls">
                                                    <button onClick={() => updateQuantity(item.id, -1)}><FiMinus size={12} /></button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)}><FiPlus size={12} /></button>
                                                </div>
                                            </div>
                                            <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                                                <FiX />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {cart.length > 0 && (
                                <div className="cart-footer">
                                    <div className="cart-total">
                                        <span>Total</span>
                                        <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <button className="btn-checkout">
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}
                        </div>
                    </aside>
                </React.Fragment>

                {/* Mobile Cart Toggle Button */}
                {cart.length > 0 && (
                    <button className="mobile-cart-btn" onClick={() => setShowMobileCart(true)}>
                        <FiShoppingBag />
                        <span>{cart.length}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Shop;
