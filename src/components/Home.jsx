import React from 'react';
import Header1 from './Header1';
import Header2 from './Header2';
import ProductGrid from './ProductGrid';
import Testimonials from './Testimonials';
import Workshops from './Workshops';
import InstagramFeed from './InstagramFeed';
import FlavorSelection from './FlavorSelection';
import GetReady from './GetReady';

const Home = () => {
    return (
        <>
            <Header1 />
            <Header2 />
            <ProductGrid />
            <FlavorSelection />
            <Testimonials />
            <Workshops />
            <InstagramFeed />
            <GetReady />
        </>
    );
};

export default Home;
