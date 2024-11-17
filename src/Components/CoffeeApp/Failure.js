import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="failure-container text-center py-5">
      <h2 className="text-danger">Payment Failed</h2>
      <p className="failure-message">
        There was an issue with your payment. Please try again.
      </p>
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
