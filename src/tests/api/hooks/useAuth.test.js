import { renderHook, act } from '@testing-library/react';
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess, logout } from "../../../store/authSlice";
import apiService from "../../../api/apiService";
import useAuth from "../../../api/hooks/useAuth";
import { describe, it, expect, vi } from 'vitest';

vi.mock("react-redux", () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}));

vi.mock("../../../api/apiService");

const mockDispatch = vi.fn();
const mockUseSelector = vi.fn();

describe("useAuth Hook", () => {
  beforeAll(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    vi.clearAllMocks();
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation(mockUseSelector);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should successfully log in a user", async () => {
    const mockUserId = 123;
    const mockToken = "mockToken";

    apiService.post.mockResolvedValueOnce({
      data: { token: mockToken, user_id: mockUserId },
    });

    mockUseSelector.mockReturnValue({ loading: false, error: null, user_id: null });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login("test@example.com", "password");
    });

    expect(mockDispatch).toHaveBeenCalledWith(loginStart());
    expect(mockDispatch).toHaveBeenCalledWith(loginSuccess({ token: mockToken, user_id: mockUserId }));
    expect(localStorage.getItem("authToken")).toBe(mockToken);
    expect(localStorage.getItem("user_id")).toBe(String(mockUserId));
  });

  it("should handle login failure", async () => {
    const mockErrorMessage = "Login failed";

    apiService.post.mockRejectedValueOnce(new Error(mockErrorMessage));

    mockUseSelector.mockReturnValue({ loading: false, error: null, user_id: null });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login("test@example.com", "wrongpassword");
    });

    expect(mockDispatch).toHaveBeenCalledWith(loginStart());
    expect(mockDispatch).toHaveBeenCalledWith(loginFailure(mockErrorMessage));
  });

  it("should log out a user", async () => {
    const mockUserId = 123;

    localStorage.setItem("user_id", String(mockUserId));

    apiService.delete.mockResolvedValueOnce({
      data: { message: "User logged out" },
    });

    mockUseSelector.mockReturnValue({ loading: false, error: null, user_id: mockUserId });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(localStorage.getItem("authToken")).toBeNull();
    expect(localStorage.getItem("user_id")).toBeNull();
    expect(mockDispatch).toHaveBeenCalledWith(logout());
  });

  it("should handle logout failure", async () => {
    const mockUserId = 123;

    localStorage.setItem("user_id", String(mockUserId));

    apiService.delete.mockRejectedValueOnce(new Error("Logout failed"));

    mockUseSelector.mockReturnValue({ loading: false, error: null, user_id: mockUserId });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(console.error).toHaveBeenCalledWith("Logout failed");
  });
});
