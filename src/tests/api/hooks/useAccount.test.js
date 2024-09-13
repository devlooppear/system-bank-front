import { renderHook, waitFor } from "@testing-library/react";
import apiService from "../../../api/apiService";
import { useAccounts } from "../../../api/hooks/useAccount";
import { vi } from "vitest";

vi.mock("../../../api/apiService");

describe("useAccounts", () => {
  const userId = 1;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch accounts successfully", async () => {
    const mockAccounts = [
      {
        id: 1,
        user_id: userId,
        balance: 1000,
        account_type: "CORRENTE",
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
      },
      {
        id: 2,
        user_id: userId,
        balance: 500,
        account_type: "POUPANCA",
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
      },
    ];

    apiService.get.mockResolvedValueOnce({
      data: { data: mockAccounts },
    });

    const { result } = renderHook(() => useAccounts(userId));

    await waitFor(() => {
      expect(result.current.accounts).toEqual(mockAccounts);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it("should handle error when fetching accounts", async () => {
    const mockErrorMessage = "Failed to fetch accounts";
    apiService.get.mockRejectedValueOnce(new Error(mockErrorMessage));

    const { result } = renderHook(() => useAccounts(userId));

    await waitFor(() => {
      expect(result.current.accounts).toEqual([]);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(mockErrorMessage);
    });
  });
});
