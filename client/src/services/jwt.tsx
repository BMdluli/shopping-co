import { jwtDecode } from "jwt-decode";

export const getUserIdFromToken = () => {
  try {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    return decodedToken.userId;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const deleteTokenIfExists = () => {
  if (localStorage.getItem("token")) localStorage.removeItem("token");
};
