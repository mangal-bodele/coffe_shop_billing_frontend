import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import successLogo from '../assets/successLogo.png'

const Success = () => {
  const { transactionId } = useParams(); // Get the transaction ID from the URL
  const navigate = useNavigate();

  const handleGenerateInvoice = () => {
    // Redirect to the Invoice page, passing the transaction ID
    navigate(`/invoice/${transactionId}`);
  };

  return (
    <div className="success-container text-center py-5">
      <img
        src={successLogo}
        alt="Success Logo"
        className="success-logo mb-4"
        width={200}
        height={200}
      />
      <h1 className="text-success">Payment Successful!</h1>
      <p className="lead">
        Thank you for your payment. Your transaction ID is: <strong>{transactionId}</strong>
      </p>
      <button
        className="btn btn-primary btn-lg mt-4"
        onClick={handleGenerateInvoice}
      >
        Generate Invoice
      </button>
    </div>
  );
};

export default Success;
