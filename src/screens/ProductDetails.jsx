import "./styles/productDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { Constants } from "../apis/constant";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const user = await JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(
          `${Constants.development}/products/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token || ""}`,
            },
          }
        );

        setProduct(res.data.product);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="details-loader">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const alreadyAdded = cartItems.some(
    (item) => item._id === product._id
  );

  const imageSrc = product.image
    ? `data:image/jpeg;base64,${product.image}`
    : "";

  return (
    <>
      <NavBar />
      <div className="details-container">
        <div className="details-card">
          {/* LEFT */}
          <div className="details-left">
            <div className="main-image-wrapper">
              <img
                src={imageSrc}
                alt={product.title}
                className="main-image"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="details-right">

            <h1 className="details-title">
              {product.title}
            </h1>

            <div className="price-row">
              <span className="details-price">
                ₹{product.price}
              </span>

              {product.discount > 0 && (
                <span className="discount-pill">
                  {product.discount}% OFF
                </span>
              )}
            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="extra-info">
              <div>
                <strong>Discount:</strong>{" "}
                {product.discount}%
              </div>
            </div>

            {alreadyAdded ? (
              <button
                className="added-cart-btn"
                onClick={() => navigate("/cart")}
              >
                View Cart ✓
              </button>
            ) : (
              <button
                className="add-cart-btn"
                onClick={() =>
                  dispatch(addToCart(product))
                }
              >
                Add To Cart
              </button>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;