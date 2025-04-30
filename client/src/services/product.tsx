// services/products.js
import axios from "axios";

export const fetchHomeSections = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/products/home-section"
  );
  return response.data.data; // returns { newArrivals, topSelling }
};
