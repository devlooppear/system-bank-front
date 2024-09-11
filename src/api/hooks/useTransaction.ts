import { useState } from "react";
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

interface CreateTransactionParams {
  transaction: Omit<
    Transaction,
    "id" | "created_at" | "updated_at" | "account_id"
  >;
}

const useTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const fetchTransactions = async (
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
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get<TransactionResponse>(
        "/transactions",
        {
          params: queryParams,
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

  const createTransaction = async ({
    transaction,
  }: CreateTransactionParams) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await apiService.post("/transactions", transaction);
      setSuccess(true);

      await fetchTransactions();

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getTransaction = async (transactionId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiService.get<Transaction>(
        `/transactions/${transactionId}`
      );
      return response.data;
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (transactionId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await apiService.delete(`/transactions/${transactionId}`);
      setSuccess(true);
      fetchTransactions();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    transactions,
    loading,
    error,
    meta,
    fetchTransactions,
    createTransaction,
    getTransaction,
    deleteTransaction,
    success,
  };
};

export default useTransaction;
