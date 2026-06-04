import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Orders from "./screens/Orders";
import Cart from "./screens/Cart";
import NavBar from "./screens/NavBar";
import ProductDetails from "./screens/ProductDetails";
import OrderDetails from "./screens/OrderDetails";


function App() {

  return (
    <BrowserRouter>
      <div>
        {/* <NavBar /> */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/orders/:id" element={<OrderDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;