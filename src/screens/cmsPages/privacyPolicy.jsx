import React from "react";
import "../styles/privacyPolicy.css";
import NavBar from "../NavBar";

const PrivacyPolicy = () => {
    return (
        <>
            <NavBar />
            <div className="privacy-container">
                <div className="privacy-header">
                    <h2>Privacy Policy</h2>
                    <p>Last Updated: June 2026</p>
                </div>

                <div className="privacy-content">
                    <section>
                        <h2>Introduction</h2>
                        <p>
                            At ApniDukaan, we value your trust and are committed to protecting
                            your privacy. This Privacy Policy outlines how we collect, use, and
                            safeguard your information while providing a seamless shopping
                            experience.
                        </p>
                    </section>

                    <section>
                        <h2>Information We Collect</h2>
                        <p>
                            We may collect basic information such as your name, email address,
                            phone number, shipping address, and order details to help process
                            your purchases and improve our services.
                        </p>
                    </section>

                    <section>
                        <h2>How We Use Your Information</h2>
                        <p>
                            The information collected is used to process orders, improve customer
                            experience, provide support, send important updates, and enhance the
                            overall functionality of our platform.
                        </p>
                    </section>

                    <section>
                        <h2>Cookies & Tracking</h2>
                        <p>
                            ApniDukaan may use cookies and similar technologies to personalize
                            your experience, remember your preferences, and analyze website
                            performance to serve you better.
                        </p>
                    </section>

                    <section>
                        <h2>Data Protection</h2>
                        <p>
                            We take appropriate measures to protect your information from
                            unauthorized access, misuse, or disclosure. Your privacy and security
                            remain a priority for us.
                        </p>
                    </section>

                    <section>
                        <h2>Third-Party Services</h2>
                        <p>
                            To provide better services, we may work with trusted third-party
                            providers for payments, shipping, analytics, and communication. These
                            partners are required to handle your data responsibly.
                        </p>
                    </section>

                    <section>
                        <h2>Your Choices</h2>
                        <p>
                            You may review, update, or request removal of your personal
                            information at any time by contacting our support team. We strive to
                            give you control over your data.
                        </p>
                    </section>

                    <section>
                        <h2>Updates to This Policy</h2>
                        <p>
                            We may update this Privacy Policy periodically to reflect changes in
                            our services or legal requirements. Any updates will be posted on
                            this page with the revised date.
                        </p>
                    </section>

                    <section>
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions, suggestions, or concerns regarding this
                            Privacy Policy, feel free to reach out to our support team.
                        </p>
                        <p>
                            <strong>Email:</strong> support@apnidukaan.com
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;