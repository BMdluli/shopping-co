import axios from "axios";
import { getUserIdFromToken } from "./jwt";

export const fetchUserById = async (userId: string) => {
  const response = await axios.get(`http://localhost:3000/api/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return response.data;
};

export const modifyAddress = async (data: {
  country: string;
  city: string;
  streetAddress: string;
  postalCode: string;
}) => {
  const response = await axios.put(
    `${
      import.meta.env.VITE_BACKEND_URL
    }api/user/${getUserIdFromToken()}/address`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return response.data;
};
