import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPackage, FiMapPin, FiCreditCard, FiLogOut, FiDownload, FiChevronRight } from 'react-icons/fi';
import './ProfileOverlay.css';

// Mock Data
const MOCK_ORDERS = [
    {
        id: '#ORD-7829',
        date: 'Oct 24, 2025',
        total: 145.00,
        status: 'Delivered',
        items: [
            { name: 'Vintage Lambeth Cake', price: 95.00, image: '/images/big-image-1.png', quantity: 1 },
            { name: 'Chocolate Ganache Tart', price: 50.00, image: '/images/big-image-3.png', quantity: 2 }
        ]
    },
    {
        id: '#ORD-7810',
        date: 'Sep 12, 2025',
        total: 85.00,
        status: 'Delivered',
        items: [
            { name: 'Bento Cake Custom', price: 85.00, image: '/images/big-image-4.png', quantity: 1 }
        ]
    }
];

const ProfileOverlay = ({ isOpen, onClose, onLogout }) => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [view, setView] = useState('main'); // 'main', 'orders', 'addresses', 'cards'

    const handleOrderClick = (order) => {
        setSelectedOrder(order);
    };

    const handleBack = () => {
        setSelectedOrder(null);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="profile-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="profile-modal"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                        <div className="profile-header">
                            <h2>Profile</h2>
                            <button className="profile-close-btn" onClick={onClose}>
                                <FiX size={18} />
                            </button>
                        </div>

                        <div className="profile-content">
                            {/* User Info Card */}
                            <div className="user-card">
                                <div className="user-avatar">JP</div>
                                <div className="user-details">
                                    <h3>Jane Doe</h3>
                                    <p>jane.doe@example.com</p>
                                </div>
                            </div>

                            {/* Menu Grid */}
                            <div className="profile-menu-grid">
                                <div className="menu-item active">
                                    <FiPackage size={20} />
                                    <span>Orders</span>
                                </div>
                                <div className="menu-item">
                                    <FiMapPin size={20} />
                                    <span>Addresses</span>
                                </div>
                                <div className="menu-item">
                                    <FiCreditCard size={20} />
                                    <span>Payment</span>
                                </div>
                            </div>

                            {/* Recent Orders Section */}
                            <div className="section-title">
                                <h3>Last Orders</h3>
                            </div>

                            <div className="orders-list">
                                {MOCK_ORDERS.length > 0 ? (
                                    MOCK_ORDERS.map(order => (
                                        <div key={order.id} className="order-row" onClick={() => handleOrderClick(order)}>
                                            <div className="order-icon">
                                                <FiPackage />
                                            </div>
                                            <div className="order-info">
                                                <span className="order-id">{order.id}</span>
                                                <span className="order-date">{order.date}</span>
                                            </div>
                                            <div className="order-status completed">{order.status}</div>
                                            <div className="order-total">${order.total.toFixed(2)}</div>
                                            <FiChevronRight className="chevron" />
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <FiPackage size={40} />
                                        <p>No orders yet</p>
                                    </div>
                                )}
                            </div>

                            <button className="logout-btn" onClick={onLogout}>
                                <FiLogOut />
                                <span>Log Out</span>
                            </button>
                        </div>

                        {/* Order Details Overlay (Nested) */}
                        <AnimatePresence>
                            {selectedOrder && (
                                <motion.div
                                    className="order-detail-overlay"
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                >
                                    <div className="detail-header">
                                        <button onClick={handleBack} className="back-btn">
                                            <FiChevronRight style={{ transform: 'rotate(180deg)' }} /> Back
                                        </button>
                                        <h3>Order Details</h3>
                                    </div>

                                    <div className="detail-content">
                                        <div className="detail-summary">
                                            <div className="summary-row">
                                                <span>Order ID</span>
                                                <strong>{selectedOrder.id}</strong>
                                            </div>
                                            <div className="summary-row">
                                                <span>Date</span>
                                                <strong>{selectedOrder.date}</strong>
                                            </div>
                                            <div className="summary-row">
                                                <span>Total</span>
                                                <strong>${selectedOrder.total.toFixed(2)}</strong>
                                            </div>
                                        </div>

                                        <div className="detail-items">
                                            {selectedOrder.items.map((item, idx) => (
                                                <div key={idx} className="detail-item">
                                                    <img src={item.image} alt={item.name} className="item-thumb" />
                                                    <div className="item-info">
                                                        <h4>{item.name}</h4>
                                                        <p>Qty: {item.quantity}</p>
                                                    </div>
                                                    <span className="item-price">${item.price.toFixed(2)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <button className="invoice-btn">
                                            <FiDownload /> Download Invoice
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ProfileOverlay;
