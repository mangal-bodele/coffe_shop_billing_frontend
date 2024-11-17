import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import successLogo from "../assets/successLogo.png"; 

const Success = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  // Backend base URL
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:8000";

  const handleDownloadInvoice = () => {
    // Open the invoice in a new tab
    window.open(`${backendUrl}/api/v1/invoice/${transactionId}/`, "_blank");
  };

  return (
    <div className="success-container text-center py-5">
      <img
        src={successLogo}
        alt="Success Logo"
        className="success-logo mb-4"
      />
      <h2 className="text-success">Payment Successful!</h2>
      <p className="transaction-text">
        Your transaction ID is <strong>{transactionId}</strong>.
      </p>
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
