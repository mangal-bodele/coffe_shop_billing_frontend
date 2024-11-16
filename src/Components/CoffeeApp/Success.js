import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import successLogo from "../assets/successLogo.png"; // Add a success logo in your project directory

const Success = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  // Dynamically get the backend base URL (for local development or production)
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

  const handleDownloadInvoice = () => {
    // Call backend to generate and download the invoice
    window.open(`${backendUrl}/api/v1/invoice/${transactionId}/`, "_blank");
  };

  return (
    <div className="container py-5 text-center">
      <img src={successLogo} alt="Success Logo" className="mb-4" style={{ width: "100px", height: "100px" }} />
      <h2 className="text-success">Payment Successful!</h2>
      <p>Your transaction ID is <strong>{transactionId}</strong>.</p>

      <div className="mt-4">
        <button
          className="btn btn-primary me-3"
          onClick={handleDownloadInvoice}
        >
          Download Invoice
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
