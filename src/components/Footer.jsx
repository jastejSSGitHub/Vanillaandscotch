import React from 'react';
import './Footer.css';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col brand-col">
                    <h3 className="footer-logo">Vanilla & Scotch</h3>
                    <p className="footer-desc">
                        Handcrafted artisanal desserts, baked with passion and premium ingredients in the heart of Gurgaon.
                    </p>
                    <div className="social-icons">
                        <a href="#" aria-label="Instagram"><FaInstagram /></a>
                        <a href="#" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Online Shop</h4>
                    <ul>
                        <li><a href="/shop/cakes">Cakes</a></li>
                        <li><a href="/shop/desserts">Desserts & small treats</a></li>
                        <li><a href="/shop/chocolates">Breakable chocolates</a></li>
                        <li><a href="/shop/accessories">Cake accessories</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Explore</h4>
                    <ul>
                        <li><a href="/custom-inquiry">Custom Inquiry</a></li>
                        <li><a href="/wedding">Wedding</a></li>
                        <li><a href="/corporate">Corporate</a></li>
                        <li><a href="/gallery">Gallery</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="/about">About Us</a></li>
                        <li><a href="/faqs">FAQs</a></li>
                        <li><a href="/contact">Contact Us</a></li>
                        <li><a href="/terms">Policies</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Vanilla & Scotch. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
