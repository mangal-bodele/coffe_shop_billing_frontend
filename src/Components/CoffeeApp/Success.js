import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import successLogo from '../assets/successLogo.png';

const Success = () => {
  const { transactionId } = useParams(); // Get the Razorpay payment ID (transactionId)
  const navigate = useNavigate();

  const INVOICE_GENERATION_URL = `http://127.0.0.1:8000/api/v1/generate-invoice`; // Replace with your backend's actual URL

  const handleGenerateInvoice = async () => {
    try {
      const response = await axios.get(`${INVOICE_GENERATION_URL}/${transactionId}`, {
        responseType: "blob", // Ensure the response is treated as a file download
      });

      // Create a URL for the downloaded file
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${transactionId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Failed to generate invoice. Please try again.");
    }
  };

  const handleShopAgain = () => {
    navigate("/"); // Redirect to the homepage or another page as needed
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
      <button
        className="btn btn-secondary btn-lg mt-4"
        onClick={handleShopAgain}
      >
        Shop Again
      </button>
    </div>
  );
};

export default Success;
