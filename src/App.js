import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from './Components/CoffeeApp/Cart';
import Menu from './Components/CoffeeApp/Menu';
import Payment from './Components/CoffeeApp/Payment';
import Success from './Components/CoffeeApp/Success';  // Added the import for Success
import Failure from './Components/CoffeeApp/Failure';
import useCart from './Components/Hooks/useCart';
import Navbar from "./Components/Layout/Navbar";

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
      {/* Navbar Component for consistent navigation */}
      <Navbar />
      
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
              <Payment
                totalAmount={totalAmount}
                cartItems={cartItems}
              />
            }
          />

          {/* Success route - Added the Success page route */}
          <Route
            path="/success/:transactionId"
            element={<Success />}
          />

          {/* Failure route */}
          <Route
            path="/failure"
            element={<Failure />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
