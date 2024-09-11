import { useDispatch, useSelector } from "react-redux";
import apiService from "../apiService";
import { AppDispatch, RootState } from "../../store/store";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "../../store/authSlice";

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user_id } = useSelector(
    (state: RootState) => state.auth
  );

  const login = async (email: string, password: string) => {
    dispatch(loginStart());

    try {
      const response = await apiService.post("auth/login", { email, password });

      const { token, user_id } = response.data;
      dispatch(loginSuccess({ token, user_id }));

      return response.data;
    } catch (err) {
      dispatch(
        loginFailure(err instanceof Error ? err.message : "An error occurred")
      );
    }
  };

  const logoutUser = async () => {
    try {
      if (user_id) {
        const response = await apiService.delete("auth/logout", {
          data: { user_id },
        });

        if (response.data.message === "User logged out") {
          dispatch(logout());
        }
      } else {
        throw new Error("User ID not found");
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return { login, logout: logoutUser, loading, error };
};

export default useAuth;
