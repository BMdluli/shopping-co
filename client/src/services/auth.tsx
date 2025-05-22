import axios from "axios";

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}api/login`,
    data
  );

  return response.data.data;
};

export const signup = async (data: {
  email: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  dob: string;
  phone: string;
}) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}api/register`,
    data
  );

  return response.data.data;
};
