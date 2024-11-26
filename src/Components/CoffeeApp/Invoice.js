import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import successLogo from '../assets/successLogo.png';
import axios from "axios";

const Success = () => {
  const { transactionId } = useParams();  // Fetch the transactionId from the URL params
  const navigate = useNavigate();
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);  // Set to true to show loading initially
  const [error, setError] = useState(null); // State for error handling

  const fetchTransactionDetails = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/transaction-details/${transactionId}`);
      setTransactionDetails(response.data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      setError("Error fetching transaction details.");
    } finally {
      setLoading(false);  // Set loading to false once the request finishes
    }
  };

  const generateInvoice = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/generate-invoice/", {
        transaction_id: transactionId,
      });
  
      if (response.data.invoice_url) {
        window.open(response.data.invoice_url, "_blank");
      } else {
        alert("Failed to generate invoice.");
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
      alert("Error generating invoice.");
    }
  };

  useEffect(() => {
    fetchTransactionDetails();
  }, [transactionId]);

  if (loading) {
    return (
      <div className="text-center">
        <p>Loading transaction details...</p>
      </div>
    );
  }

  return (
    <div className="success-container container py-5">
      <h2 className="text-center mb-4">Payment Successful!</h2>
      <div className="text-center">
        <img
          src={successLogo}
          alt="Payment Success"
          className="success-logo mb-4"
          style={{ width: "150px", height: "auto" }}
        />
      </div>
      <div className="mt-4 text-center">
        <p>Your payment was successful. Thank you for your purchase!</p>
        <p>Transaction ID: {transactionId}</p>
      </div>

      {error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        transactionDetails && (
          <div className="transaction-details mt-4">
            <h4>Order Summary</h4>
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
                {transactionDetails.cart_items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="lead">
              <p>Total Amount: ₹{transactionDetails.total_amount.toFixed(2)}</p>
            </div>
          </div>
        )
      )}

      <div className="text-center mt-4">
        <button className="btn btn-primary mx-2" onClick={generateInvoice}>
          Generate Invoice
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate("/")}>
          Go to Menu
        </button>
      </div>
    </div>
  );
};

export default Success;