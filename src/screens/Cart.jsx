import "./styles/cart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 0 ? 20 : 0;

  const total = subtotal + shipping;

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK failed to load");
      return;
    }
    const options = {
      key: "rzp_test_SwN1CwWS0vHIri",
      amount: Math.round(total * 100),
      currency: "INR",
      name: "My Store",
      description: "Cart Payment",
      handler: function (response) {
        console.log("Payment Success:", response);
        dispatch(clearCart());
        navigate("/");
      },
      prefill: {
        name: "Customer",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
      modal: {
        ondismiss: function () {
          console.log("Payment cancelled");
        },
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <div className="cart-container">
      {/* HEADER */}

      <div className="cart-header">
        <h1 className="cart-heading">
          My Cart
        </h1>

        <p className="cart-subtext">
          Review your selected products
        </p>
      </div>

      {/* EMPTY CART */}

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>

          <p>
            Add some products to continue
            shopping.
          </p>
        </div>
      ) : (
        <div className="cart-wrapper">
          {/* LEFT SIDE */}

          <div className="cart-section">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="cart-card"
              >
                {/* LEFT */}

                <div className="cart-left">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-image"
                  />

                  <div className="cart-info">
                    <p className="cart-brand">
                      {item.brand}
                    </p>

                    <h3 className="cart-title">
                      {item.title}
                    </h3>

                    <p className="cart-price">
                      ${item.price}
                    </p>

                    {/* QUANTITY */}

                    <div className="quantity-box">
                      <button
                        className="qty-btn"
                        onClick={() => {
                          if (item.quantity === 1) {
                            dispatch(
                              removeFromCart(
                                item.id
                              )
                            )
                          } else {
                            dispatch(
                              decreaseQuantity(
                                item.id
                              )
                            )
                          }
                        }
                        }
                      >
                        −
                      </button>

                      <span className="qty">
                        {item.quantity}
                      </span>

                      <button
                        className="qty-btn"
                        onClick={() =>
                          dispatch(
                            increaseQuantity(
                              item.id
                            )
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* RIGHT */}

                <div className="cart-right">
                  <p className="item-total">
                    $
                    {(
                      item.price *
                      item.quantity
                    ).toFixed(2)}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch(
                        removeFromCart(
                          item.id
                        )
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY */}

          <div className="summary">
            <h2 className="summary-title">
              Order Summary
            </h2>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="summary-row">
              <span>Shipping</span>

              <span>
                ${shipping.toFixed(2)}
              </span>
            </div>

            <div className="summary-line"></div>

            <div className="total-row">
              <span>Total</span>

              <span>
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              className="checkout-btn"
              onClick={handlePayment}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;