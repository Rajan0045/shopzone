import "./styles/productDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setMainImage(data.thumbnail);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="details-loader">
        Loading Product...
      </div>
    );
  }

  const alreadyAdded = cartItems.some(
    (item) => item.id === product.id
  );

  return (
    <>
      <NavBar />
      <div className="details-container">
        <div className="details-card">

          {/* LEFT */}

          <div className="details-left">

            <div className="main-image-wrapper">

              {/* DISCOUNT BADGE */}

              <div className="details-discount-badge">
                -
                {Math.round(
                  product.discountPercentage
                )}
                %
              </div>

              <img
                src={mainImage}
                alt={product.title}
                className="main-image"
              />
            </div>

            {/* THUMBNAILS */}

            <div className="thumbnail-row">
              {product.images?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumb"
                  className={`thumb-image ${mainImage === img
                      ? "active-thumb"
                      : ""
                    }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}

          <div className="details-right">

            <p className="details-brand">
              {product.brand}
            </p>

            <h1 className="details-title">
              {product.title}
            </h1>

            <div className="rating-stock-row">

              <span className="details-rating">
                ⭐ {product.rating}
              </span>

              <span className="details-stock">
                {product.stock} Items Left
              </span>

            </div>

            <div className="price-row">

              <span className="details-price">
                ${product.price}
              </span>

              <span className="details-old-price">
                $
                {(
                  product.price +
                  product.price *
                  (product.discountPercentage /
                    100)
                ).toFixed(0)}
              </span>

              <span className="discount-pill">
                {Math.round(
                  product.discountPercentage
                )}
                % OFF
              </span>

            </div>

            <p className="details-description">
              {product.description}
            </p>

            <div className="extra-info">

              <div>
                <strong>Category:</strong>{" "}
                {product.category}
              </div>

              <div>
                <strong>Warranty:</strong>{" "}
                1 Year Warranty
              </div>

              <div>
                <strong>Delivery:</strong>{" "}
                Free Delivery
              </div>

              <div>
                <strong>Return Policy:</strong>{" "}
                7 Days Replacement
              </div>

            </div>

            {alreadyAdded ? (
              <button className="added-cart-btn">
                Added To Cart ✓
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