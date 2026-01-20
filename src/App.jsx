import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Splash from './components/Splash';
import Home from './components/Home';
import Shop from './components/Shop';
import FlavorsPage from './components/FlavorsPage';
import Gallery from './components/Gallery';

// ScrollToTop component to handle scrolling on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  // Check session storage to see if splash has been shown
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashSeen');
  });

  const handleEnter = () => {
    sessionStorage.setItem('splashSeen', 'true');
    setShowSplash(false);
    // Always navigate to the root homepage when entering from splash
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  };


  // Lock body scroll when splash is active to prevent scrolling behind the overlay
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // Restore scroll
    }
  }, [showSplash]);

  // Cart State
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, change) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + change) };
      }
      return item;
    }));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <AnimatePresence>
          {showSplash && (
            <Splash onEnter={handleEnter} />
          )}
        </AnimatePresence>

        {/* Main website content loads in the background */}
        <div>
          <Navbar cart={cart} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={
                <Shop
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  updateQuantity={updateQuantity}
                />
              } />
              <Route path="/flavors" element={<FlavorsPage />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
