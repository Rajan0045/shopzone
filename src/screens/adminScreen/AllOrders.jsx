import "../styles/allorder.css";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";
import toast from "react-hot-toast";
import { mainWrapper } from "../../apis/main";
import { Constants } from "../../apis/constant";

const AllOrders = () => {
    const [orders, setOrders] =
        useState([]);

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        getAllOrders(page);
    }, [page]);

    const getAllOrders = async (currentPage = 1) => {
        try {
            setLoading(true);
            const response = await mainWrapper.get(`${Constants.URL}/order/all-orders?page=${currentPage}&limit=10`);
            if (response.success) {
                setOrders(response.orders);
                setTotalPages(
                    response.pagination.totalPages
                );
            }
        } catch (error) {
            toast.error(
                error.response?.data
                    ?.message ||
                "Failed to fetch orders"
            );
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId, orderStatus) => {
        try {
            const response = await mainWrapper.put(`${Constants.URL}/order/update-status/${orderId}`, { orderStatus });
            if (response.success) {
                toast.success("Status Updated");
                getAllOrders(page);
            }
        } catch (error) {
            toast.error(
                error.response?.data
                    ?.message ||
                "Failed to update"
            );
        }
    };

    return (
        <>
            <NavBar />

            <div className="admin-orders">

                <div className="admin-header">
                    <h1>
                        Orders Management
                    </h1>

                    <p>
                        Manage customer
                        orders
                    </p>
                </div>

                {loading ? (
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        Order ID
                                    </th>
                                    <th>
                                        Customer
                                    </th>
                                    <th>
                                        Phone
                                    </th>
                                    <th>
                                        Amount
                                    </th>
                                    <th>
                                        Payment
                                    </th>
                                    <th>
                                        Order Status
                                    </th>
                                    <th>
                                        Date
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {[...Array(6)].map((_, index) => (
                                    <tr key={index}>
                                        <td><div className="skeleton skeleton-text"></div></td>
                                        <td><div className="skeleton skeleton-text"></div></td>
                                        <td><div className="skeleton skeleton-text"></div></td>
                                        <td><div className="skeleton skeleton-text"></div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <>
                        <div className="table-wrapper">

                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Order ID
                                        </th>
                                        <th>
                                            Customer
                                        </th>
                                        <th>
                                            Phone
                                        </th>
                                        <th>
                                            Amount
                                        </th>
                                        <th>
                                            Payment
                                        </th>
                                        <th>
                                            Order Status
                                        </th>
                                        <th>
                                            Date
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {orders.map(
                                        (order) => (
                                            <tr
                                                key={
                                                    order._id
                                                }
                                            >
                                                <td>
                                                    #
                                                    {order._id.slice(
                                                        -8
                                                    )}
                                                </td>

                                                <td>
                                                    {
                                                        order
                                                            .shippingAddress
                                                            ?.name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        order
                                                            .shippingAddress
                                                            ?.phone
                                                    }
                                                </td>

                                                <td>
                                                    ₹
                                                    {
                                                        order.totalAmount
                                                    }
                                                </td>

                                                <td>
                                                    <span
                                                        className={`payment ${order.paymentStatus.toLowerCase()}`}
                                                    >
                                                        {
                                                            order.paymentStatus
                                                        }
                                                    </span>
                                                </td>

                                                <td>
                                                    <select
                                                        value={
                                                            order.orderStatus
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            updateStatus(
                                                                order._id,
                                                                e
                                                                    .target
                                                                    .value
                                                            )
                                                        }
                                                    >
                                                        <option>
                                                            Placed
                                                        </option>

                                                        <option>
                                                            Processing
                                                        </option>

                                                        <option>
                                                            Shipped
                                                        </option>

                                                        <option>
                                                            Delivered
                                                        </option>

                                                        <option>
                                                            Cancelled
                                                        </option>
                                                    </select>
                                                </td>

                                                <td>
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>

                        </div>

                        <div className="pagination">

                            <button
                                disabled={
                                    page === 1
                                }
                                onClick={() =>
                                    setPage(
                                        page - 1
                                    )
                                }
                            >
                                Previous
                            </button>

                            <span>
                                {page} /
                                {totalPages}
                            </span>

                            <button
                                disabled={
                                    page ===
                                    totalPages
                                }
                                onClick={() =>
                                    setPage(
                                        page + 1
                                    )
                                }
                            >
                                Next
                            </button>

                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default AllOrders;