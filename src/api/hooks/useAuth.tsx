import { useState } from "react";
import apiService from "../apiService";

export interface LoginResponse {
  message: string;
  user_id: number;
  token: string;
}

const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.post<LoginResponse>("auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_id", response.data.user_id.toString());

      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);

    const userId = localStorage.getItem("user_id");

    try {
      if (userId) {
        await apiService.post("auth/logout", { user_id: Number(userId) });

        localStorage.removeItem("token");
        localStorage.removeItem("user_id");

        return { message: "User logged out" };
      } else {
        throw new Error("User ID not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { login, logout, loading, error };
};

export default useAuth;
