import "./styles/productDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import toast from "react-hot-toast";
import { Constants } from "../apis/constant";
import api from "../apis/axios";
import { getCart } from "../redux/features/cart/cartSlice";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  useEffect(() => {
    dispatch(getCart());
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.get(
        `${Constants.development}/products/product/${id}`,
        {
          headers: {
            Authorization: `Bearer ${
              user?.token || ""
            }`,
          },
        }
      );

      setProduct(res.data.product);
    } catch (err) {
      console.log(
        err.response?.data ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAdding(true);

      const res = await api.post(
        "/cart/addToCart",
        {
          _id: product._id,
          quantity: 1,
        }
      );

      if (res.data.success) {
        toast.success(
          "Added to cart"
        );

        dispatch(getCart());
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Failed to add product"
      );
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="details-loader">
          Loading Product...
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <NavBar />
        <div className="details-loader">
          Product not found
        </div>
      </>
    );
  }

  const alreadyAdded =
    cartItems?.some(
      (item) =>
        item.productId === product._id ||
        item.productId?._id ===
          product._id
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
                onClick={() =>
                  navigate("/cart")
                }
              >
                View Cart ✓
              </button>
            ) : (
              <button
                className="add-cart-btn"
                onClick={
                  handleAddToCart
                }
                disabled={adding}
              >
                {adding
                  ? "Adding..."
                  : "Add To Cart"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;