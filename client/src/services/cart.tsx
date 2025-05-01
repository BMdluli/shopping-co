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
  return response.data.data; // returns { newArrivals, topSelling }
};
