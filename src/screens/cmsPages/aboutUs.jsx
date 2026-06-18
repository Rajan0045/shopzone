import React from "react";
import "../styles/about.css";
import NavBar from "../NavBar";

const About = () => {
    return (
        <>
            <NavBar />
            <div className="about-page">
                {/* Hero Section */}
                <section className="about-hero">
                    <div className="about-overlay">
                        <h1>About ApniDukaan</h1>
                        <p>
                            Your trusted destination for fashion, style, and everyday essentials.
                        </p>
                    </div>
                </section>

                {/* Company Introduction */}
                <section className="about-section container">
                    <div className="about-content">
                        <div className="about-image">
                            <img
                                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
                                alt="Fashion Store"
                            />
                        </div>

                        <div className="about-text">
                            <h2>Who We Are</h2>
                            <p>
                                ApniDukaan is a modern e-commerce platform dedicated to bringing
                                quality products to customers across the country. We offer a wide
                                range of fashion and lifestyle products including clothing,
                                footwear, watches, and accessories.
                            </p>

                            <p>
                                Our goal is to make online shopping simple, secure, and enjoyable
                                by providing quality products, affordable prices, and a seamless
                                shopping experience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="mission-section">
                    <div className="container">
                        <h2>Our Mission</h2>
                        <p>
                            To provide customers with trendy, high-quality products while
                            delivering exceptional service and value. We strive to become the
                            preferred online shopping destination for fashion-conscious
                            customers.
                        </p>
                    </div>
                </section>

                {/* Features */}
                <section className="features-section container">
                    <h2>Why Shop With Us?</h2>

                    <div className="features-grid">
                        <div className="feature-card">
                            <h3>Quality Products</h3>
                            <p>
                                Carefully selected clothing, shoes, watches, and accessories from
                                trusted suppliers.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Secure Shopping</h3>
                            <p>
                                Safe and reliable shopping experience with secure payment options.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Fast Delivery</h3>
                            <p>
                                Quick and efficient delivery to ensure your products reach you on
                                time.
                            </p>
                        </div>

                        <div className="feature-card">
                            <h3>Customer Support</h3>
                            <p>
                                Dedicated support team ready to assist you whenever you need help.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Bottom Section */}
                <section className="about-bottom container">
                    <div className="about-content reverse">
                        <div className="about-text">
                            <h2>Our Vision</h2>
                            <p>
                                We envision ApniDukaan as a platform where customers can discover
                                the latest trends, shop with confidence, and enjoy an exceptional
                                online retail experience.
                            </p>

                            <p>
                                Whether you're looking for stylish clothing, premium footwear,
                                elegant watches, or fashionable accessories, ApniDukaan is here
                                to help you express your unique style.
                            </p>
                        </div>

                        <div className="about-image">
                            <img
                                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b"
                                alt="Shopping"
                            />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;