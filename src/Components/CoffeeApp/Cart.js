import React from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../Hooks/useCart";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart, removeItemFromCart, updateItemQuantity } = useCart();

  const increaseQuantity = (item) => updateItemQuantity(item.id, item.quantity + 1);

  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    } else {
      removeItemFromCart(item.id);
      toast.success(`${item.name} removed from the cart!`);
    }
  };

  const removeItem = (item) => {
    removeItemFromCart(item.id);
    toast.success(`${item.name} removed from the cart!`);
  };

  const proceedToPayment = () => {
    if (cartItems.length > 0) {
      navigate("/payment", { state: { cartItems, totalAmount } });
    } else {
      toast.error("Your cart is empty! Add some items to proceed.");
    }
  };

  const goToMenu = () => navigate("/");

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQuantity(item)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQuantity(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => removeItem(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between">
            <button
              onClick={clearCart}
              className="btn btn-warning"
              disabled={cartItems.length === 0}
            >
              Clear Cart
            </button>
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
            <button
              onClick={proceedToPayment}
              className="btn btn-success"
              disabled={cartItems.length === 0}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p>Your cart is empty. Let’s add some coffee!</p>
          <img
            src="/images/empty-cart.png"
            alt="Empty Cart"
            className="img-fluid"
            style={{ maxHeight: "200px" }}
          />
          <button onClick={goToMenu} className="btn btn-primary mt-3">
            Browse Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
