import { renderHook, waitFor, act } from "@testing-library/react";
import apiService from "../../../api/apiService";
import useTransaction from "../../../api/hooks/useTransaction";
import { vi } from "vitest";

vi.mock("../../../api/apiService");

describe("useTransaction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch transactions successfully", async () => {
    const mockTransactions = [
      {
        id: 1,
        account_id: 1,
        transaction_type: "TED",
        amount: 100,
        transaction_date: "2024-01-01",
        cpf_recipient: null,
        cnpj_recipient: null,
        recipient_name: "Recipient Name",
        bank: "Bank Name",
        branch: "Branch Name",
        account_recipient: "123456",
        pix_key: "example_key",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
      },
    ];

    const mockMeta = {
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    };

    apiService.get.mockResolvedValueOnce({
      data: {
        data: mockTransactions,
        meta: mockMeta,
      },
    });

    const { result } = renderHook(() => useTransaction());

    await act(async () => {
      await result.current.fetchTransactions();
    });

    await waitFor(() => {
      expect(result.current.transactions).toEqual(mockTransactions);
      expect(result.current.meta).toEqual(mockMeta);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it("should handle error when fetching transactions", async () => {
    const mockErrorMessage = "Failed to fetch transactions";
    apiService.get.mockRejectedValueOnce(new Error(mockErrorMessage));

    const { result } = renderHook(() => useTransaction());

    await act(async () => {
      await result.current.fetchTransactions();
    });

    await waitFor(() => {
      expect(result.current.transactions).toEqual([]);
      expect(result.current.meta).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(mockErrorMessage);
    });
  });

  it("should create transaction successfully", async () => {
    const mockTransaction = {
      id: 1,
      account_id: 1,
      transaction_type: "PIX",
      amount: 200,
      transaction_date: "2024-02-01",
      cpf_recipient: null,
      cnpj_recipient: null,
      recipient_name: "Another Recipient",
      bank: "Another Bank",
      branch: "Another Branch",
      account_recipient: "654321",
      pix_key: "another_key",
      created_at: "2024-02-01T00:00:00Z",
      updated_at: "2024-02-01T00:00:00Z",
    };

    apiService.post.mockResolvedValueOnce({});
    apiService.get.mockResolvedValueOnce({
      data: {
        data: [mockTransaction],
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      },
    });

    const { result } = renderHook(() => useTransaction());

    const createResult = await act(async () => {
      return await result.current.createTransaction({
        transaction: {
          ...mockTransaction,
          id: undefined,
          created_at: undefined,
          updated_at: undefined,
          account_id: undefined,
        },
      });
    });

    await waitFor(() => {
      expect(createResult).toBe(true);
      expect(result.current.transactions).toEqual([mockTransaction]);
      expect(result.current.success).toBe(true);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it("should handle error when creating transaction", async () => {
    const mockErrorMessage = "Failed to create transaction";
    apiService.post.mockRejectedValueOnce(new Error(mockErrorMessage));

    const { result } = renderHook(() => useTransaction());

    const createResult = await act(async () => {
      return await result.current.createTransaction({
        transaction: {
          id: 1,
          account_id: 1,
          transaction_type: "PIX",
          amount: 200,
          transaction_date: "2024-02-01",
          cpf_recipient: null,
          cnpj_recipient: null,
          recipient_name: "Another Recipient",
          bank: "Another Bank",
          branch: "Another Branch",
          account_recipient: "654321",
          pix_key: "another_key",
          created_at: "2024-02-01T00:00:00Z",
          updated_at: "2024-02-01T00:00:00Z",
        },
      });
    });

    await waitFor(() => {
      expect(createResult).toBe(false);
      expect(result.current.success).toBe(false);
      expect(result.current.error).toBe(mockErrorMessage);
      expect(result.current.loading).toBe(false);
    });
  });
});
