import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Orders from "./screens/Orders";
import Cart from "./screens/Cart";
import NavBar from "./screens/NavBar";
import ProductDetails from "./screens/ProductDetails";
import OrderDetails from "./screens/OrderDetails";
import Login from "./screens/authScreen/login";
import Register from "./screens/authScreen/register";
import { Toaster } from "react-hot-toast";
import React from "react";
import CreateProduct from "./screens/CreateProduct";
import Footer from "./screens/Footer";
import Profile from "./screens/Profile";
import About from "./screens/cmsPages/aboutUs";
import PrivacyPolicy from "./screens/cmsPages/privacyPolicy";

function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <div>
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:id" element={<OrderDetails />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              {/* //----------------- Owner screens -----------------// */}
              <Route path="/owner/product-create" element={<CreateProduct />} />
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