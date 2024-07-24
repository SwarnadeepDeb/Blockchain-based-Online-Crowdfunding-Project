// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h2>About Us</h2>
                    <p>
                        We are a blockchain-based crowdfunding platform committed to
                        bringing innovative ideas to life.
                    </p>
                </div>
                <div className="footer-section">
                    <h2>Links</h2>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#projects">Projects</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h2>Follow Us</h2>
                    <div className="social-icons">
                        <a href="#facebook"><i className="fab fa-facebook-f"></i></a>
                        <a href="#twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#linkedin"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
                <div className="footer-section">
                    <h2>Contact</h2>
                    <p>Email: support@crowdfunding.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Crowdfunding Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;