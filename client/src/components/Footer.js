
import React from 'react';
import { Link } from "react-router-dom";
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
                        <li><Link href="/home">Home</Link></li>
                        <li><Link href="#about">About</Link></li>
                        <li><Link href="https://github.com/SwarnadeepDeb/">Projects</Link></li>
                        <li><Link to="https://github.com/SwarnadeepDeb/Blockchain-based-Online-Crowdfunding-Project">Github</Link></li>
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
                    <p>Email: swarnadeepdebdevelopment@gmail.com</p>
                    <p>Phone: +91-7577830760</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Crowdfunding Platform. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;