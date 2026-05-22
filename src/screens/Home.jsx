import "./styles/home.css";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useEffect, useRef } from "react";
import { fetchProducts, setCurrentPage } from "../redux/features/products/productSlice";
import { addToCart } from "../redux/features/cart/cartSlice";


function Home() {

  const dispatch = useDispatch();
  const productsRef = useRef(null);

  const {
    products,
    loading,
    currentPage,
    limit,
    total,
    search,
  } = useSelector(
    (state) => state.products
  );
  const cartItems = useSelector(
  (state) => state.cart.cartItems
);

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

  const totalPages = Math.ceil(
    total / limit
  );


  return (
    <div className="home-container">
      {/* HERO */}

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
        {products?.map((item) => (
          <div
            key={item.id}
            className="card"
          >
            {/* BADGE */}

            <div className="discount-badge">
              -
              {Math.round(
                item.discountPercentage
              )}
              %
            </div>

            {/* IMAGE */}

            <div className="image-wrapper">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="product-image"
              />
            </div>

            {/* BODY */}

            <div className="card-body">
              <p className="brand">
                {item.brand}
              </p>

              <h3 className="product-title">
                {item.title}
              </h3>

              <p className="description">
                {item.description.slice(
                  0,
                  85
                )}
                ...
              </p>

              {/* TOP */}

              <div className="top-row">
                <span className="rating">
                  ⭐ {item.rating}
                </span>

                <span className="stock">
                  {item.stock} Left
                </span>
              </div>

              {/* FOOTER */}

              <div className="footer">
                <div>
                  <span className="price">
                    ${item.price}
                  </span>

                  <span className="old-price">
                    $
                    {(
                      item.price +
                      item.price *
                      (item.discountPercentage / 100)
                    ).toFixed(0)}
                  </span>
                </div>

                {/* CHECK ITEM EXISTS */}
                {cartItems.some(
                  (cartItem) => cartItem.id === item.id
                ) ? (
                  <button className="added-btn">
                    Added ✓
                  </button>
                ) : (
                  <button
                    className="cart-btn"
                    onClick={() =>
                      dispatch(addToCart(item))
                    }
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
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
    </div>
  );
}

export default Home;