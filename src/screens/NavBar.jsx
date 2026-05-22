import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles/navbar.css";
import {
  setSearch,
} from "../redux/features/products/productSlice";

const NavBar = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );
  const { search } = useSelector(
    (state) => state.products
  );

  const totalQuantity = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

  const [menuOpen, setMenuOpen] =
    useState(false);

  return (
    <nav className="navbar">
      {/* TOP BAR */}
      <div className="navbar-top">
        {/* LOGO */}
        <h2
          className="logo"
          onClick={() => navigate("/")}
        >
          ShopZone
        </h2>

        {/* SEARCH */}
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={search}
            onChange={(e) =>
              dispatch(
                setSearch(e.target.value)
              )
            }
          />
        </div>

        {/* DESKTOP LINKS */}
        <div className="nav-links desktop-nav">
          <span
            className="nav-link"
            onClick={() => navigate("/")}
          >
            Home
          </span>

          <span
            className="nav-link"
            onClick={() =>
              navigate("/orders")
            }
          >
            Orders
          </span>
          <div
            className="cart-icon-wrapper"
            onClick={() => navigate("/cart")}
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
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-btn"
          onClick={() =>
            setMenuOpen(!menuOpen)
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
              navigate("/orders");
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
          </span>
        </div>
      )}
    </nav>
  );
};

export default NavBar;