import { renderHook, waitFor } from "@testing-library/react";
import apiService from "../../../api/apiService";
import { useUserById } from "../../../api/hooks/useUser";
import { vi } from "vitest";

vi.mock("../../../api/apiService");

describe("useUserById", () => {
  const userId = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch user successfully by ID", async () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      created_at: "2024-01-01",
      updated_at: "2024-01-01",
    };

    apiService.get.mockResolvedValueOnce({
      data: { data: mockUser },
    });

    const { result } = renderHook(() => useUserById(userId));

    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it("should handle error when fetching user by ID", async () => {
    const mockErrorMessage = "Failed to fetch user";
    apiService.get.mockRejectedValueOnce(new Error(mockErrorMessage));

    const { result } = renderHook(() => useUserById(userId));

    await waitFor(() => {
      expect(result.current.user).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(mockErrorMessage);
    });
  });
});
