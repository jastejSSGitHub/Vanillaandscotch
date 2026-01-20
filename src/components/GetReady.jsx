import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './GetReady.css';

const GetReady = () => {
    return (
        <section className="get-ready-section">
            <div className="get-ready-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="get-ready-content"
                >
                    {/* Decorative Element */}
                    <div className="get-ready-decoration">
                        <span className="decoration-line"></span>
                        <span className="decoration-dot"></span>
                        <span className="decoration-line"></span>
                    </div>

                    {/* Main Heading */}
                    <h2 className="get-ready-title">
                        Ready to create
                        <span className="get-ready-title-accent"> something extraordinary?</span>
                    </h2>

                    {/* Subheading */}
                    <p className="get-ready-description">
                        From intimate celebrations to grand occasions, let us craft the perfect sweet centerpiece
                        for your special moments. Every creation is a masterpiece, baked with passion and precision.
                    </p>

                    {/* CTA Buttons */}
                    <div className="get-ready-actions">
                        <Link to="/flavors">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="get-ready-btn get-ready-btn-primary"
                            >
                                Explore Flavors
                            </motion.button>
                        </Link>
                        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="get-ready-btn get-ready-btn-secondary"
                            >
                                Order Now
                            </motion.button>
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="get-ready-stats">
                        <div className="stat-item">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Happy Customers</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Handcrafted</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat-item">
                            <span className="stat-number">24h</span>
                            <span className="stat-label">Fresh Guarantee</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Background Decorative Elements */}
            <div className="get-ready-bg-decoration">
                <div className="bg-circle bg-circle-1"></div>
                <div className="bg-circle bg-circle-2"></div>
            </div>
        </section>
    );
};

export default GetReady;
