import axios from "axios";

const API_BASE_URL = 'http://localhost:5000/api';
// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 👇 MODIFIED: Add the token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Your excellent response interceptor for handling errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.error || "Request failed");
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message);
    }
  }
);

// --- Sweet API Functions ---

export const getSweets = () => api.get("/sweets");

export const getSweetById = (id) => api.get(`/sweets/${id}`);

export const addSweet = (sweetData) => api.post("/sweets", sweetData);

export const updateSweet = (id, sweetData) => api.put(`/sweets/${id}`, sweetData);

export const deleteSweet = (id) => api.delete(`/sweets/${id}`);

export const purchaseSweet = (id, quantity) => api.post(`/sweets/${id}/purchase`, { quantity });

export const restockSweet = (id, quantity) => api.post(`/sweets/${id}/restock`, { quantity });

export const searchSweets = (params) => api.get("/sweets/search", { params });


// --- Auth API Functions ---

// 👇 ADDED: Functions for user authentication
export const registerUser = (userData) => api.post('/auth/register', userData);

export const loginUser = (credentials) => api.post('/auth/login', credentials);