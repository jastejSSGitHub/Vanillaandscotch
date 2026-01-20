import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiX, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import './CartOverlay.css';
import { motion, AnimatePresence } from 'framer-motion';

const CartOverlay = ({ isOpen, onClose, cart }) => {
    const navigate = useNavigate();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleCheckout = () => {
        onClose();
        navigate('/cart');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="cart-overlay-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="cart-overlay-panel"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="cart-overlay-header">
                            <h2>Your Cart ({cartCount})</h2>
                            <button className="close-cart-btn" onClick={onClose}>
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="cart-overlay-content">
                            {cart.length === 0 ? (
                                <div className="empty-overlay">
                                    <FiShoppingBag size={48} />
                                    <p>Your cart is empty</p>
                                    <Link to="/shop" onClick={onClose} className="shop-now-btn">Shop Now</Link>
                                </div>
                            ) : (
                                <div className="cart-items-mini-list">
                                    {cart.map(item => (
                                        <div key={item.id} className="mini-cart-item">
                                            <div className="mini-item-img">
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <div className="mini-item-info">
                                                <h4>{item.name}</h4>
                                                <p>{item.quantity} × ₹{item.price.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cart.length > 0 && (
                            <div className="cart-overlay-footer">
                                <div className="overlay-subtotal">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <button className="overlay-checkout-btn" onClick={handleCheckout}>
                                    Checkout <FiArrowRight />
                                </button>
                                <p className="overlay-footer-note">Shipping calculated at checkout</p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartOverlay;
