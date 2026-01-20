import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight, FiChevronRight } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import navCake from '../assets/nav-cake.png';
import navChocolate from '../assets/nav-chocolate.png';
import navDessert from '../assets/nav-dessert.png';
import './SearchOverlay.css';

const SMART_CATEGORIES = {
    'chocolate': {
        title: "Chocolate Obsession",
        subtitle: "Rich, decadent, and utterly irresistible.",
        image: navChocolate,
        link: '/shop',
        flavorLink: '/flavors',
        theme: '#5a3d31'
    },
    'vanilla': {
        title: "Classic Vanilla",
        subtitle: "Timeless elegance in every bite.",
        image: navCake,
        link: '/shop',
        flavorLink: '/flavors',
        theme: '#f3e5ab'
    },
    'desserts': {
        title: "Petite Sweet Treats",
        subtitle: "Perfect little bites for any moment.",
        image: navDessert,
        link: '/shop',
        flavorLink: null,
        theme: '#e89fac'
    }
};

const SearchOverlay = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [activeSmartCategory, setActiveSmartCategory] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Slight delay to allow animation to start before focusing
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setSearchTerm(''); // Reset on close
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setResults([]);
            setActiveSmartCategory(null);
            return;
        }

        const lowerTerm = searchTerm.toLowerCase();

        // Check for smart category match
        if (SMART_CATEGORIES[lowerTerm]) {
            setActiveSmartCategory(SMART_CATEGORIES[lowerTerm]);
        } else if (lowerTerm.includes('cake') && !lowerTerm.includes('chocolate')) {
            // Fallback for generic 'cake' to vanilla/cake styling if desired, but let's stick to exact tags for now
            setActiveSmartCategory(null);
        } else {
            setActiveSmartCategory(null);
        }

        const filtered = PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(lowerTerm) ||
            product.category.toLowerCase().includes(lowerTerm) ||
            product.description.toLowerCase().includes(lowerTerm)
        );
        setResults(filtered);
    }, [searchTerm]);

    const handleCategoryClick = (category) => {
        setSearchTerm(category);
    };

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('search-overlay-backdrop')) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="search-overlay-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        className="search-overlay-content"
                        initial={{ y: -20, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: -20, opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="search-header">
                            <FiSearch className="search-icon-large" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <button className="close-search-btn" onClick={onClose}>
                                <FiX />
                            </button>
                        </div>

                        <div className="search-results-container">
                            {!searchTerm && (
                                <div className="search-empty-state">
                                    <div className="empty-illustration-container">
                                        <img src={navCake} alt="Pastry" className="empty-state-img" />
                                        <div className="search-icon-badge">
                                            <FiSearch />
                                        </div>
                                    </div>
                                    <h3>What are you craving?</h3>
                                    <p>Find your dream cake, specific flavors, or explore our dessert collection.</p>
                                    <div className="search-tags">
                                        <span onClick={() => handleCategoryClick('Chocolate')}>Chocolate</span>
                                        <span onClick={() => handleCategoryClick('Vanilla')}>Vanilla</span>
                                        <span onClick={() => handleCategoryClick('Desserts')}>Desserts</span>
                                    </div>
                                </div>
                            )}

                            {activeSmartCategory && (
                                <div className="smart-category-banner">
                                    <div className="smart-banner-content">
                                        <div className="smart-text">
                                            <h4>{activeSmartCategory.title}</h4>
                                            <p>{activeSmartCategory.subtitle}</p>
                                            <div className="smart-actions">
                                                <button onClick={() => { onClose(); navigate('/shop'); }} className="btn-smart-shop">
                                                    Shop Collection
                                                </button>
                                                {activeSmartCategory.flavorLink && (
                                                    <button onClick={() => { onClose(); navigate(activeSmartCategory.flavorLink); }} className="btn-smart-link">
                                                        View Flavors <FiChevronRight />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="smart-image-wrapper">
                                            <img src={activeSmartCategory.image} alt={activeSmartCategory.title} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {searchTerm && results.length === 0 && (
                                <div className="no-results">
                                    <p>No matches found for "{searchTerm}".</p>
                                </div>
                            )}

                            {results.length > 0 && (
                                <div className="results-grid">
                                    {results.map(product => (
                                        <Link
                                            to={`/product/${product.id}`}
                                            key={product.id}
                                            className="search-result-card"
                                            onClick={onClose}
                                        >
                                            <div className="result-image">
                                                <img src={product.image} alt={product.name} />
                                            </div>
                                            <div className="result-info">
                                                <h4>{product.name}</h4>
                                                <p className="result-subtitle">{product.category}</p>
                                                <div className="result-footer">
                                                    <span className="result-price">₹{product.price.toLocaleString('en-IN')}</span>
                                                    <span className="view-link">View <FiArrowRight /></span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchOverlay;
