import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShield, FiTruck, FiRefreshCw, FiSearch, FiX } from 'react-icons/fi';
import './CartPage.css';

const CartPage = ({ cart, updateQuantity, removeFromCart, addToCart }) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');

    // Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchRef = useRef(null);

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 100;
    const total = subtotal + shipping;

    // Corrected Recommendations with Valid Images
    const recommendations = [
        { id: 'rec1', name: 'Premium Gift Box', price: 250, image: '/images/Cake 5.png' },
        { id: 'rec2', name: 'Birthday Candle Set', price: 150, image: '/images/Cake 3.png' },
        { id: 'rec3', name: 'Handwritten Note', price: 50, image: '/images/Cake 2.png' }
    ];

    // Mock Search Results
    const allProducts = [
        { id: 101, name: "Signature Chocolate Roll", price: 450, image: "/images/Cake 1.png", category: "Rolls" },
        { id: 102, name: "Velvet Cupcake Box", price: 300, image: "/images/Cake 2.png", category: "Cupcakes" },
        { id: 103, name: "Truffle Pastry", price: 180, image: "/images/Cake 4.png", category: "Pastries" },
        { id: 104, name: "Fruit Tart", price: 220, image: "/images/Cake 5.png", category: "Tarts" }
    ];

    const searchResults = allProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchAdd = (product) => {
        addToCart({ ...product, quantity: 1 });
        setIsSearchOpen(false);
        setSearchQuery('');
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page-empty">
                <div className="cart-hero-banner white-bg">
                    <h1>Your Shopping Bag</h1>
                    <p>Treat yourself to something extraordinary.</p>
                </div>
                <div className="empty-cart-content">
                    <div className="empty-cart-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/shop" className="continue-shopping-btn">Explore Our Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page-container">
            {/* Top Banner - White Background */}
            <div className="cart-hero-banner white-bg">
                <div className="banner-content">
                    <h1>Your Shopping Bag</h1>
                    <p className="banner-subtitle">Treat yourself to something extraordinary.</p>

                    {/* Search with Dropdown */}
                    <div className="cart-search-container" ref={searchRef}>
                        <div className="cart-search-bar">
                            <FiSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search for your next favorite treat..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsSearchOpen(true);
                                }}
                                onFocus={() => setIsSearchOpen(true)}
                            />
                            {searchQuery && (
                                <button className="clear-search" onClick={() => setSearchQuery('')}>
                                    <FiX />
                                </button>
                            )}
                        </div>

                        {/* Search Dropdown Overlay */}
                        {isSearchOpen && searchQuery && (
                            <div className="cart-search-dropdown">
                                {searchResults.length > 0 ? (
                                    searchResults.map(result => (
                                        <div key={result.id} className="search-result-item">
                                            <img src={result.image} alt={result.name} />
                                            <div className="result-info">
                                                <h4>{result.name}</h4>
                                                <p>₹{result.price}</p>
                                            </div>
                                            <button onClick={() => handleSearchAdd(result)}>
                                                Add <FiPlus />
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-results">No treats found matching "{searchQuery}"</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="cart-main-content">
                <div className="cart-items-section">
                    <div className="cart-header-row">
                        <h2>Your Selection ({cart.length})</h2>
                        <Link to="/shop" className="back-to-shop">Continue Shopping</Link>
                    </div>

                    {/* Shipping Progress Bar */}
                    <div className="shipping-progress-container">
                        {subtotal >= 1000 ? (
                            <p className="shipping-goal-met">🎉 You've earned <strong>FREE Shipping!</strong></p>
                        ) : (
                            <p>You're only <strong>₹{(1000 - subtotal).toLocaleString()}</strong> away from FREE Shipping!</p>
                        )}
                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{ width: `${Math.min((subtotal / 1000) * 100, 100)}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="cart-items-list">
                        {cart.map((item) => (
                            <div key={item.id} className="cart-item-card">
                                <div className="item-image-container">
                                    <img src={item.image} alt={item.name} onError={(e) => { e.target.src = '/images/Cake 1.png' }} />
                                </div>
                                <div className="item-details">
                                    <div className="item-info-top">
                                        <h3>{item.name}</h3>
                                        <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                    <p className="item-variant">{item.flavor || 'Standard Flavor'}</p>
                                    <div className="item-controls">
                                        <div className="quantity-selector">
                                            <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                                                <FiMinus size={14} />
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>
                                                <FiPlus size={14} />
                                            </button>
                                        </div>
                                        <span className="item-price">₹{(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recommendations Section */}
                    <div className="recommendations-section">
                        <h3>Would you like to add these?</h3>
                        <div className="recommendations-grid">
                            {recommendations.map(item => (
                                <div key={item.id} className="rec-card">
                                    <div className="rec-img">
                                        <img src={item.image} alt={item.name} />
                                    </div>
                                    <div className="rec-info">
                                        <h4>{item.name}</h4>
                                        <div className="rec-bottom">
                                            <span>₹{item.price}</span>
                                            <button className="add-rec-btn" onClick={() => addToCart({ ...item, quantity: 1 })}>Add</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Order Notes Section */}
                    <div className="cart-order-notes">
                        <h3>Delivery Instructions & Special Requests</h3>
                        <textarea
                            placeholder="Add a message for the baker, dietary requirements, or delivery notes..."
                        ></textarea>
                    </div>
                </div>

                <div className="cart-summary-section">
                    <div className="summary-sticky">
                        <div className="summary-card">
                            <h3>Order Summary</h3>
                            <div className="promo-code-box">
                                <input
                                    type="text"
                                    placeholder="Discount Code"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                />
                                <button>Apply</button>
                            </div>

                            <div className="summary-rows">
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                                </div>
                                <div className="summary-row total-row">
                                    <span>Total</span>
                                    <span>₹{total.toLocaleString()}</span>
                                </div>
                            </div>

                            <button className="checkout-main-btn" onClick={() => alert('Proceeding to Secure Gateway...')}>
                                Proceed to Checkout <FiArrowRight />
                            </button>

                            <div className="payment-trust-section">
                                <p>Secure Payments via</p>
                                <div className="payment-logos">
                                    <img src="https://static.cdnlogo.com/logos/v/31/visa.svg" alt="Visa" />
                                    <img src="https://static.cdnlogo.com/logos/m/17/mastercard.svg" alt="Mastercard" />
                                    <img src="https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/paypal/icon.svg" alt="Paypal" />
                                    <img src="https://static.cdnlogo.com/logos/g/12/google-pay.svg" alt="GPay" />
                                    <img src="https://cdn.jsdelivr.net/gh/callback-io/allogo@main/public/logos/upi/icon.svg" alt="UPI" />
                                    <img src="https://static.cdnlogo.com/logos/s/21/stripe.svg" alt="Stripe" />
                                </div>
                            </div>
                        </div>

                        <div className="cart-features">
                            <div className="feature-item">
                                <FiShield />
                                <div>
                                    <h4>Secure Payment</h4>
                                    <p>100% secure payment gateway</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <FiTruck />
                                <div>
                                    <h4>Fast Delivery</h4>
                                    <p>Handled with love and care</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <FiRefreshCw />
                                <div>
                                    <h4>Easy Returns</h4>
                                    <p>Within 24 hours of delivery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
