export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://scholaria-api.onrender.com"
    : "http://localhost:3456";
