import React, {
  useState,
  useEffect,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles/navBar.css";
import { setSearch } from "../redux/features/products/productSlice";
import { getCart, resetCartState } from "../redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { Constants } from "../apis/constant";
import axios from "axios";
import { persistor } from "../redux/store";
import { clearUser } from "../redux/features/user/userSlice";
import { mainWrapper } from "../apis/main";

const NavBar = ({ productsRef }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { search } = useSelector((state) => state.products);


  const totalQuantity = cartItems && cartItems.length > 0 ? cartItems.reduce(
    (total, item) =>
      total + (item.quantity || 0),
    0
  ) : 0;

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [isSearching, setIsSearching] =
    useState(false);

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const profileRef = useRef(null);


  useEffect(() => {
    dispatch(getCart());

    const handleClickOutside = (
      event
    ) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [dispatch]);

  const handleSearch = (e) => {
    setIsSearching(true);

    dispatch(
      setSearch(e.target.value)
    );

    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleLogout = async () => {
    try {
      await mainWrapper.post(`${Constants.URL}/users/logout`);
      dispatch(clearUser());
      dispatch(resetCartState());
      await persistor.purge();
      window.location.href = '/login';
    } catch (error) {
      console.log(error);
    }
  };

  const imageSrc = user?.image ? `data:image/jpeg;base64,${user.image}` : null;


  return (
    <nav className="navbar">
      <div className="navbar-top">
        {/* LOGO */}
        <h2
          className="logo"
          onClick={() =>
            navigate("/")
          }
        >
          ApniDukaan
        </h2>

        {/* SEARCH */}
        {location.pathname === "/" ? (
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={search}
              onChange={handleSearch}
              onFocus={() =>
                productsRef?.current?.scrollIntoView(
                  {
                    behavior:
                      "smooth",
                  }
                )
              }
            />

            {isSearching && (
              <div className="search-spinner"></div>
            )}
          </div>
        ) : (
          <div className="search-wrapper" />
        )}
        <div className="nav-links desktop-nav">
          {
            location.pathname !== "/" &&
            <span
              className="nav-link"
              onClick={() =>
                navigate("/")
              }
            >
              Home
            </span>
          }
          {
            user?.role !== "owner" &&
            <span
              className="nav-link"
              onClick={() =>
                navigate("/orders")
              }
            >
              Orders
            </span>
          }

          {
            user?.role !== "owner" &&
            <div
              className="cart-icon-wrapper"
              onClick={() =>
                navigate("/cart")
              }
            >
              <span className="nav-link">
                Cart 🛒
              </span>

              {totalQuantity > 0 && (
                <span className="cart-badge">
                  {totalQuantity}
                </span>
              )}
            </div>
          }

          {/* PROFILE */}
          <div
            className="profile-wrapper"
            ref={profileRef}
          >
            {user ? (
              <>
                <div
                  className="profile-avatar"
                  onClick={() =>
                    setShowProfileMenu(
                      !showProfileMenu
                    )
                  }
                >
                  {
                    imageSrc &&
                    <img
                      src={imageSrc}
                      alt="profile"
                      className="profile-avatar-image"
                    />
                  }
                  {!imageSrc &&
                    user?.fullname?.charAt(0)
                      ?.toUpperCase()}
                </div>

                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <strong>
                        {
                          user?.role === "owner" ?
                            `${user?.fullname} (Owner)`
                            : user?.fullname
                        }
                      </strong>

                      <small>
                        {
                          user?.email
                        }
                      </small>
                    </div>

                    <div
                      className="dropdown-item"
                      onClick={() =>
                        navigate(
                          "/profile"
                        )
                      }
                    >
                      👤 Profile
                    </div>

                    {
                      user?.role === "owner" &&
                      <div
                        className="dropdown-item"
                        onClick={() =>
                          navigate(
                            "/settings"
                          )
                        }
                      >
                        ⚙️ Settings
                      </div>
                    }

                    <div
                      className="dropdown-item logout-item"
                      onClick={
                        handleLogout
                      }
                    >
                      🚪 Logout
                    </div>
                  </div>
                )}
              </>
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="Guest User"
                className="guest-avatar"
                onClick={() =>
                  navigate("/login")
                }
              />
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-btn"
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <span
            className="mobile-link"
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            Home
          </span>

          <span
            className="mobile-link"
            onClick={() => {
              navigate(
                "/orders"
              );
              setMenuOpen(false);
            }}
          >
            Orders
          </span>

          <span
            className="mobile-link"
            onClick={() => {
              navigate("/cart");
              setMenuOpen(false);
            }}
          >
            Cart 🛒
            {totalQuantity > 0 &&
              ` (${totalQuantity})`}
          </span>

          {user ? (
            <span
              className="mobile-link"
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </span>
          ) : (
            <span
              className="mobile-link"
              onClick={() => {
                navigate(
                  "/login"
                );
                setMenuOpen(false);
              }}
            >
              Login
            </span>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;