import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './FlavorsPage.css';

// Flavor Data
const chocolateFlavors = [
    { name: "Chocolate raspberry/strawberry", description: "Rich chocolate paired with fresh raspberry and strawberry notes.", image: "/images/flavors/chocolate_raspberry_grid.png" },
    { name: "Chocolate hazelnut", description: "Decadent chocolate with roasted hazelnut crunch.", image: "/images/flavors/chocolate_hazelnut_grid.png" },
    { name: "Chocolate coffee caramel", description: "A bold blend of chocolate, aromatic coffee, and sweet caramel.", image: "/images/flavors/chocolate_coffee_caramel_grid.png" },
    { name: "Chocolate orange", description: "Classic chocolate infused with zesty orange essence.", image: "/images/flavors/chocolate_orange_grid.png" },
    { name: "Chocolate caramel", description: "Smooth chocolate with swirls of golden caramel.", image: "/images/flavors/chocolate_caramel_grid.png" },
    { name: "Chocolate truffle / Belgian chocolate", description: "Luxurious Belgian chocolate truffle filling.", image: "/images/flavors/chocolate_truffle_grid.png" },
    { name: "Nutties flavour", description: "A crunchy and nutty delight for chocolate lovers.", image: "/images/flavors/chocolate_nutties_grid.png" },
    { name: "Black Forest", description: "Classic combination of chocolate, cherries, and cream.", image: "/images/flavors/black_forest_grid.png" },
    { name: "Chocolate Mint", description: "Cool and refreshing mint swirled into dark chocolate.", image: "/images/flavors/chocolate_mint_grid.png" },
    { name: "Double Chocolate", description: "Double the indulgence with dark and milk chocolate layers.", image: "/images/flavors/double_chocolate_grid.png" }
];

const vanillaFlavors = [
    { name: "Vanilla chocolate", description: "Classic vanilla with a rich chocolate twist.", image: "/images/flavors/vanilla_chocolate_grid.png" },
    { name: "Vanilla hazelnut chocolate", description: "Vanilla paired with hazelnut and chocolate.", image: "/images/flavors/vanilla_hazelnut_chocolate_grid.png" },
    { name: "Vanilla coffee caramel", description: "Creamy vanilla with coffee and caramel layers.", image: "/images/hero-2.png" },
    { name: "Vanilla blueberry/raspberry/strawberry", description: "Vanilla infused with a medley of fresh berries.", image: "/src/assets/nav-cake.png" },
    { name: "Vanilla orange", description: "Sweet vanilla with a hint of citrus orange.", image: "/images/hero-1.png" },
    { name: "Vanilla caramel", description: "Smooth vanilla swirled with sweet caramel.", image: "/images/hero-2.png" },
    { name: "Vanilla praline", description: "Vanilla with a crunchy, sweet praline finish.", image: "/images/header-cake-display.png" },
    { name: "Vanilla Bean", description: "Pure, flecked vanilla bean for a classic gourmet taste.", image: "/src/assets/nav-cake.png" },
    { name: "Vanilla Almond", description: "Creamy vanilla with a subtle, sweet almond aroma.", image: "/images/hero-2.png" },
    { name: "Vanilla Coconut", description: "Tropical coconut flakes layered with smooth vanilla.", image: "/src/assets/nav-cake.png" }
];

const FlavorCard = ({ item, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        viewport={{ once: true }}
        className="flavor-card"
    >
        <div
            className="flavor-image-container"
            style={{ backgroundImage: `url(${item.image})` }}
        >
            <div className="flavor-image-overlay"></div>
        </div>
        <div className="flavor-content">
            <h3 className="flavor-name">{item.name}</h3>
            <p className="flavor-description">{item.description}</p>
        </div>
    </motion.div>
);

const FlavorsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flavors-page">
            <section className="flavors-hero">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="flavors-hero-content text-center"
                    >
                        <span className="hero-subtitle">Taste the Magic</span>
                        <h1 className="hero-title">Fillings Guide</h1>
                        <p className="hero-desc">Discover the layers of flavor that make our desserts unforgettable.</p>
                    </motion.div>
                </div>
            </section>

            <div className="container pb-20">
                {/* Chocolate Flavors */}
                <div className="flavor-section">
                    <div className="section-title-wrapper">
                        <h2 className="section-title">Chocolate</h2>
                        <div className="title-line"></div>
                    </div>
                    <div className="flavors-grid">
                        {chocolateFlavors.map((flavor, index) => (
                            <FlavorCard key={index} item={flavor} index={index} />
                        ))}
                    </div>
                </div>

                {/* Vanilla Flavors */}
                <div className="flavor-section mt-24">
                    <div className="section-title-wrapper">
                        <h2 className="section-title">Vanilla</h2>
                        <div className="title-line"></div>
                    </div>
                    <div className="flavors-grid">
                        {vanillaFlavors.map((flavor, index) => (
                            <FlavorCard key={index} item={flavor} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlavorsPage;
