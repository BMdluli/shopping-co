import axios from "axios";

export const fetchHomeSections = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}api/products/home-section`
  );
  return response.data.data; // returns { newArrivals, topSelling }
};

export const fetchProduct = async (id: string) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}api/products/${id}`
  );

  return response.data.data;
};

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}api/products?${query}`
  );
  return response.data;
};
