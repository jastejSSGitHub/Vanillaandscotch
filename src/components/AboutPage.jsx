import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './AboutPage.css';

const AboutPage = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="about-page-container">
            <motion.div
                className="about-hero-card"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
            >
                <div className="about-content-wrapper">
                    <div className="about-text-section">
                        <h5 className="about-subtitle">The Soul Behind the Sweetness</h5>
                        <h1 className="about-title">Baking with <span className="highlight-text">Passion</span> & Heritage.</h1>

                        <div className="about-story-text">
                            <p>
                                Welcome to my world of pastry. I'm Japu, the heart and hands behind every creation you see here.
                                My journey wasn't a straight line to the oven, but looking back, it feels like destiny.
                            </p>
                            <p>
                                I hold a <strong>Bachelor of Art and a Design degree from the National Institute of Fashion Technology (NIFT)</strong> in New Delhi, India.
                                For years, I explored the world of design, texture, and color. But my true calling was whispering to me from my childhood kitchen.
                            </p>
                            <p>
                                My mother was a baker. I grew up in a home that always smelled of vanilla and warm butter.
                                She would bake magnificent cakes for every family gathering, pouring her love into every batter.
                                WATCHING HER WAS MAGIC. I learned that baking isn't just about ingredients; it's about the memories you bake into them.
                            </p>
                            <p>
                                Eventually, I traded my sketchpad for a spatula. I fell deeply in love with the precise, artistic, and delicious world of patisserie.
                                Applying my design background to my baking allow me to create treats that are as beautiful as they are tasty.
                                This isn't just a shop; it's my canvas, and sugar is my medium.
                            </p>
                        </div>

                        <div className="about-baker-signature">
                            - Japu
                        </div>
                    </div>

                    <div className="about-photos-grid">
                        {/* Using placeholders as requested - scanning for faces */}
                        <div className="baker-photo photo-main" style={{ backgroundImage: "url('/images/hero-1.png')" }} title="Our Founder"></div>
                        <div className="baker-photo photo-secondary" style={{ backgroundImage: "url('/images/header-cake-display.png')" }} title="Baking Process"></div>
                        <div className="baker-photo photo-tertiary" style={{ backgroundImage: "url('/images/hero-2.png')" }} title="Inspiration"></div>
                    </div>
                </div>
            </motion.div>

            {/* Social / Instagram Section */}
            <motion.div
                className="social-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
            >
                <h2 className="social-title">Moments & Memories</h2>
                <div className="instagram-grid">
                    <motion.div className="insta-item" variants={fadeIn}>
                        <img src="/images/Cake 1.png" alt="Chocolate Delelith" />
                    </motion.div>
                    <motion.div className="insta-item" variants={fadeIn}>
                        <img src="/images/Cake 2.png" alt="Signature Roll" />
                    </motion.div>
                    <motion.div className="insta-item" variants={fadeIn}>
                        <img src="/images/Cake 3.png" alt="Vanilla Dream" />
                    </motion.div>
                </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
                className="cta-section"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2 className="cta-text">"Reader, it's people who do online shops"</h2>
                <p style={{ marginBottom: '30px', fontSize: '1.2rem', color: '#666' }}>
                    Experience the difference of a bakery built on passion.
                </p>
                <Link to="/shop" className="shop-cta-btn">
                    Explore the Menu
                </Link>
            </motion.div>
        </div>
    );
};

export default AboutPage;
