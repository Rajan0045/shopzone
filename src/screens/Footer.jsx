import React from 'react'
import '../screens/styles/footer.css';

const Footer = () => {
    return (
        <footer className="footerMain">
            <div className="footer-container">
                <div className="footer-section">
                    <h2 className="footer-logo">ApniDukaan</h2>
                    <p>
                        Your trusted destination for quality products at affordable prices.
                    </p>
                </div>

                <div className="footer-section">
                    <h3>Contact Us</h3>
                    <p>📍 Doraha, Ludhiana, Punjab, India</p>
                    <p>📞 8284947943</p>
                    <p>✉️ support@apnidukaan.com</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/privacy-policy">Privacy Policy</a></li>
                        <li><a href="/products">Products</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>
                    © {new Date().getFullYear()} ApniDukaan. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer
