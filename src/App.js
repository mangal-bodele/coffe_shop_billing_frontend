import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/CoffeeApp/Cart";
import Menu from "./Components/CoffeeApp/Menu";
import Payment from "./Components/CoffeeApp/Payment";
import Success from "./Components/CoffeeApp/Success";
import Failure from "./Components/CoffeeApp/Failure";
import useCart from "./Components/Hooks/useCart";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Hero from "./Components/Layout/Hero";
import Invoice from "./Components/CoffeeApp/Invoice";

function App() {
  const {
    cartItems,
    addItemToCart,
    clearCart,
    removeItemFromCart,
    updateItemQuantity,
    totalAmount,
  } = useCart();

  return (
    <Router>
      {/* Navbar for consistent navigation */}
      <Navbar />
      <Hero />

      <div className="container mt-4">
        <Routes>
          {/* Menu route */}
          <Route
            path="/"
            element={<Menu cart={cartItems} setCart={addItemToCart} />}
          />

          {/* Cart route */}
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                totalAmount={totalAmount}
                clearCart={clearCart}
                removeItemFromCart={removeItemFromCart}
                updateItemQuantity={updateItemQuantity}
              />
            }
          />

          {/* Payment route */}
          <Route
            path="/payment"
            element={
              <Payment totalAmount={totalAmount} cartItems={cartItems} />
            }
          />

          {/* Success route */}
          <Route path="/success/:transactionId" element={<Success />} />
          <Route path="/invoice/:transactionId" element={<Invoice />} />

          {/* Failure route */}
          <Route path="/failure" element={<Failure />} />
          

          {/* 404 Page Not Found */}
          <Route
            path="*"
            element={<h2 className="text-center">404 - Page Not Found</h2>}
          />
        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
