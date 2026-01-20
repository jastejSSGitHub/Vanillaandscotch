import React from 'react';
import './ProductGrid.css';

const products = [
    {
        id: 1,
        name: "Classic Red Velvet",
        price: "₹1,299",
        image: "/images/hero-1.png",
        tag: "Best Seller"
    },
    {
        id: 2,
        name: "Truffle Indulgence",
        price: "₹1,499",
        image: "/images/hero-2.png",
        tag: "New"
    },
    {
        id: 3,
        name: "Vanilla Bean Dream",
        price: "₹1,199",
        image: "/images/hero-3.png",
        tag: "Classic"
    },
    {
        id: 4,
        name: "Pink Champagne",
        price: "₹1,699",
        image: "/images/hero-1.png", // Reusing for placeholder
        tag: "Wedding Favorite"
    },
    {
        id: 5,
        name: "Hazelnut Praline",
        price: "₹1,599",
        image: "/images/hero-2.png",
        tag: "Premium"
    },
    {
        id: 6,
        name: "Lemon & Elderflower",
        price: "₹1,399",
        image: "/images/hero-3.png",
        tag: "Seasonal"
    }
];

const ProductGrid = () => {
    return (
        <section className="product-section">
            <div className="container">
                <div className="section-header text-center mb-2">
                    <span className="overline">R-Creations</span>
                    <h2>Customer Favorites</h2>
                </div>
            </div>

            <div className="product-marquee-container">
                <div className="product-marquee-content">
                    {/* Two distinct tracks for seamless looping */}
                    <div className="product-marquee-track">
                        {products.map((product) => (
                            <div key={`original-${product.id}`} className="product-card">
                                <div className="product-image-wrapper">
                                    {product.tag && <span className="product-tag">{product.tag}</span>}
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-overlay">
                                        <button className="btn btn-primary add-to-cart">Add to Cart</button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <span className="price">{product.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="product-marquee-track">
                        {products.map((product) => (
                            <div key={`duplicate-${product.id}`} className="product-card">
                                <div className="product-image-wrapper">
                                    {product.tag && <span className="product-tag">{product.tag}</span>}
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-overlay">
                                        <button className="btn btn-primary add-to-cart">Add to Cart</button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <span className="price">{product.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="text-center mt-2">
                    <a href="/shop" className="btn btn-primary">View All Cakes</a>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
