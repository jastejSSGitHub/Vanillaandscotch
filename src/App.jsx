import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Splash from './components/Splash';
import Home from './components/Home';
import FlavorsPage from './components/FlavorsPage';

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
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/flavors" element={<FlavorsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
