import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./screens/Home";
import Orders from "./screens/Orders";
import Cart from "./screens/Cart";
import ProductDetails from "./screens/ProductDetails";
import OrderDetails from "./screens/OrderDetails";
import Login from "./screens/authScreen/login";
import Register from "./screens/authScreen/register";
import Footer from "./screens/Footer";
import Profile from "./screens/Profile";
import About from "./screens/cmsPages/aboutUs";
import PrivacyPolicy from "./screens/cmsPages/privacyPolicy";
import CreateProduct from "./screens/adminScreen/CreateProduct";
import Settings from "./screens/adminScreen/Settings";
import { OwnerProtectedRoute } from "./apis/controller";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div>
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />

              {/* Owner Protected Routes */}
              <Route
                path="/settings"
                element={
                  <OwnerProtectedRoute>
                    <Settings />
                  </OwnerProtectedRoute>
                }
              />

              <Route
                path="/owner/product-create"
                element={
                  <OwnerProtectedRoute>
                    <CreateProduct />
                  </OwnerProtectedRoute>
                }
              />
              <Route
                path="/owner/product-create"
                element={
                  <OwnerProtectedRoute>
                    <CreateProduct />
                  </OwnerProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>

        <Footer />
        <Toaster position="top-right" />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;