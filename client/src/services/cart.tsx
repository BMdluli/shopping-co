import axios from "axios";

export const addToCart = async (data: {
  productId: string;
  quantity: number;
  size: string;
}) => {
  const response = await axios.post(
    "http://localhost:3000/api/cart/items",
    data,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data.data;
};

export const removeItemFromCart = async (itemId: string) => {
  const response = await axios.delete(
    `http://localhost:3000/api/cart/items/${itemId}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return response.data.data;
};

export const fetchCart = async () => {
  const response = await axios.get("http://localhost:3000/api/cart", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data.data;
};
