import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../Hooks/useCart"; // Import the custom hook
import "bootstrap/dist/css/bootstrap.min.css";

function Menu() {
  const navigate = useNavigate();
  const { cartItems, addItemToCart, clearCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const menuItems = [
    { id: 1, name: "Espresso", description: "Strong and rich coffee", price: 150 },
    { id: 2, name: "Latte", description: "Smooth coffee with milk", price: 200 },
    { id: 3, name: "Cappuccino", description: "Frothy coffee with milk", price: 180 },
    { id: 4, name: "Americano", description: "Espresso diluted with hot water", price: 160 },
    { id: 5, name: "Mocha", description: "Chocolate-flavored coffee", price: 220 },
    { id: 6, name: "Macchiato", description: "Espresso with a touch of milk", price: 170 },
  ];

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Our Coffee Menu</h2>
      <div className="row">
        {menuItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title">{item.name}</h3>
                <p className="card-text">{item.description}</p>
                <p className="card-text"><strong>Price: ₹{item.price}</strong></p>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="form-control mb-2"
                />
                <button
                  onClick={() => addItemToCart({ ...item, quantity })}
                  className="btn btn-primary w-100"
                  disabled={isInCart(item.id)}
                  aria-label={`Add ${item.name} to cart`}
                >
                  {isInCart(item.id) ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/cart")}
        className="btn btn-success mt-4 w-100"
        disabled={totalItemsInCart === 0}
      >
        View Cart ({totalItemsInCart})
      </button>
      <button
        onClick={clearCart}
        className="btn btn-danger mt-2 w-100"
        disabled={totalItemsInCart === 0}
      >
        Clear Cart
      </button>
    </div>
  );
}

export default Menu;
