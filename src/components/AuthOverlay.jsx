import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaFacebookF, FaInstagram } from 'react-icons/fa';
import './AuthOverlay.css';

const AuthOverlay = ({ isOpen, onClose, onLogin }) => {
    const [mode, setMode] = useState('login'); // 'login' or 'signup'

    // Reset mode on open
    React.useEffect(() => {
        if (isOpen) setMode('login');
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login
        onLogin();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="auth-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="auth-modal-wrapper"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    >
                        <button className="auth-close-btn" onClick={onClose}>
                            <FiX size={18} />
                        </button>

                        <div className="auth-content">
                            <div className="auth-header">
                                <h2>{mode === 'login' ? 'Welcome Back' : 'Join the Club'}</h2>
                                <p>{mode === 'login' ? 'Sign in to access your orders' : 'Create an account to track orders'}</p>
                            </div>

                            <form className="auth-form" onSubmit={handleSubmit}>
                                {mode === 'signup' && (
                                    <div className="input-group">
                                        <FiUser className="input-icon" />
                                        <input type="text" placeholder="Full Name" required />
                                    </div>
                                )}
                                <div className="input-group">
                                    <FiMail className="input-icon" />
                                    <input type="email" placeholder="Email Address" required />
                                </div>
                                <div className="input-group">
                                    <FiLock className="input-icon" />
                                    <input type="password" placeholder="Password" required />
                                </div>

                                <button type="submit" className="auth-submit-btn">
                                    {mode === 'login' ? 'Sign In' : 'Create Account'}
                                    <FiArrowRight />
                                </button>
                            </form>

                            <div className="auth-divider">
                                <span>or continue with</span>
                            </div>

                            <div className="social-login-grid">
                                <button className="social-btn google">
                                    <FaGoogle />
                                    <span>Google</span>
                                </button>
                                <button className="social-btn facebook">
                                    <FaFacebookF />
                                    <span>Facebook</span>
                                </button>
                                <button className="social-btn instagram">
                                    <FaInstagram />
                                    <span>Instagram</span>
                                </button>
                            </div>

                            <div className="auth-footer">
                                <p>
                                    {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                                    <button
                                        className="switch-mode-btn"
                                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                    >
                                        {mode === 'login' ? 'Sign Up' : 'Log In'}
                                    </button>
                                </p>
                            </div>
                        </div>

                        {/* Decorative liquid blobs */}
                        <div className="liquid-blob blob-1"></div>
                        <div className="liquid-blob blob-2"></div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthOverlay;
