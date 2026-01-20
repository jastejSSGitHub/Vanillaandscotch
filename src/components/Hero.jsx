import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Hero.css";

const slides = [
    {
        id: 1,
        image: "/images/header-cake-display.png",
        category: "Signature Cakes",
        badgeColor: "rgba(224, 242, 241, 0.3)", // Soft Mint Glass
        textColor: "#E0F2F1", // Light tint for text to stand out on dark overlay if needed, or stick to white/brand colors. User said "lower opacity background".
        // actually text color was #00695C (dark). If background is glass on a DARK hero image, dark text will be invisible.
        // The hero overlay is dark: background: rgba(0, 0, 0, 0.4);
        // So the badge text needs to be LIGHT.
        // PREVIOUSLY: badgeColor was light (mint), textColor was dark (teal).
        // NOW: badgeColor is transparent mint (darkish due to overlay).
        // If I put dark text on a transparent badge on a dark background, it will be unreadable.
        // I should probably change textColor to White or a light version of the color.
        // Let's set textColor to #FFFFFF for all, or the light version of the color.
        title: "Exquisite Custom Creations",
        subtitle: "From intricate Lambeth designs to charming Bento cakes.",
        cta: "Order Now",
    },
    {
        id: 2,
        image: "/images/hero-2.png",
        category: "Celebration Cakes",
        badgeColor: "rgba(255, 248, 225, 0.3)", // Soft Gold Glass
        textColor: "#FFF8E1", // Light Gold
        title: "Masterpieces for Milestones",
        subtitle: "Turning your special moments into edible art.",
        cta: "Plan Your Party",
    },
    {
        id: 3,
        image: "/images/hero-3.png",
        category: "Brownies",
        badgeColor: "rgba(239, 235, 233, 0.3)", // Soft Cocoa Glass
        textColor: "#EFEBE9", // Light Cocoa
        title: "Fudgy, Gooey Perfection",
        subtitle: "The ultimate comfort food, elevated.",
        cta: "Shop Brownies",
    },
    {
        id: 4,
        image: "/images/header-cake-display.png", // Using the new exquisite display
        category: "Dessert Tables",
        badgeColor: "rgba(252, 228, 236, 0.3)", // Soft Pink Glass
        textColor: "#FCE4EC", // Light Pink
        title: "The Grand Finale",
        subtitle: "Curated dessert spreads for weddings and events.",
        cta: "View Gallery",
    },
    {
        id: 5,
        image: "/images/hero-2.png",
        category: "Cupcakes",
        badgeColor: "rgba(227, 242, 253, 0.3)", // Soft Blue Glass
        textColor: "#E3F2FD", // Light Blue
        title: "Tiny Treats, Big Flavor",
        subtitle: "Perfect swirls of joy in every bite.",
        cta: "Grab a Box",
    },
    {
        id: 6,
        image: "/images/hero-3.png",
        category: "Tea Cakes",
        badgeColor: "rgba(243, 229, 245, 0.3)", // Lavender Glass
        textColor: "#F3E5F5", // Light Lavender
        title: "Afternoon Delight",
        subtitle: "Light, airy, and perfect with your brew.",
        cta: "See Selection",
    },
];

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    return (
        <div className="hero-container">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 },
                    }}
                    className="hero-slide"
                >
                    <div
                        className="hero-image"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                    <div className="hero-overlay"></div>

                    <div className="hero-content">
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="hero-badge"
                            style={{
                                backgroundColor: slides[current].badgeColor,
                                color: slides[current].textColor,
                            }}
                        >
                            {slides[current].category}
                        </motion.div>

                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            {slides[current].title}
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            {slides[current].subtitle}
                        </motion.p>

                        <motion.a
                            href="/shop"
                            className="btn btn-primary hero-btn"
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.9, duration: 0.8 }}
                        >
                            {slides[current].cta}
                        </motion.a>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="hero-indicators">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === current ? "active" : ""}`}
                        onClick={() => {
                            setDirection(index > current ? 1 : -1);
                            setCurrent(index);
                        }}
                    >
                        {index === current && (
                            <motion.div
                                className="indicator-fill"
                                layoutId="indicator-fill"
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 5, ease: "linear" }}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
