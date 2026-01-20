import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Splash.css';

const Splash = ({ onEnter }) => {
    const videos = [
        "/videos/Video1.MOV",
        "/videos/Video2.MOV",
        "/videos/Video3.MOV"
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRefs = useRef([]);

    useEffect(() => {
        // Switch video every 1.5 seconds (crowpping at 1.5s)
        const interval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
        }, 1500);

        return () => clearInterval(interval);
    }, [videos.length]);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            if (index === currentVideoIndex) {
                video.currentTime = 0;
                video.play().catch((e) => console.log("Autoplay blocked", e));
            } else {
                video.pause();
            }
        });
    }, [currentVideoIndex]);

    const handleEnter = () => {
        // Trigger the exit
        onEnter();
    };

    return (
        <motion.div
            className="splash-container"
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(10px)",
                transition: {
                    duration: 0.8,
                    ease: "easeInOut"
                }
            }}
        >
            {/* Background Video */}
            {/* Background Videos - Looping Sequence */}
            {videos.map((src, index) => (
                <video
                    key={index}
                    ref={(el) => (videoRefs.current[index] = el)}
                    className={`splash-video-bg ${index === currentVideoIndex ? 'active' : ''}`}
                    muted
                    playsInline
                    preload="auto"
                >
                    <source src={src} type="video/mp4" />
                    <source src={src} type="video/quicktime" />
                    {/* Fallback for MOV/Quicktime if needed, though modern browsers often handle MOV via video/mp4 or specific handlers */}
                </video>
            ))}

            {/* Overlay for readability */}
            <div className="splash-overlay"></div>

            {/* Content */}
            <div className="splash-content">
                <h1 className="splash-logo">Vanilla & Scotch</h1>
                <p className="splash-subtext">
                    The search for your dream cake ends here.
                </p>

                <button
                    className="splash-cta"
                    onClick={handleEnter}
                    aria-label="Enter Website"
                >
                    Enter Experience
                </button>
            </div>
        </motion.div>
    );
};

export default Splash;
