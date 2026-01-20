import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header1.css";

const slides = [
    {
        id: 1,
        image: "/images/big-image-1.png",
        video: "/videos/cake1-video.mp4",
        category: "Signature Cakes",
        badgeColor: "#FFEBEE", // Light Red
        textColor: "#B71C1C", // Dark Red
        title: "Exquisite Custom Creations",
        subtitle: "From intricate Lambeth designs to charming Bento cakes.",
        cta: "Order Now",
    },
    {
        id: 2,
        image: "/images/big-image-4.png",
        video: "/videos/cake-video2.mp4",
        category: "Fresh Cream Cakes",
        badgeColor: "#FFF3E0", // Light Orange/Cream
        textColor: "#E65100", // Dark Orange
        title: "Masterpieces for Milestones",
        subtitle: "Turning your special moments into edible art.",
        cta: "Plan Your Party",
    },
    {
        id: 3,
        image: "/images/big-image-3.png",
        video: "/videos/cake3-video.mp4",
        category: "Artisan Cakes",
        badgeColor: "#EFEBE9", // Light Brown
        textColor: "#4E342E", // Dark Brown
        title: "Fudgy, Gooey Perfection",
        subtitle: "The ultimate comfort food, elevated.",
        cta: "Shop Specialty",
    },
];

const Header1 = () => {
    const [current, setCurrent] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        setMousePos({
            x: (clientX - centerX) / 50,
            y: (clientY - centerY) / 50,
        });
    };

    const slideVariants = {
        enter: {
            opacity: 0,
            scale: 1.05,
        },
        center: {
            opacity: 1,
            scale: 1,
        },
        exit: {
            opacity: 0,
            scale: 1.05,
        },
    };

    return (
        <div className="hero-container" onMouseMove={handleMouseMove}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 0.8, ease: "easeInOut" },
                        scale: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="hero-slide"
                >
                    {slides[current].video ? (
                        <motion.video
                            className="hero-video"
                            src={slides[current].video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            animate={{
                                x: mousePos.x,
                                y: mousePos.y,
                            }}
                            transition={{ type: "tween", ease: "linear", duration: 0.2 }}
                        />
                    ) : (
                        <motion.div
                            className="hero-image"
                            style={{
                                backgroundImage: `url(${slides[current].image})`,
                            }}
                            animate={{
                                x: mousePos.x,
                                y: mousePos.y,
                            }}
                            transition={{ type: "tween", ease: "linear", duration: 0.2 }}
                        />
                    )}
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

export default Header1;
