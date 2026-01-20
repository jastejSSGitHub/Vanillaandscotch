import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header2.css";


const slides = [
    {
        id: 1,
        category: "Signature Cakes",
        badgeColor: "#E0F2F1",
        badgeTextColor: "#004D40",
        title: "Exquisite Custom Creations",
        titleGradient: "linear-gradient(135deg, #1A237E 0%, #4A148C 100%)",
        subtitle: "From intricate Lambeth designs to charming Bento cakes.",
        cta: "Order Now",
        image: "/images/Cake%201.png"
    },
    {
        id: 2,
        category: "Celebration Cakes",
        badgeColor: "#FFF8E1",
        badgeTextColor: "#BF360C",
        title: "Masterpieces for Milestones",
        titleGradient: "linear-gradient(135deg, #BF360C 0%, #880E4F 100%)",
        subtitle: "Turning your special moments into edible art.",
        cta: "Plan Your Party",
        image: "/images/Cake%202.png"
    },
    {
        id: 3,
        category: "Brownies & Chocolates",
        badgeColor: "#EFEBE9",
        badgeTextColor: "#3E2723",
        title: "Fudgy, Gooey Perfection",
        titleGradient: "linear-gradient(135deg, #3E2723 0%, #5D4037 100%)",
        subtitle: "The ultimate comfort food, elevated.",
        cta: "Shop Chocolate",
        image: "/images/Cake%203.png"
    },
    {
        id: 4,
        category: "Dessert Tables",
        badgeColor: "#FCE4EC",
        badgeTextColor: "#880E4F",
        title: "The Grand Finale",
        titleGradient: "linear-gradient(135deg, #880E4F 0%, #4A148C 100%)",
        subtitle: "Curated dessert spreads for weddings and events.",
        cta: "View Gallery",
        image: "/images/Cake%204.png"
    },
    {
        id: 5,
        category: "Custom Orders",
        badgeColor: "#E3F2FD",
        badgeTextColor: "#0D47A1",
        title: "Tailored to Your Taste",
        titleGradient: "linear-gradient(135deg, #0D47A1 0%, #006064 100%)",
        subtitle: "Make your vision a delicious reality.",
        cta: "Start Custom Order",
        image: "/images/Cake%205.png"
    },
];

const Header2 = () => {
    const [current, setCurrent] = useState(0);
    // Mouse move effect for parallax
    // We can use framer-motion's useMouseMove if we want, or just basic onMouseMove
    // Let's use basic onMouseMove state for simplicity and granular control
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleMouseMove = (e) => {
        // Calculate normalized mouse position from center
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Value between -1 and 1
        const x = (clientX - centerX) / centerX;
        const y = (clientY - centerY) / centerY;

        setMousePos({ x, y });
    };

    const textVariants = {
        enter: { opacity: 0, y: 20 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="hero-variant-container" onMouseMove={handleMouseMove}>
            <div className="hero-variant-content">
                <div className="hero-variant-left">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={textVariants}
                            transition={{ duration: 0.5 }}
                            className="hero-text-wrapper"
                        >
                            <span
                                className="hero-variant-badge"
                                style={{
                                    backgroundColor: slides[current].badgeColor,
                                    color: slides[current].badgeTextColor
                                }}
                            >
                                {slides[current].category}
                            </span>
                            <h1>{slides[current].title}</h1>
                            <p>{slides[current].subtitle}</p>
                            <a href="/shop" className="hero-variant-cta">
                                {slides[current].cta}
                            </a>
                        </motion.div>
                    </AnimatePresence>

                    <div className="hero-variant-indicators">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`variant-indicator ${index === current ? "active" : ""}`}
                                onClick={() => setCurrent(index)}
                            />
                        ))}
                    </div>
                </div>

                <div className="hero-variant-right">
                    {/* Parallax Background Blob/Circle */}
                    <motion.div
                        className="hero-blob"
                        animate={{
                            x: -mousePos.x * 30,
                            y: -mousePos.y * 30,
                        }}
                        transition={{ type: "spring", damping: 30, stiffness: 200 }}
                    />

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                x: -mousePos.x * 20, // Add parallax x
                                y: -mousePos.y * 20  // Add parallax y
                            }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="hero-image-wrapper"
                        >
                            <motion.img
                                src={slides[current].image}
                                alt={slides[current].title}
                                className="hero-variant-image"
                                animate={{
                                    y: [0, -15, 0] // Floating effect
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Header2;
