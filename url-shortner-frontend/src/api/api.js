import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  maxRedirects: 0,
  validateStatus: (status) => {
    return status >= 200 && status < 400;
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      url: config.url,
      method: config.method,
    });
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      headers: response.headers,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error);
    return Promise.reject(error);
  }
);

export default api;
