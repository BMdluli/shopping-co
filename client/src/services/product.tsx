// services/products.js
import axios from "axios";

export const fetchHomeSections = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/products/home-section"
  );
  return response.data.data; // returns { newArrivals, topSelling }
};

export const fetchProduct = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/api/products/${id}`);

  return response.data.data[0];
};

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await axios.get(
    `http://localhost:3000/api/products?${query}`
  );
  return response.data;
};
