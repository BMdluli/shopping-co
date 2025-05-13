import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Orders from "./pages/Orders";
import Account from "./pages/Account";
import { Toaster } from "react-hot-toast";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
