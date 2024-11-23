import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../Hooks/useCart";

// Import images
import espressoImage from "../assets/espresso.png";
import latteImage from "../assets/latte.png";
import cappuccinoImage from "../assets/cappuccino.png";
import americanoImage from "../assets/americano.png";
import mochaImage from "../assets/mocha.png";
import macchiatoImage from "../assets/macchiato.png";

function Menu() {
  const navigate = useNavigate();
  const { cartItems, addItemToCart, clearCart } = useCart();
  const [quantity] = useState(1); // Default quantity is always 1

  // Menu items
  const menuItems = [
    { id: 1, name: "Espresso", price: 150, image: espressoImage },
    { id: 2, name: "Latte", price: 200, image: latteImage },
    { id: 3, name: "Cappuccino", price: 180, image: cappuccinoImage },
    { id: 4, name: "Americano", price: 160, image: americanoImage },
    { id: 5, name: "Mocha", price: 220, image: mochaImage },
    { id: 6, name: "Macchiato", price: 170, image: macchiatoImage },
  ];

  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Welcome to Our Coffee Cafe</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {/* Loop through menuItems and display each one */}
        {(() => {
          const items = [];
          for (let i = 0; i < menuItems.length; i++) {
            const item = menuItems[i];
            items.push(
              <div key={item.id} className="col">
                <div className="card shadow-sm h-100 text-center">
                  <img src={item.image} alt={item.name} className="card-img-top" />
                  <div className="card-body">
                    <h5>{item.name}</h5>
                    <p>Price: ₹{item.price}</p>
                    <button
                      onClick={() => addItemToCart({ ...item, quantity })}
                      disabled={cartItems.some((cartItem) => cartItem.id === item.id)}
                    >
                      {cartItems.some((cartItem) => cartItem.id === item.id) ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return items;
        })()}
      </div>
      <div className="d-flex justify-content-between mt-5">
        <button
          onClick={clearCart}
          className="btn btn-danger btn-lg rounded-pill"
          disabled={totalItemsInCart === 0}
        >
          Clear Cart
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="btn btn-success btn-lg rounded-pill"
          disabled={totalItemsInCart === 0}
        >
          View Cart ({totalItemsInCart})
        </button>
      </div>
    </div>
  );
}

export default Menu;
