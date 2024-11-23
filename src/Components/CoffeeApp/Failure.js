import React from "react";
import { useNavigate } from "react-router-dom";
import PaymentFailure from "../assets/payment-failed.png"; // Import your SVG

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="failure-container text-center py-5">
      {/* Payment Failure SVG */}
      <img 
        src={PaymentFailure} 
        alt="Payment Failed" 
        className="img-fluid failure-svg" 
      />

      {/* Payment Failure Message */}
      <h2 className="text-danger mt-4">Payment Failed</h2>
      <p className="failure-message">
        There was an issue with your payment. Please try again.
      </p>

      {/* Back to Cart Button */}
      <div className="mt-4">
        <button
          onClick={() => navigate("/cart")}
          className="btn btn-warning retry-btn"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Failure;
