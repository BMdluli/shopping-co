import axios from "axios";

export const fetchOrders = async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}api/orders`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data.data;
};
