import "./styles/home.css";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  fetchProducts,
  setCurrentPage,
} from "../redux/features/products/productSlice";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";
import api from "../apis/axios";

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

  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      const res = await api.get("/cart/items");
      setCartItems(res.data.cart || []);
    } catch (error) {
      console.log(error);
    }
  };

  /* FETCH CART ONCE */

  useEffect(() => {
    getCartItems();
  }, []);

  /* FETCH PRODUCTS */

  useEffect(() => {
    const skip = (currentPage - 1) * limit;

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

  const handleAddToCart = async (
    e,
    productId
  ) => {
    e.stopPropagation();

    try {
      const res = await api.post(
        "/cart/addToCart",
        {
          _id: productId,
          quantity: 1,
        }
      );

      if (res.data.success) {
        toast.success("Added to cart");

        await getCartItems();
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to add to cart"
      );
    }
  };

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
            <Skeleton
              width={70}
              height={35}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <NavBar
        productsRef={productsRef}
        cartItems={cartItems}
      />

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

          <button
            className="shop-btn"
            onClick={() =>
              productsRef.current?.scrollIntoView(
                {
                  behavior: "smooth",
                }
              )
            }
          >
            Explore Collection
          </button>
        </div>
      </div>

      {/* HEADER */}

      <div
        className="section-header"
        ref={productsRef}
      >
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
          [...Array(8)].map((_, index) => (
            <ProductSkeleton
              key={index}
            />
          ))
        ) : !products ||
          products.length === 0 ? (
          <div className="no-products">
            <div className="no-products-icon">
              🔍
            </div>

            <h2>
              No Products Found
            </h2>

            <p>
              We couldn't find any
              products matching "
              {search}".
            </p>
          </div>
        ) : (
          products.map((item) => {
            const image =
              item.image
                ? `data:image/jpeg;base64,${item.image}`
                : null;

            const isInCart =
              cartItems.some(
                (cartItem) =>
                  String(
                    cartItem.productId
                  ) ===
                  String(item._id)
              );

            return (
              <div
                key={item._id}
                className="card"
                onClick={() =>
                  navigate(
                    `/product/${item._id}`
                  )
                }
              >
                <div className="discount-badge">
                  -
                  {item.discount ||
                    0}
                  %
                </div>

                <div className="image-wrapper">
                  <img
                    src={image}
                    alt={
                      item.title
                    }
                    className="image"
                  />
                </div>

                <div className="card-body">
                  <p className="brand">
                    ShopZone Product
                  </p>

                  <h3 className="product-title">
                    {item.title}
                  </h3>

                  <p className="description">
                    {item
                      .description
                      .length > 65
                      ? item.description
                        .slice(
                          0,
                          65
                        )
                        .concat(
                          "..."
                        )
                      : item.description}
                  </p>

                  <div className="footer">
                    <div>
                      <span className="price">
                        ₹
                        {item.price}
                      </span>

                      {item.discount >
                        0 && (
                          <span className="old-price">
                            ₹
                            {Math.round(
                              item.price /
                              (1 -
                                item.discount /
                                100)
                            )}
                          </span>
                        )}
                    </div>

                    {isInCart ? (
                      <button className="added-btn">
                        Added ✓
                      </button>
                    ) : (
                      <button
                        className="cart-btn"
                        onClick={(
                          e
                        ) =>
                          handleAddToCart(
                            e,
                            item._id
                          )
                        }
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* PAGINATION */}

      {total > limit && (
        <div className="pagination-wrapper">
          <div className="pagination">
            <button
              className="page-btn"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                dispatch(
                  setCurrentPage(
                    currentPage - 1
                  )
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
                Math.ceil(
                  total / limit
                )
              }
              onClick={() => {
                productsRef.current?.scrollIntoView(
                  {
                    behavior:
                      "smooth",
                  }
                );

                setTimeout(() => {
                  dispatch(
                    setCurrentPage(
                      currentPage +
                      1
                    )
                  );
                }, 500);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;