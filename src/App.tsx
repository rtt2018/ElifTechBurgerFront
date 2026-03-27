import "./App.css";
import { Route, Routes, Navigate } from "react-router";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Order from "./pages/Order/Order";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:shopName" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<Order />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
