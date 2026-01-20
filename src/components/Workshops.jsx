import React from 'react';
import './Workshops.css';
import { motion } from 'framer-motion';

const workshops = [
    {
        id: 1,
        title: "The Art of Buttercream",
        date: "Feb 12 • 2:00 PM",
        image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&q=80&w=800",
        level: "Beginner"
    },
    {
        id: 2,
        title: "Macaron Mastery",
        date: "Feb 24 • 10:00 AM",
        image: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&q=80&w=800",
        level: "Advanced"
    },
    {
        id: 3,
        title: "Gluten-Free Baking",
        date: "Mar 05 • 3:00 PM",
        image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&q=80&w=800",
        level: "All Levels"
    }
];

const Workshops = () => {
    return (
        <section className="workshops-section">
            <div className="container">
                <div className="workshops-header">
                    <motion.div
                        className="section-label"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        LEARN WITH US
                    </motion.div>
                    <motion.h2
                        className="workshops-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        The Masterclass Series
                    </motion.h2>
                    <motion.p
                        className="workshops-description"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        Step into our kitchen and learn the secrets behind the swirl.
                    </motion.p>
                </div>

                <div className="workshops-grid">
                    {workshops.map((workshop, index) => (
                        <motion.div
                            key={workshop.id}
                            className="workshop-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="workshop-image-wrapper">
                                <img src={workshop.image} alt={workshop.title} className="workshop-image" />
                                <div className="workshop-level">{workshop.level}</div>
                            </div>
                            <div className="workshop-info">
                                <span className="workshop-date">{workshop.date}</span>
                                <h3 className="workshop-name">{workshop.title}</h3>
                                <button className="btn-link">Register Now →</button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Workshops;
