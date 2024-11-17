import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems = [], totalAmount = 0 } = location.state || {};
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!cartItems.length || totalAmount <= 0) {
      alert("Cart is empty or invalid total amount.");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please try again later.");
      return;
    }

    try {
      setLoading(true);
      const orderResponse = await axios.post(
        "http://127.0.0.1:8000/api/v1/create-payment/",
        {
          cart_items: cartItems,
          total_amount: totalAmount,
        }
      );

      const { orderId, razorpayKey, currency } = orderResponse.data;

      const options = {
        key: razorpayKey,
        amount: totalAmount * 100,
        currency,
        order_id: orderId,
        handler: async (response) => {
          try {
            const verificationResponse = await axios.post(
              "http://127.0.0.1:8000/api/v1/verify-payment/",
              {
                payment_id: response.razorpay_payment_id,
                order_id: orderId,
                signature: response.razorpay_signature,
              }
            );

            const { transaction_id } = verificationResponse.data;
            if (transaction_id) {
              navigate(`/success/${transaction_id}`);
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please try again.");
            navigate("/failure");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Error initiating payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="payment-loading text-center py-5">
      <p>Processing your payment...</p>
      <div className="spinner-border" role="status"></div>
    </div>
  ) : (
    <div className="payment-container container py-5">
      <h2 className="text-center mb-4">Payment</h2>
      <div className="mb-4">
        <h4>Order Summary</h4>
        {cartItems.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Subtotal (₹)</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <div className="text-center mb-4">
        <p className="lead">Total Amount: ₹{totalAmount.toFixed(2)}</p>
      </div>
      <div className="text-center">
        <button
          onClick={handlePayment}
          className="btn btn-success btn-lg payment-button"
          disabled={loading || !cartItems.length}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
