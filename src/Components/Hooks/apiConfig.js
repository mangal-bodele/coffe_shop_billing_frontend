// src/config/apiConfig.js
const API_BASE_URL = "https://coffeeshopbillingbackend-production.up.railway.app/api/v1";

export const CREATE_PAYMENT_URL = `${API_BASE_URL}/create-payment/`;
export const VERIFY_PAYMENT_URL = `${API_BASE_URL}/verify-payment/`;
export const GET_INVOICE_URL = (transactionId) => `${API_BASE_URL}/invoice/${transactionId}/`;
