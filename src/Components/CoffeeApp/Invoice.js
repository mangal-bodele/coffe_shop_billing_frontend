// src/components/Invoice.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GET_INVOICE_URL } from "../config/apiConfig";

const Invoice = () => {
  const { transactionId } = useParams(); // Get transactionId from URL
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState("");

  // Fetch invoice data when component mounts
  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setError("");
        setInvoiceData(null);

        // Fetch invoice data from the backend based on the transaction ID
        const response = await axios.get(GET_INVOICE_URL(transactionId));
        setInvoiceData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "An error occurred");
      }
    };

    if (transactionId) {
      fetchInvoice();
    }
  }, [transactionId]);

  return (
    <div>
      <h1>Invoice</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {invoiceData ? (
        <div>
          <h2>Invoice Details</h2>
          <p><strong>Transaction ID:</strong> {invoiceData.razorpay_order_id}</p>
          <p><strong>Payment ID:</strong> {invoiceData.razorpay_payment_id}</p>
          <p><strong>Status:</strong> {invoiceData.status}</p>
          <p><strong>Created At:</strong> {invoiceData.created_at}</p>
          
          <h3>Order Details:</h3>
          <p><strong>Order ID:</strong> {invoiceData.order_details.order_id}</p>
          <p><strong>Customer Name:</strong> {invoiceData.order_details.customer_name}</p>
          <p><strong>Total Amount:</strong> ₹{invoiceData.order_details.total_amount}</p>
          <p><strong>Order Status:</strong> {invoiceData.order_details.status}</p>
          <p><strong>Order Created At:</strong> {invoiceData.order_details.created_at}</p>
        </div>
      ) : (
        <p>Loading invoice...</p>
      )}
    </div>
  );
};

export default Invoice;
