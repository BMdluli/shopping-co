import axios from "axios";

export const addToCart = async (data: {
  productId: string;
  quantity: number;
  size: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}api/cart/items`,
    data,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem(`token`)}` },
    }
  );
  return response.data.data;
};

export const removeItemFromCart = async (itemId: string) => {
  const response = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}api/cart/items/${itemId}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem(`token`)}` },
    }
  );
  return response.data.data;
};

export const fetchCart = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}api/cart`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem(`token`)}` },
    }
  );
  return response.data.data;
};
