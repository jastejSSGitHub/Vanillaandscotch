import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiSearch, FiMenu, FiX, FiUser } from 'react-icons/fi';
import './Navbar.css';
import navCake from '../assets/nav-cake.png';
import navDessert from '../assets/nav-dessert.png';
import CartOverlay from './CartOverlay';
import SearchOverlay from './SearchOverlay';

import navAccessories from '../assets/nav-accessories.png';
import navCustom from '../assets/nav-custom.png';
import navWedding from '../assets/nav-wedding.png';
import navCorporate from '../assets/nav-corporate.png';
import AuthOverlay from './AuthOverlay';
import ProfileOverlay from './ProfileOverlay';

const Navbar = ({ cart = [], isCartOpen, setIsCartOpen }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Auth & Profile State
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state

    const location = useLocation();

    const handleUserClick = () => {
        if (isLoggedIn) {
            setIsProfileOpen(true);
        } else {
            setIsAuthOpen(true);
        }
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        setIsAuthOpen(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsProfileOpen(false);
    };

    // Check if link is active
    const isActive = (path) => {
        if (path === '/shop' && location.pathname.startsWith('/product')) {
            return true;
        }
        return location.pathname === path;
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Calculate total items
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
                        <Link to="/">
                            <img src="/images/Logo.png" alt="Vanilla & Scotch Logo" className="nav-logo-img" />
                            <span>Vanilla & Scotch</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="navbar-links">
                        <li><Link to="/" className={isActive('/') ? 'active-link' : ''}>Home</Link></li>
                        <li className="dropdown-parent">
                            <Link to="/shop" className={isActive('/shop') ? 'active-link' : ''}>Online Shop</Link>
                            <div className="dropdown-menu">
                                <Link to="/shop" className="dropdown-item">
                                    <img src={navCake} alt="Cakes" />
                                    <span>Cakes</span>
                                </Link>
                                <Link to="/shop" className="dropdown-item">
                                    <img src={navDessert} alt="Desserts" />
                                    <span>Desserts & small treats</span>
                                </Link>

                                <Link to="/shop" className="dropdown-item">
                                    <img src={navAccessories} alt="Accessories" />
                                    <span>Cake accessories</span>
                                </Link>
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
                        <li><Link to="/gallery">Gallery</Link></li>
                        <li><Link to="/about">About</Link></li>
                    </ul>

                    {/* Icons */}
                    <div className="navbar-icons">
                        <FiSearch size={22} className="icon" onClick={() => setIsSearchOpen(true)} style={{ cursor: 'pointer' }} />
                        <Link to="/shop" className="btn-order-cake desktop-only">Order Cake</Link>
                        <FiUser size={22} className="icon desktop-only" onClick={handleUserClick} style={{ cursor: 'pointer' }} />
                        <div className="cart-icon-wrapper" onClick={() => setIsCartOpen(true)}>
                            <FiShoppingBag size={22} />
                            <span className="cart-count">{cartCount}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <CartOverlay
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cart={cart}
            />
            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
            <AuthOverlay
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
                onLogin={handleLogin}
            />
            <ProfileOverlay
                isOpen={isProfileOpen}
                onClose={() => setIsProfileOpen(false)}
                onLogout={handleLogout}
            />

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-header">
                    <FiX size={32} onClick={() => setMobileMenuOpen(false)} style={{ marginLeft: 'auto' }} />
                </div>

                <div className="mobile-menu-content">
                    <ul className="mobile-links">
                        <li><Link to="/" onClick={() => setMobileMenuOpen(false)} className={isActive('/') ? 'active-link' : ''}>Home</Link></li>
                        <li><Link to="/shop" onClick={() => setMobileMenuOpen(false)} className={isActive('/shop') ? 'active-link' : ''}>Online Shop</Link></li>
                        <li><Link to="/custom-inquiry" onClick={() => setMobileMenuOpen(false)} className={isActive('/custom-inquiry') ? 'active-link' : ''}>Services</Link></li>
                        <li><Link to="/gallery" onClick={() => setMobileMenuOpen(false)} className={isActive('/gallery') ? 'active-link' : ''}>Gallery</Link></li>
                        <li><Link to="/about" onClick={() => setMobileMenuOpen(false)} className={isActive('/about') ? 'active-link' : ''}>About Us</Link></li>
                    </ul>

                    <div className="mobile-menu-footer">
                        <Link to="/shop" className="btn-mobile-cta" onClick={() => setMobileMenuOpen(false)}>
                            Order Your Cake
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
