import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "./NavBar";
import "./styles/orderDetails.css";

const OrderDetails = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const order = useSelector((state) =>
        state.orders.orders.find(
            (item) => item.id.toString() === id
        )
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <>
                <NavBar />

                <div className="order-details-container">
                    <div className="skeleton skeleton-title"></div>

                    <div className="skeleton-summary">
                        <div className="skeleton skeleton-text"></div>
                        <div className="skeleton skeleton-text small"></div>
                    </div>
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}  
                            className="skeleton-product">
                            <div className="skeleton skeleton-image"></div>
                            <div className="skeleton-content">
                                <div className="skeleton skeleton-line"></div>
                                <div className="skeleton skeleton-line short"></div>
                                <div className="skeleton skeleton-line shorter"></div>
                            </div>
                            <div className="skeleton skeleton-price"></div>
                        </div>
                    ))}
                </div>
            </>
        );
    }

    if (!order) {
        return (
            <>
                <NavBar />
                <div className="order-not-found">
                    <h2>Order Not Found</h2>
                    <p>
                        The order you're looking for does
                        not exist.
                    </p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />

            <div className="order-details-container">
                <div className="page-header">
                    <h1>Order Details</h1>
                    <p>
                        Track and review your purchase
                    </p>
                </div>

                <div className="order-summary-card">
                    <div>
                        <h2>Order #{order.id}</h2>

                        <p>
                            {new Date(
                                order.date
                            ).toLocaleString()}
                        </p>
                    </div>

                    <div className="summary-right">
                        <span className="status-badge">
                            Paid
                        </span>

                        <h2>
                            ${order.total.toFixed(2)}
                        </h2>
                    </div>
                </div>

                <h2 className="products-heading">
                    Ordered Products
                </h2>

                <div className="products-list">
                    {order.items.map((item) => (
                        <div
                            key={item.id}
                            className="product-card"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="product-image"
                            />

                            <div className="product-content">
                                <h3>{item.title}</h3>

                                <p>
                                    Brand:
                                    <span>
                                        {" "}
                                        {item.brand}
                                    </span>
                                </p>

                                <p>
                                    Quantity:
                                    <span>
                                        {" "}
                                        {item.quantity}
                                    </span>
                                </p>
                            </div>

                            <div className="product-price">
                                <h3>
                                    $
                                    {(
                                        item.price *
                                        item.quantity
                                    ).toFixed(2)}
                                </h3>
                                <p>
                                    ${item.price} each
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OrderDetails;