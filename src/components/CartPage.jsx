import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTrash2, FiPlus, FiMinus, FiArrowRight, FiShield, FiTruck, FiRefreshCw } from 'react-icons/fi';
import './CartPage.css';

const CartPage = ({ cart, updateQuantity, removeFromCart }) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 100; // Example shipping logic
    const total = subtotal + shipping;

    // Recommendations - in a real app, these would come from an API
    const recommendations = [
        { id: 'rec1', name: 'Premium Gift Box', price: 250, image: '/images/accessories1.png' },
        { id: 'rec2', name: 'Birthday Candle Set', price: 150, image: '/images/accessories2.png' },
        { id: 'rec3', name: 'Handwritten Note', price: 50, image: '/images/accessories3.png' }
    ];

    if (cart.length === 0) {
        return (
            <div className="cart-page-empty">
                <div className="cart-hero-banner">
                    <h1>This is cart</h1>
                    <p>The search for your dream cake ends here.</p>
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
            {/* Top Banner */}
            <div className="cart-hero-banner">
                <div className="banner-content">
                    <h1>This is cart</h1>
                    <p className="banner-subtitle">The search for your dream cake ends here.</p>
                    <div className="cart-search-bar">
                        <input type="text" placeholder="Search for your next favorite treat..." />
                        <button>Search</button>
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
                                    <img src={item.image} alt={item.name} />
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
                                            <button className="add-rec-btn">Add</button>
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
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" alt="GPay" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo.png/640px-UPI-Logo.png" alt="UPI" />
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" alt="Stripe" />
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
