import "./styles/orderDetails.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import api from "../apis/axios";
import { mainWrapper } from "../apis/main";
import { Constants } from "../apis/constant";

const OrderDetail = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrderDetails();
    }, []);


    useEffect(() => {
        window.history.pushState(
            null,
            "",
            window.location.href
        );

        const handleBack = () => {
            navigate("/", {
                replace: true,
            });
        };

        window.addEventListener(
            "popstate",
            handleBack
        );

        return () => {
            window.removeEventListener(
                "popstate",
                handleBack
            );
        };
    }, [navigate]);

    const getOrderDetails = async () => {
        try {
            const response = await mainWrapper.get(`${Constants.URL}/order/${orderId}`);
            if (response.success) {
                setOrder(response.order);
            } else {
                setOrder(null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <NavBar />
                <div className="order-detail-container">
                    <div className="order-detail-skeleton"></div>
                </div>
            </>
        );
    }

    if (!order) {
        return (
            <>
                <NavBar />
                <div className="order-not-found">
                    Order not found
                </div>
            </>
        );
    }

    return (
        <>
            <NavBar />

            <div className="order-detail-container">

                <div className="detail-header">
                    <div>
                        <h1>Order Details</h1>

                        <p>
                            Order #
                            {order._id}
                        </p>
                    </div>

                    <div className="status-group">
                        <span className="status-badge">
                            {order.orderStatus}
                        </span>

                        <span className="payment-badge">
                            {
                                order.paymentStatus
                            }
                        </span>
                    </div>
                </div>

                <div className="detail-grid">

                    <div className="detail-card">
                        <h3>
                            Shipping Address
                        </h3>

                        <p>
                            <strong>
                                {
                                    order
                                        .shippingAddress
                                        ?.name
                                }
                            </strong>
                        </p>

                        <p>
                            {
                                order
                                    .shippingAddress
                                    ?.phone
                            }
                        </p>

                        <p>
                            {
                                order
                                    .shippingAddress
                                    ?.address
                            }
                        </p>
                    </div>

                    <div className="detail-card">
                        <h3>
                            Payment Information
                        </h3>

                        <p>
                            Method:
                            {" "}
                            {
                                order.paymentMethod
                            }
                        </p>

                        <p>
                            Status:
                            {" "}
                            {
                                order.paymentStatus
                            }
                        </p>

                        <p>
                            Payment Id:
                            {" "}
                            {
                                order.razorpayPaymentId ||
                                "N/A"
                            }
                        </p>
                    </div>

                </div>

                <div className="products-card">
                    <h2>
                        Ordered Products
                    </h2>

                    {order.items.map(
                        (item) => {
                            const image = item.product?.image?.data
                                ? `data:image/jpeg;base64,${btoa(
                                    new Uint8Array(
                                        item.product.image.data
                                    ).reduce(
                                        (data, byte) =>
                                            data + String.fromCharCode(byte),
                                        ""
                                    )
                                )}`
                                : null;

                            return (
                                <div
                                    key={
                                        item.product
                                            ?._id
                                    }
                                    className="product-item"
                                >
                                    <img
                                        src={image}
                                        alt={
                                            item.product
                                                ?.name
                                        }
                                    />

                                    <div className="product-content">
                                        <h3>
                                            {
                                                item.product
                                                    ?.name
                                            }
                                        </h3>

                                        <p>
                                            Quantity:
                                            {" "}
                                            {
                                                item.quantity
                                            }
                                        </p>

                                        <p>
                                            Unit Price:
                                            ₹
                                            {
                                                item.price
                                            }
                                        </p>
                                    </div>

                                    <h3>
                                        ₹
                                        {(
                                            item.price *
                                            item.quantity
                                        ).toFixed(
                                            2
                                        )}
                                    </h3>
                                </div>
                            );
                        }
                    )}
                </div>

                <div className="total-card">
                    <div>
                        <p>
                            Ordered On
                        </p>

                        <h3>
                            {new Date(
                                order.createdAt
                            ).toLocaleString()}
                        </h3>
                    </div>

                    <div>
                        <p>
                            Total Amount
                        </p>

                        <h1>
                            ₹
                            {
                                order.totalAmount
                            }
                        </h1>
                    </div>
                </div>

            </div>
        </>
    );
};

export default OrderDetail;