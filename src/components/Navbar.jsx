import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi';
import './Navbar.css';
import navCake from '../assets/nav-cake.png';
import navDessert from '../assets/nav-dessert.png';

import navAccessories from '../assets/nav-accessories.png';
import navCustom from '../assets/nav-custom.png';
import navWedding from '../assets/nav-wedding.png';
import navCorporate from '../assets/nav-corporate.png';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Check if link is active
    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <div className="marquee-container">
                    <div className="marquee-content">
                        {/* Repeated text for seamless looping */}
                        <span>The search for your dream cake ends here. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>The search for your dream cake ends here. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>The search for your dream cake ends here. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>The search for your dream cake ends here. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>The search for your dream cake ends here. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>The search for your dream cake ends here. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>The search for your dream cake ends here. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span>The search for your dream cake ends here. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Mobile Menu Toggle */}
                    <div className="navbar-toggle" onClick={() => setMobileMenuOpen(true)}>
                        <FiMenu size={24} />
                    </div>

                    {/* Logo */}
                    <div className="navbar-logo">
                        <Link to="/">Vanilla & Scotch</Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="navbar-links">
                        <li><Link to="/" className={isActive('/') ? 'active-link' : ''}>Home</Link></li>
                        <li className="dropdown-parent">
                            <a href="/shop">Online Shop</a>
                            <div className="dropdown-menu">
                                <a href="/shop/cakes" className="dropdown-item">
                                    <img src={navCake} alt="Cakes" />
                                    <span>Cakes</span>
                                </a>
                                <a href="/shop/desserts" className="dropdown-item">
                                    <img src={navDessert} alt="Desserts" />
                                    <span>Desserts & small treats</span>
                                </a>

                                <a href="/shop/accessories" className="dropdown-item">
                                    <img src={navAccessories} alt="Accessories" />
                                    <span>Cake accessories</span>
                                </a>
                            </div>
                        </li>
                        <li className="dropdown-parent">
                            <span className="nav-link-span" style={{ cursor: 'pointer' }}>Services</span>
                            <div className="dropdown-menu">
                                <a href="/custom-inquiry" className="dropdown-item">
                                    <img src={navCustom} alt="Custom Inquiry" />
                                    <span>Custom Inquiry</span>
                                </a>
                                <a href="/wedding" className="dropdown-item">
                                    <img src={navWedding} alt="Wedding" />
                                    <span>Wedding</span>
                                </a>
                                <a href="/corporate" className="dropdown-item">
                                    <img src={navCorporate} alt="Corporate" />
                                    <span>Corporate</span>
                                </a>
                            </div>
                        </li>
                        <li><a href="/gallery">Gallery</a></li>
                        <li><a href="/about">About</a></li>
                    </ul>

                    {/* Icons */}
                    <div className="navbar-icons">
                        <FiSearch size={22} className="icon desktop-only" />
                        <a href="/shop" className="btn-order-cake desktop-only">Order Cake</a>
                        <FiUser size={22} className="icon desktop-only" />
                        <div className="cart-icon-wrapper">
                            <FiShoppingBag size={22} />
                            <span className="cart-count">0</span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <span className="mobile-logo">Vanilla & Scotch</span>
                    <FiX size={32} onClick={() => setMobileMenuOpen(false)} />
                </div>

                <div className="mobile-menu-content">
                    <ul className="mobile-links">
                        <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                        <li><a href="/shop" onClick={() => setMobileMenuOpen(false)}>Online Shop</a></li>
                        <li><a href="/custom-inquiry" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
                        <li><a href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a></li>
                        <li><a href="/about" onClick={() => setMobileMenuOpen(false)}>About Us</a></li>
                    </ul>

                    <div className="mobile-menu-footer">
                        <a href="/shop" className="btn-mobile-cta" onClick={() => setMobileMenuOpen(false)}>
                            Order Your Cake
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
