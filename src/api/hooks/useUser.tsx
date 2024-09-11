import { useState, useEffect } from "react";
import apiService from "../apiService";

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserResponse {
  data: User[];
  meta: Meta;
}

export interface UserByIdResponse {
  data: User;
}

export interface CreateUserResponse {
  data: User;
}

export interface UpdateUserResponse {
  data: User;
}

export interface DeleteUserResponse {
  data: {
    message: string;
  };
}

const useUser = (page: number = 1, limit: number = 10) => {
  const [users, setUsers] = useState<User[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiService.get<UserResponse>(
          `users?page=${page}&limit=${limit}`
        );
        setUsers(response.data.data);
        setMeta(response.data.meta);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit]);

  return { users, meta, loading, error };
};

const useUserById = (userId: number) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiService.get<UserByIdResponse>(
          `users/${userId}`
        );
        setUser(response.data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return { user, loading, error };
};

const useCreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (
    userData: Omit<User, "id" | "created_at" | "updated_at">
  ) => {
    setLoading(true);
    try {
      const response = await apiService.post<CreateUserResponse>("users", {
        ...userData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      return response.data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error };
};

const useUpdateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (
    userId: number,
    userData: Partial<Omit<User, "id" | "created_at" | "updated_at">>
  ) => {
    setLoading(true);
    try {
      const response = await apiService.patch<UpdateUserResponse>(
        `users/${userId}`,
        userData
      );
      return response.data.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

const useDeleteUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: number) => {
    setLoading(true);
    try {
      const response = await apiService.delete<DeleteUserResponse>(
        `users/${userId}`
      );
      return response.data.data.message;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};

export { useUser, useUserById, useCreateUser, useUpdateUser, useDeleteUser };
