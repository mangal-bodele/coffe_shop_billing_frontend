import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../Hooks/useCart"; // Import the custom hook

function Menu() {
  const navigate = useNavigate();
  const { cartItems, addItemToCart, clearCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  // Menu items array with image URLs
  const menuItems = [
    {
      id: 1,
      name: "Espresso",
      description: "Strong and rich coffee",
      price: 150,
      image: "https://via.placeholder.com/150?text=Espresso", // Replace with actual image URL
    },
    {
      id: 2,
      name: "Latte",
      description: "Smooth coffee with milk",
      price: 200,
      image: "https://via.placeholder.com/150?text=Latte", // Replace with actual image URL
    },
    {
      id: 3,
      name: "Cappuccino",
      description: "Frothy coffee with milk",
      price: 180,
      image: "https://via.placeholder.com/150?text=Cappuccino", // Replace with actual image URL
    },
    {
      id: 4,
      name: "Americano",
      description: "Espresso diluted with hot water",
      price: 160,
      image: "https://via.placeholder.com/150?text=Americano", // Replace with actual image URL
    },
    {
      id: 5,
      name: "Mocha",
      description: "Chocolate-flavored coffee",
      price: 220,
      image: "https://via.placeholder.com/150?text=Mocha", // Replace with actual image URL
    },
    {
      id: 6,
      name: "Macchiato",
      description: "Espresso with a touch of milk",
      price: 170,
      image: "https://via.placeholder.com/150?text=Macchiato", // Replace with actual image URL
    },
  ];

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  return (
    <div className="container m-auto mt-5">
      <h2 className="text-center mb-5">Welcome to Our Coffee Cafe</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {menuItems.map((item) => (
          <div key={item.id} className="col">
            <div className="card shadow-sm h-100">
              <img
                src={item.image}
                alt={item.name}
                className="card-img-top"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text">
                  <strong>Price: ₹{item.price}</strong>
                </p>
                <button
                  onClick={() => addItemToCart({ ...item, quantity })}
                  className={`btn ${isInCart(item.id) ? "btn-secondary" : "btn-primary"}`}
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
      <div className="d-flex justify-content-between mt-5">
        <button
          onClick={clearCart}
          className="btn btn-danger btn-lg rounded-pill"
          disabled={totalItemsInCart === 0}
        >
          🗑️ Clear Cart
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="btn btn-success btn-lg rounded-pill"
          disabled={totalItemsInCart === 0}
        >
          🛒 View Cart ({totalItemsInCart})
        </button>
      </div>
    </div>
  );
}

export default Menu;
