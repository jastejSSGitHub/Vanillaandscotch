import React from 'react';
import Hero from './Hero';
import ProductGrid from './ProductGrid';
import Testimonials from './Testimonials';
import Workshops from './Workshops';
import InstagramFeed from './InstagramFeed';
import FlavorSelection from './FlavorSelection';

const Home = () => {
    return (
        <>
            <Hero />
            <ProductGrid />
            <FlavorSelection />
            <Testimonials />
            <Workshops />
            <InstagramFeed />
        </>
    );
};

export default Home;
