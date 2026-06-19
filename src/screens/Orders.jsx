import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/order.css";
import { getMyOrders } from "../redux/features/order/orderSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="orders-container">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="order-skeleton"
            >
              <div className="skeleton-header"></div>
              <div className="skeleton-product"></div>
              <div className="skeleton-product"></div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />

      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>

          <p>
            Track, manage and view all
            your purchases.
          </p>
        </div>

        {orders?.length === 0 ? (
          <div className="empty-orders">
            <h2>No Orders Yet</h2>

            <p>
              Your placed orders will
              appear here.
            </p>
          </div>
        ) : (
          orders?.map((order) => {
            return (
              <div
                key={order._id}
                className="order-card"
              >
                <div className="order-top">
                  <div>
                    <h3>
                      Order #
                      {order._id.slice(-8)}
                    </h3>

                    <p>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="status-wrapper">
                    <span className="order-status">
                      {
                        order.orderStatus
                      }
                    </span>

                    <span className="payment-status">
                      {
                        order.paymentStatus
                      }
                    </span>
                  </div>
                </div>

                {order.items.map((item) => {
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
                        item.product?._id
                      }
                      className="product-row"
                    >
                      <img
                        src={image}
                        alt={
                          item.product?.name
                        }
                      />

                      <div className="product-info">
                        <h4>
                          {
                            item.product
                              ?.name
                          }
                        </h4>

                        <p>
                          Quantity:{" "}
                          {
                            item.quantity
                          }
                        </p>
                      </div>

                      <h4>
                        ₹
                        {(
                          item.price *
                          item.quantity
                        ).toFixed(2)}
                      </h4>
                    </div>
                  );
                })}

                <div className="order-footer">
                  <h3>
                    Total: ₹
                    {order.totalAmount}
                  </h3>

                  <button onClick={() => navigate(`/order-details/${order._id}`)} >
                    View Details
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </>
  );
};

export default Orders;