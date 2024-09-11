import { Navigate, Outlet } from "react-router-dom";
import jwt from "jsonwebtoken";

const ProtectedRoute = () => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  if (authToken.length < 80) {
    return <Navigate to="/login" />;
  }

  try {
    const secretKey = import.meta.env.VITE_JWT_SECRET;
    jwt.verify(authToken, secretKey);
  } catch (error) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
