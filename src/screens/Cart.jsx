import "./styles/cart.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import api from "../apis/axios";
import toast from "react-hot-toast";
import { getCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    cartItems,
    loading,
  } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const updateQuantity = async (
    _id,
    quantity
  ) => {
    try {
      if (quantity <= 0) {
        await removeProduct(_id);
        return;
      }

      const res = await api.post(
        "/cart/addToCart",
        {
          _id,
          quantity,
        }
      );

      if (res.data.success) {
        dispatch(getCart());
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
        "Failed to update quantity"
      );
    }
  };

  const removeProduct = async (_id) => {
    try {
      const res = await api.delete(
        `/cart/remove-product/${_id}`
      );

      if (res.data.success) {
        toast.success(
          "Product removed"
        );

        dispatch(getCart());
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
        "Failed to remove product"
      );
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total +
      item.price * item.quantity,
    0
  );

  const shipping =
    subtotal > 0 ? 20 : 0;

  const total =
    subtotal + shipping;

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert(
        "Razorpay SDK failed to load"
      );
      return;
    }

    const options = {
      key: "rzp_test_SwN1CwWS0vHIri",
      amount: Math.round(
        total * 100
      ),
      currency: "INR",
      name: "ApniDukaan",
      description:
        "Cart Payment",

      handler: function () {
        toast.success(
          "Payment Successful"
        );

        navigate("/");
      },

      prefill: {
        name: "Customer",
        email:
          "customer@example.com",
        contact:
          "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();
  };

  return (
    <>
      <NavBar />

      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-heading">
            My Cart
          </h1>

          <p className="cart-subtext">
            Review your selected
            products
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>
              Your cart is empty 🛒
            </h2>

            <p>
              Add some products to
              continue shopping.
            </p>
          </div>
        ) : (
          <div className="cart-wrapper">
            <div className="cart-section">
              {cartItems.map(
                (item) => {
                  const image =
                    item.image
                      ? `data:image/jpeg;base64,${item.image}`
                      : null;

                  return (
                    <div
                      key={
                        item.productId
                      }
                      className="cart-card"
                    >
                      <div className="cart-left">
                        <img
                          src={
                            image
                          }
                          alt={
                            item.name
                          }
                          className="cart-image"
                        />

                        <div className="cart-info">
                          <h3 className="cart-title">
                            {
                              item.name
                            }
                          </h3>

                          <p className="cart-price">
                            ₹
                            {
                              item.price
                            }
                          </p>

                          <div className="quantity-box">
                            <button
                              className="qty-btn"
                              disabled={
                                item.quantity ===
                                1
                              }
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity -
                                  1
                                )
                              }
                            >
                              −
                            </button>

                            <span className="qty">
                              {
                                item.quantity
                              }
                            </span>

                            <button
                              className="qty-btn"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity +
                                  1
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="cart-right">
                        <p className="item-total">
                          ₹
                          {(
                            item.price *
                            item.quantity
                          ).toFixed(
                            2
                          )}
                        </p>

                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeProduct(
                              item.productId
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            <div className="summary">
              <h2 className="summary-title">
                Order Summary
              </h2>

              <div className="summary-row">
                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {subtotal.toFixed(
                    2
                  )}
                </span>
              </div>

              <div className="summary-row">
                <span>
                  Shipping
                </span>

                <span>
                  ₹
                  {shipping.toFixed(
                    2
                  )}
                </span>
              </div>

              <div className="summary-line"></div>

              <div className="total-row">
                <span>
                  Total
                </span>

                <span>
                  ₹
                  {total.toFixed(
                    2
                  )}
                </span>
              </div>

              <button
                className="checkout-btn"
                onClick={
                  handlePayment
                }
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;