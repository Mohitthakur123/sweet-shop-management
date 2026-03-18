import axios from "axios";

/*
  Backend base URL comes from Netlify env variable
  Netlify:
  VITE_API_URL = https://sweet-shop-management-rvcp.onrender.com
*/
const API_BASE_URL = import.meta.env.VITE_API_URL + "/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ======================
   REQUEST INTERCEPTOR
====================== */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================
   LOGOUT HELPER
====================== */
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

/* ======================
   RESPONSE INTERCEPTOR
====================== */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // Token expired / invalid
      if (status === 401) {
        logout();
        return Promise.reject(new Error("Session expired"));
      }

      throw new Error(data?.error || "Request failed");
    }

    if (error.request) {
      throw new Error("No response from server");
    }

    throw new Error(error.message);
  }
);

export default api;

/* ======================
   SWEET APIs
====================== */

export const getSweets = () => api.get("/sweets");

export const getSweetById = (id) => api.get(`/sweets/${id}`);

export const addSweet = (sweetData) => api.post("/sweets", sweetData);

export const updateSweet = (id, sweetData) =>
  api.put(`/sweets/${id}`, sweetData);

export const deleteSweet = (id) => api.delete(`/sweets/${id}`);

export const purchaseSweet = (id, quantity) =>
  api.post(`/sweets/${id}/purchase`, { quantity });

export const restockSweet = (id, quantity) =>
  api.post(`/sweets/${id}/restock`, { quantity });

export const searchSweets = (params) =>
  api.get("/sweets/search", { params });

/* ======================
   AUTH APIs
====================== */

export const registerUser = (userData) =>
  api.post("/auth/register", userData);

export const loginUser = (credentials) =>
  api.post("/auth/login", credentials);
