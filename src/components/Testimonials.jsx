import React from 'react';
import './Testimonials.css';

const reviewsRow1 = [
    { text: "Absolute perfection! The Red Velvet was divine.", author: "Sanya M." },
    { text: "Best cupcakes in Gurgaon, hands down.", author: "Rahul K." },
    { text: "My wedding cake was a dream come true.", author: "Priya & Amit" },
    { text: "The brownies are dangerous. I can't stop eating them!", author: "Vikram S." },
    { text: "Elegant, delicious, and delivered on time.", author: "Neha G." }
];

const reviewsRow2 = [
    { text: "Ordered a dessert table for my corporate event. Huge hit!", author: "Tarun, DLF" },
    { text: "Tea cakes that actually taste homemade.", author: "Mrs. Kapoor" },
    { text: "The attention to detail is unmatched.", author: "Anjali D." },
    { text: "Finally, a premium bakery that understands sweetness balance.", author: "Kabir" },
    { text: "Vanilla & Scotch is my go-to for every birthday.", author: "Riya S." }
];

const Testimonials = () => {
    return (
        <section className="testimonials-section">
            <h2 className="testimonials-title">Testimonials</h2>

            <div className="marquee-container">
                {/* Row 1: Left Direction */}
                <div className="marquee-row scroll-left">
                    <div className="marquee-content">
                        {reviewsRow1.map((review, i) => (
                            <div className="review-card" key={i}>
                                <div className="stars">★★★★★</div>
                                <p>"{review.text}"</p>
                                <div className="author-info">
                                    <span>— {review.author}</span>
                                </div>
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {reviewsRow1.map((review, i) => (
                            <div className="review-card" key={`dup-${i}`}>
                                <div className="stars">★★★★★</div>
                                <p>"{review.text}"</p>
                                <div className="author-info">
                                    <span>— {review.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Row 2: Right Direction */}
                <div className="marquee-row scroll-right">
                    <div className="marquee-content">
                        {reviewsRow2.map((review, i) => (
                            <div className="review-card" key={i}>
                                <div className="stars">★★★★★</div>
                                <p>"{review.text}"</p>
                                <div className="author-info">
                                    <span>— {review.author}</span>
                                </div>
                            </div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {reviewsRow2.map((review, i) => (
                            <div className="review-card" key={`dup-${i}`}>
                                <div className="stars">★★★★★</div>
                                <p>"{review.text}"</p>
                                <div className="author-info">
                                    <span>— {review.author}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
