import './styles/home.css';
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useEffect, useRef } from "react";
import { fetchProducts, setCurrentPage } from "../redux/features/products/productSlice";
import { addToCart } from "../redux/features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Home() {

  const dispatch = useDispatch();
  const productsRef = useRef(null);
  const navigate = useNavigate();

  const {
    products,
    loading,
    currentPage,
    limit,
    total,
    search,
  } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.cartItems);

  /* FETCH PRODUCTS */

  useEffect(() => {
    const skip =
      (currentPage - 1) * limit;
    dispatch(
      fetchProducts({
        limit,
        skip,
        search,
      })
    );
  }, [
    dispatch,
    currentPage,
    limit,
    search,
  ]);

  /* TOTAL PAGES */

  const totalPages = Math.ceil(total / limit);

  function ProductSkeleton() {
    return (
      <div className="card">
        <div className="image-wrapper">
          <Skeleton height={220} />
        </div>

        <div className="card-body">
          <p className="brand">
            <Skeleton width={80} />
          </p>

          <h3 className="product-title">
            <Skeleton height={25} />
          </h3>

          <p className="description">
            <Skeleton count={2} />
          </p>

          <div className="top-row">
            <Skeleton width={60} />
            <Skeleton width={60} />
          </div>

          <div className="footer">
            <Skeleton width={80} />
            <Skeleton width={70} height={35} />
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="home-container">
      {/* HERO */}
      <NavBar productsRef={productsRef} />
      <div className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <h1 className="hero-title">
            Discover Premium Products
          </h1>

          <p className="hero-text">
            Shop trending gadgets,
            fashion, electronics and
            accessories with premium
            quality.
          </p>

          <button className="shop-btn" onClick={() =>
            productsRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }>
            Explore Collection
          </button>
        </div>
      </div>

      {/* HEADER */}

      <div className="section-header" ref={productsRef}>
        <h2 className="section-title">
          Trending Products
        </h2>
        <p className="section-subtitle">
          Best products curated for you
        </p>
      </div>

      {/* PRODUCT GRID */}

      <div className="grid">
        {loading ? (
          <>
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </>
        ) : !products || products.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">🔍</div>
            <h2>No Products Found</h2>
            <p>
              We couldn't find any products matching "{search}".
            </p>
          </div>
        ) : (
          products.map((item) => {
            let image = item.image ? `data:image/jpeg;base64,${item.image.toString("base64")}` : null;
            return (
              <div
                key={item._id}
                className="card"
                onClick={() =>
                  navigate(`/product/${item._id}`)
                }
              >
                {/* DISCOUNT BADGE */}
                <div className="discount-badge">
                  -{item.discount || 0}%
                </div>

                {/* IMAGE */}
                <div className="image-wrapper">
                  <img
                    src={image}
                    alt={item.title}
                    className="image"
                  />
                </div>

                {/* BODY */}
                <div className="card-body">
                  <p className="brand">
                    ShopZone Product
                  </p>

                  <h3 className="product-title">
                    {item.title}
                  </h3>

                  <p className="description">
                    {item.description.length > 65
                      ? item.description.slice(0, 65).concat("...")
                      : item.description}
                  </p>

                  <div className="footer">
                    <div>
                      <span className="price">
                        ₹{item.price}
                      </span>

                      {item.discount > 0 && (
                        <span className="old-price">
                          ₹
                          {Math.round(
                            item.price /
                            (1 - item.discount / 100)
                          )}
                        </span>
                      )}
                    </div>

                    {cartItems.some(
                      (cartItem) =>
                        cartItem._id === item._id
                    ) ? (
                      <button className="added-btn">
                        Added ✓
                      </button>
                    ) : (
                      <button
                        className="cart-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addToCart(item));
                        }}
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          }
          )
        )}
      </div>

      {/* PAGINATION */}
      {
        total > limit &&
        <div className="pagination-wrapper">
          <div className="pagination">
            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() =>
                dispatch(
                  setCurrentPage(currentPage - 1)
                )
              }
            >
              Previous
            </button>

            <span className="page-number">
              {currentPage}
            </span>

            <button
              className="page-btn"
              disabled={
                currentPage >=
                Math.ceil(total / limit)
              }
              onClick={() =>
                dispatch(
                  setCurrentPage(currentPage + 1)
                )
              }
            >
              Next
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default Home;