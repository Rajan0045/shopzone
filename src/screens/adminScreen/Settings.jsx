import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    FiPlusSquare,
    FiShoppingBag,
    FiCreditCard,
    FiChevronRight,
    FiList,
} from "react-icons/fi";
import "../styles/settings.css";
import NavBar from "../NavBar";

const Settings = () => {
    const navigate = useNavigate();

    const menuItems = [
        {
            title: "Create Product",
            subtitle: "Add and manage products",
            icon: <FiPlusSquare color="#eac300" />,
            path: "/owner/product-create",
        },
        {
            title: "All Orders",
            subtitle: "View customer orders",
            icon: <FiShoppingBag color="#eac300" />,
            path: "/owner/all-orders",
        },
        {
            title: "All Products",
            subtitle: "Mange the products ",
            icon: <FiList color="#eac300" />,
            path: "/owner/all-products"
        }
    ];


    return (
        <>
            <NavBar />
            <Container className="settings-container">
                <div className="settings-header">
                    <h2>Admin Settings</h2>
                    <p>Manage your store operations</p>
                </div>

                <div className="settings-card">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="settings-item"
                            onClick={() => navigate(item.path)}
                        >
                            <div className="settings-left">
                                <div className="settings-icon">
                                    {item.icon}
                                </div>

                                <div>
                                    <h6>{item.title}</h6>
                                    <span>{item.subtitle}</span>
                                </div>
                            </div>

                            <FiChevronRight className="arrow-icon" />
                        </div>
                    ))}
                </div>
            </Container>
        </>
    );
};

export default Settings;