import { Navigate, Outlet } from "react-router-dom";

const isValidJWT = (token: any) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < now) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

const ProtectedRoute = () => {
  const authToken = localStorage.getItem("authToken");

  if (!authToken || !isValidJWT(authToken)) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
