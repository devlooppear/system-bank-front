import { useEffect, useState } from "react";
import apiService from "../apiService";

export enum TransactionType {
  TED = "TED",
  PIX = "PIX",
}

export interface Transaction {
  id: number;
  account_id: number;
  transaction_type: TransactionType;
  amount: number;
  transaction_date: string;
  cpf_recipient: string | null;
  cnpj_recipient: string | null;
  recipient_name: string;
  bank: string;
  branch: string;
  account_recipient: string;
  pix_key: string;
  created_at: string;
  updated_at: string;
}

export interface TransactionResponse {
  data: Transaction[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

const useTransaction = (
  queryParams: {
    page?: number;
    limit?: number;
    transaction_type?: TransactionType;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    user_id?: number;
  } = {}
) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  const {
    page = 1,
    limit = 10,
    transaction_type,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    sortBy,
    sortOrder = "asc",
    user_id,
  } = queryParams;

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get<TransactionResponse>(
          "/transactions",
          {
            params: {
              page,
              limit,
              transaction_type,
              startDate,
              endDate,
              minAmount,
              maxAmount,
              sortBy,
              sortOrder,
              user_id,
            },
          }
        );

        setTransactions(response.data.data);
        setMeta(response.data.meta);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [
    page,
    limit,
    transaction_type,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    sortBy,
    sortOrder,
    user_id,
  ]);

  return { transactions, loading, error, meta };
};

const useTransactionWithCurrentUser = (
  queryParams: {
    page?: number;
    limit?: number;
    transaction_type?: TransactionType;
    startDate?: string;
    endDate?: string;
    minAmount?: number;
    maxAmount?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  } = {}
) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  const {
    page = 1,
    limit = 10,
    transaction_type,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    sortBy,
    sortOrder = "asc",
  } = queryParams;

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) {
      setError("User ID not found in session storage");
      setLoading(false);
      return;
    }

    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiService.get<TransactionResponse>(
          "/transactions",
          {
            params: {
              page,
              limit,
              transaction_type,
              startDate,
              endDate,
              minAmount,
              maxAmount,
              sortBy,
              sortOrder,
              user_id: Number(storedUserId),
            },
          }
        );

        setTransactions(response.data.data);
        setMeta(response.data.meta);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [
    page,
    limit,
    transaction_type,
    startDate,
    endDate,
    minAmount,
    maxAmount,
    sortBy,
    sortOrder,
  ]);

  return { transactions, loading, error, meta };
};

export default { useTransaction, useTransactionWithCurrentUser };
