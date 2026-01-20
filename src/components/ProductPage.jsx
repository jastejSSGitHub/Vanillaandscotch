import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus, FiStar, FiChevronDown, FiChevronUp, FiArrowLeft, FiZoomIn } from 'react-icons/fi';
import './ProductPage.css';

// Mock Data for the selected product
const PRODUCT = {
    id: 1,
    name: "Signature Chocolate Truffle",
    category: "Cakes",
    price: 1200,
    rating: 4.9,
    reviewsCount: 128,
    description: "Our Signature Chocolate Truffle cake is a masterpiece of decadence. Layered with rich, 70% dark chocolate ganache and moist cocoa sponge, it's finished with a silky smooth truffle glaze. Perfect for celebrations that demand the very best.",
    flavors: [
        { id: 'classic', name: 'Classic Dark', color: '#1a1a1a' },
        { id: 'hazelnut', name: 'Hazelnut Praline', color: '#4a3728' },
        { id: 'salted-caramel', name: 'Salted Caramel', color: '#c68e17' },
        { id: 'raspberry', name: 'Raspberry Infusion', color: '#8b0000' }
    ],
    images: [
        '/images/Cake 1.png',
        '/images/Cake 2.png',
        '/images/Cake 3.png',
        '/images/Cake 4.png'
    ],
    pairedWith: [
        { id: 5, name: "Assorted Macaron Box", price: 850, image: '/images/Cake 5.png' },
        { id: 6, name: "Artisan Brownies", price: 650, image: '/images/Cake 2.png' },
        { id: 8, name: "Celebration Candles", price: 450, image: '/images/Cake 3.png' }
    ],
    reviews: [
        {
            id: 1,
            author: "Sarah Jenkins",
            rating: 5,
            title: "Absolutely divine!",
            content: "The best chocolate cake I've ever had. It was so moist and the ganache was incredibly rich without being too sweet. Everyone at the party loved it!",
            date: "January 15, 2026"
        },
        {
            id: 2,
            author: "Michael Chen",
            rating: 5,
            title: "Perfect for celebrations",
            content: "Ordered this for my wife's birthday and it was a huge hit. The packaging was also very premium. Highly recommend!",
            date: "January 10, 2026"
        },
        {
            id: 3,
            author: "Emma Thompson",
            rating: 5,
            title: "Texture is everything",
            content: "The layers are so perfect. You can tell they use high-quality ingredients. The hazelnut flavor is a must-try!",
            date: "January 5, 2026"
        },
        {
            id: 4,
            author: "David Wilson",
            rating: 5,
            title: "Top tier quality",
            content: "Quick delivery and the cake arrived in perfect condition. The taste is exactly what you'd expect from a high-end bakery.",
            date: "December 28, 2025"
        },
        {
            id: 5,
            author: "Lisa Rodriguez",
            rating: 5,
            title: "Beautiful and delicious",
            content: "Not only does it look stunning, but it tastes even better. It was the centerpiece of our dinner party.",
            date: "December 20, 2025"
        }
    ]
};

const ProductPage = ({ cart, addToCart, updateQuantity }) => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedFlavor, setSelectedFlavor] = useState(PRODUCT.flavors[0]);
    const [quantity, setQuantity] = useState(1);
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [isZoomed, setIsZoomed] = useState(false);

    const handleAddToCart = () => {
        const productToAdd = {
            ...PRODUCT,
            selectedFlavor: selectedFlavor.name,
            customNote: comment
        };
        // Logic to add to cart (since it's a mock, we just use the prop)
        addToCart(productToAdd);
    };

    return (
        <div className="pdp-page">
            <div className="container pdp-container">
                {/* Breadcrumbs */}
                <nav className="pdp-breadcrumbs">
                    <Link to="/shop"><FiArrowLeft /> Back to Online Shop</Link>
                </nav>

                <div className="pdp-main-content">
                    {/* Left side: Image Gallery */}
                    <div className="pdp-gallery-section">
                        <div className="pdp-main-image-container" onClick={() => setIsZoomed(!isZoomed)}>
                            <motion.img
                                key={selectedImage}
                                src={PRODUCT.images[selectedImage]}
                                alt={PRODUCT.name}
                                className={`pdp-main-image ${isZoomed ? 'zoomed' : ''}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                            />
                            {!isZoomed && <div className="pdp-zoom-hint"><FiZoomIn /> Click to zoom</div>}
                        </div>
                        <div className="pdp-thumbnails">
                            {PRODUCT.images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`pdp-thumbnail ${selectedImage === index ? 'active' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                >
                                    <img src={img} alt={`${PRODUCT.name} view ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side: Product Info */}
                    <div className="pdp-info-section">
                        <header className="pdp-header">
                            <span className="pdp-category">{PRODUCT.category}</span>
                            <h1 className="pdp-title">{PRODUCT.name}</h1>
                            <div className="pdp-rating-summary">
                                <div className="pdp-stars">
                                    {[...Array(5)].map((_, i) => (
                                        <FiStar key={i} fill={i < Math.floor(PRODUCT.rating) ? "var(--color-accent)" : "none"} stroke="var(--color-accent)" size={16} />
                                    ))}
                                </div>
                                <span className="pdp-review-count">({PRODUCT.reviewsCount} reviews)</span>
                            </div>
                            <p className="pdp-price">₹{PRODUCT.price.toLocaleString('en-IN')}</p>
                        </header>

                        <div className="pdp-description">
                            <p>{PRODUCT.description}</p>
                        </div>

                        {/* Flavor Selection */}
                        <div className="pdp-selection-group">
                            <label className="pdp-label">Select Flavor: <span>{selectedFlavor.name}</span></label>
                            <div className="pdp-flavor-swatches">
                                {PRODUCT.flavors.map((flavor) => (
                                    <div
                                        key={flavor.id}
                                        className={`pdp-flavor-swatch-wrapper ${selectedFlavor.id === flavor.id ? 'active' : ''}`}
                                        onMouseEnter={() => setSelectedFlavor(flavor)}
                                    >
                                        <div
                                            className="pdp-flavor-swatch"
                                            style={{ backgroundColor: flavor.color }}
                                        />
                                        <div className="pdp-flavor-tooltip">{flavor.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="pdp-actions">
                            <div className="pdp-quantity-selector">
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><FiMinus /></button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}><FiPlus /></button>
                            </div>
                            <button className="btn btn-primary pdp-add-btn" onClick={handleAddToCart}>
                                Add to Basket
                            </button>
                        </div>

                        {/* Custom Comment Section */}
                        <div className="pdp-collapsible">
                            <button
                                className="pdp-collapsible-trigger"
                                onClick={() => setIsCommentOpen(!isCommentOpen)}
                            >
                                Leave a note for the baker {isCommentOpen ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                            <AnimatePresence>
                                {isCommentOpen && (
                                    <motion.div
                                        className="pdp-collapsible-content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                    >
                                        <textarea
                                            placeholder="Write any special requests, dietary restrictions, or a message for the gift card..."
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Paired Best With Section */}
                <section className="pdp-paired-section">
                    <h2 className="pdp-section-title">Paired best with</h2>
                    <div className="pdp-recommendations-grid">
                        {PRODUCT.pairedWith.map((item) => (
                            <div key={item.id} className="pdp-paired-card">
                                <div className="pdp-paired-img-container">
                                    <img src={item.image} alt={item.name} />
                                </div>
                                <div className="pdp-paired-info">
                                    <h3>{item.name}</h3>
                                    <p>₹{item.price.toLocaleString('en-IN')}</p>
                                    <button className="pdp-paired-add-btn"><FiPlus /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Reviews Section */}
                <section className="pdp-reviews-section">
                    <h2 className="pdp-section-title">Guest Reviews</h2>
                    <div className="pdp-reviews-grid">
                        {PRODUCT.reviews.map((review) => (
                            <div key={review.id} className="pdp-review-card">
                                <div className="pdp-review-header">
                                    <div className="pdp-review-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <FiStar key={i} fill={i < review.rating ? "var(--color-accent)" : "none"} stroke="var(--color-accent)" size={14} />
                                        ))}
                                    </div>
                                    <span className="pdp-review-date">{review.date}</span>
                                </div>
                                <h3 className="pdp-review-title">{review.title}</h3>
                                <p className="pdp-review-content">{review.content}</p>
                                <div className="pdp-review-author">
                                    <div className="pdp-author-avatar">{review.author.charAt(0)}</div>
                                    <span className="pdp-author-name">{review.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProductPage;
