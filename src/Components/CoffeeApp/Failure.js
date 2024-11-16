import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      <h2 className="text-center text-danger">Payment Failed</h2>
      <p className="text-center">There was an issue with your payment. Please try again.</p>
      <div className="text-center">
        <button onClick={() => navigate("/cart")} className="btn btn-warning">
          Back to Cart
        </button>
      </div>
    </div>
  );
};

export default Failure;
