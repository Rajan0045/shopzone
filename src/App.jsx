import {  BrowserRouter,  Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import Orders from "./screens/Orders";
import Cart from "./screens/Cart";


function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route    path="/orders" element={<Orders />}/>
            <Route    path="/cart" element={<Cart  />}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;