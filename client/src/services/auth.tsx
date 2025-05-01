import axios from "axios";

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post("http://localhost:3000/api/login", data);

  return response.data.data;
};

export const signup = async (data: {
  email: string;
  username: string;
  password: string;
}) => {
  const response = await axios.post("http://localhost:3000/api/register", data);

  return response.data.data;
};
