import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ServicesPage.css';

// Import assets from src/assets where available, otherwise use public paths
import navCustom from '../assets/nav-custom.png';
import navWedding from '../assets/nav-wedding.png';
import navCorporate from '../assets/nav-corporate.png';
// Using public images for galleries/features
const cakeImages = [
    '/images/header-cake-1.png',
    '/images/header-cake-2.png',
    '/images/header-cake-3.png',
    '/images/header-cake-4.png',
    '/images/header-cake-5.png',
];

const ServicesPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('custom');

    // Sync tab with URL query param
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab && ['custom', 'wedding', 'corporate'].includes(tab)) {
            setActiveTab(tab);
        }
    }, [location]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate(`/services?tab=${tab}`, { replace: true });
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'wedding':
                return <WeddingSection />;
            case 'corporate':
                return <CorporateSection />;
            case 'custom':
            default:
                return <CustomInquirySection />;
        }
    };

    return (
        <div className="services-page">
            <div className="services-header">
                <h1>Our Services</h1>
                <p className="services-subtitle">Exquisite creations for every occasion.</p>

                <div className="segmented-control">
                    <button
                        className={`segment-btn ${activeTab === 'custom' ? 'active' : ''}`}
                        onClick={() => handleTabChange('custom')}
                    >
                        Custom Inquiry
                    </button>
                    <button
                        className={`segment-btn ${activeTab === 'wedding' ? 'active' : ''}`}
                        onClick={() => handleTabChange('wedding')}
                    >
                        Wedding
                    </button>
                    <button
                        className={`segment-btn ${activeTab === 'corporate' ? 'active' : ''}`}
                        onClick={() => handleTabChange('corporate')}
                    >
                        Corporate
                    </button>
                </div>
            </div>

            <div className="services-content-wrapper">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="services-footer-form">
                <ServiceForm type={activeTab} />
            </div>
        </div>
    );
};

const CustomInquirySection = () => (
    <div className="service-section">
        <div className="service-intro">
            <div className="service-text">
                <h2>Custom Inquiry</h2>
                <p className="passion-text">"Every custom cake is a new adventure, a canvas for shared joy."</p>
                <p className="description">
                    Your imagination, our expertise. We specialize in turning your wildest cake dreams into edible reality.
                    Whether it's a birthday milestone, a whimsical baby shower, or a "just because" celebration,
                    we pour our heart into every detail to craft something truly unique for you.
                </p>
            </div>
            <div className="service-image-container">
                <img src={navCustom} alt="Custom Cake" />
            </div>
        </div>

        <div className="service-details">
            <div className="detail-image">
                <img src={cakeImages[0]} alt="Custom Detail" />
            </div>
            <div className="detail-text">
                <h3>Designed for You</h3>
                <p>
                    From the initial sketch to the final crumb, we work closely with you.
                    Choose your flavors, pick your palette, and let us handle the rest.
                    Our custom cakes are not just desserts; they are centerpieces that spark conversation and create memories.
                </p>
            </div>
        </div>
    </div>
);

const WeddingSection = () => (
    <div className="service-section">
        <div className="service-intro">
            <div className="service-image-container small-feature">
                <img src={navWedding} alt="Wedding Cake" />
            </div>
            <div className="service-text centered">
                <h2>Weddings</h2>
                <p className="passion-text">"Love needs to be celebrated with sweetness that matches the occasion."</p>
                <p className="description">
                    Elegant, timeless, and unforgettable. Devlene's wedding cakes are designed to be the crowning jewel of your reception.
                    With years of experience crafting tiered masterpieces, we ensure your cake tastes as breathtaking as it looks.
                </p>
            </div>
        </div>

        <div className="bento-grid">
            <div className="bento-item large"><img src={cakeImages[1]} alt="Wedding 1" /></div>
            <div className="bento-item"><img src={cakeImages[2]} alt="Wedding 2" /></div>
            <div className="bento-item"><img src={cakeImages[3]} alt="Wedding 3" /></div>
            <div className="bento-item wide"><img src="/images/hero-1.png" alt="Wedding 4" /></div>
        </div>
    </div>
);

const CorporateSection = () => (
    <div className="service-section">
        <div className="service-intro">
            <div className="service-text">
                <h2>Corporate Events</h2>
                <p className="passion-text">"Elevate your business events with a touch of artisanal excellence."</p>
                <p className="description">
                    Impress your clients and treat your team with branded delicacies.
                    From logo-embossed cupcakes to grand celebration cakes for milestones,
                    we bring a professional yet personal touch to your corporate gatherings.
                </p>
            </div>
            <div className="service-image-container">
                <img src={navCorporate} alt="Corporate Event" />
            </div>
        </div>
        <div className="service-details reversed">
            <div className="detail-image">
                <img src={cakeImages[4]} alt="Corporate Detail" />
            </div>
            <div className="detail-text">
                <h3>Professional & Delicious</h3>
                <p>
                    We understand the importance of clear communication and timely delivery.
                    Let us handle the sweets so you can focus on the business.
                    Perfect for product launches, holiday parties, and appreciation days.
                </p>
            </div>
        </div>
    </div>
);

const ServiceForm = ({ type }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        message: '',
        callback: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Thank you for your ${type} inquiry! We will contact you soon.`);
        setFormData({ name: '', email: '', phone: '', date: '', message: '', callback: false });
    };

    return (
        <div className="inquiry-form-container">
            <h3>Start Your {type.charAt(0).toUpperCase() + type.slice(1)} Inquiry</h3>
            <form onSubmit={handleSubmit} className="inquiry-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="date"
                        name="date"
                        placeholder="Event Date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group full-width">
                    <textarea
                        name="message"
                        placeholder="Tell us about your event..."
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                    ></textarea>
                </div>
                <div className="form-group full-width checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="callback"
                            checked={formData.callback}
                            onChange={handleChange}
                        />
                        I would like to receive a callback to discuss my inquiry.
                    </label>
                </div>
                <button type="submit" className="submit-btn">Send Inquiry</button>
            </form>
        </div>
    );
};

export default ServicesPage;
