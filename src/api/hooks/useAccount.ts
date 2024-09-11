import { useState, useEffect } from "react";
import apiService from "../apiService";

export interface Account {
  id: number;
  user_id: number;
  balance: number;
  account_type: "CORRENTE" | "POUPANCA";
  created_at: string;
  updated_at: string;
}

export interface AccountResponse {
  data: Account[];
}

export interface AccountByIdResponse {
  data: Account;
}

export interface CreateAccountResponse {
  data: Account;
}

export interface UpdateAccountResponse {
  data: Account;
}

export interface DeleteAccountResponse {
  data: {
    message: string;
  };
}

const useAccounts = (userId: number) => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await apiService.get<AccountResponse>(
          `users/${userId}/accounts`
        );
        setAccounts(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAccounts();
    }
  }, [userId]);

  return { accounts, loading, error };
};

const useAccountById = (accountId: number) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await apiService.get<AccountByIdResponse>(
          `accounts/${accountId}`
        );
        setAccount(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [accountId]);

  return { account, loading, error };
};

const useCreateAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createAccount = async (
    accountData: Omit<Account, "id" | "created_at" | "updated_at">
  ) => {
    setLoading(true);
    try {
      const response = await apiService.post<CreateAccountResponse>(
        "accounts",
        {
          ...accountData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      );
      return response.data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { createAccount, loading, error };
};

const useUpdateAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateAccount = async (
    accountId: number,
    accountData: Partial<Omit<Account, "id" | "created_at" | "updated_at">>
  ) => {
    setLoading(true);
    try {
      const response = await apiService.patch<UpdateAccountResponse>(
        `accounts/${accountId}`,
        accountData
      );
      return response.data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { updateAccount, loading, error };
};

const useDeleteAccount = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteAccount = async (accountId: number) => {
    setLoading(true);
    try {
      const response = await apiService.delete<DeleteAccountResponse>(
        `accounts/${accountId}`
      );
      return response.data.data.message;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading, error };
};

export {
  useAccounts,
  useAccountById,
  useCreateAccount,
  useUpdateAccount,
  useDeleteAccount,
};
