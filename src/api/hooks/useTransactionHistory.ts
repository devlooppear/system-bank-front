import { useState, useEffect } from "react";
import apiService from "../apiService";

export interface TransactionHistory {
  id: number;
  transaction_id: number;
  user_id: number;
  movement_date: Date;
  created_at: Date;
  updated_at: Date;
}

const useTransactionHistory = () => {
  const [transactionHistories, setTransactionHistories] = useState<
    TransactionHistory[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactionHistories = async (
    page: number = 1,
    limit: number = 10
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get("transaction-histories", {
        params: { page, limit },
      });

      setTransactionHistories(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionHistoryById = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiService.get(`transaction-histories/${id}`);
      return response.data.data as TransactionHistory;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTransactionHistory = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      await apiService.delete(`transaction-histories/${id}`);
      setTransactionHistories((prev) =>
        prev.filter((history) => history.id !== id)
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionHistories();
  }, []);

  return {
    transactionHistories,
    fetchTransactionHistories,
    fetchTransactionHistoryById,
    removeTransactionHistory,
    loading,
    error,
  };
};

export default useTransactionHistory;
