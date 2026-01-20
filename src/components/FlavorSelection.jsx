import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './FlavorSelection.css';
import navCustom from '../assets/nav-custom.png';

const FlavorSelection = () => {
    return (
        <section className="flavor-selection-wrap">
            <div className="flavor-container">
                <div className="flavor-content-grid">

                    {/* Image Container - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flavor-image-container"
                    >
                        <div className="flavor-image-wrapper">
                            <img
                                src={navCustom}
                                alt="Signature Cake Collection"
                                className="flavor-image"
                            />
                        </div>
                    </motion.div>

                    {/* Text Group - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="flavor-text-container"
                    >
                        <div className="flavor-text-content">
                            <span className="flavor-subtitle">
                                <span className="flavor-subtitle-line"></span>
                                The batch
                            </span>

                            <h2 className="flavor-title">
                                Tailor to taste <br />
                                <span className="flavor-title-italic">and choose flavour</span>
                            </h2>

                            <p className="flavor-description">
                                Personalize your sweet experience with our handcrafted signature flavors, curated specifically for the refined palette.
                            </p>

                            <Link to="/flavors">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flavor-cta-button"
                                >
                                    Choose Flavor
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default FlavorSelection;
