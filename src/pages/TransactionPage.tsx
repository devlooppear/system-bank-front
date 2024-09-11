import { useState, useEffect } from "react";
import { useUserTransactions } from "../api/hooks/useUser";
import { toast } from "react-toastify";

const TransactionPage = () => {
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const { transactions, loading, error, meta } = useUserTransactions(
    userId as number,
    page,
    10
  );

  useEffect(() => {
    if (error) {
      toast.error(`Erro ao carregar transações: ${error}`);
    }
  }, [error]);

  if (loading)
    return <div className="text-center mt-5">Carregando transações...</div>;

  return (
    <div className="min-h-[90vh] bg-neutral-50 shadow-inner p-4">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>
      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex bg-gray-200 p-3">
          <div className="flex-1 font-semibold">Tipo de Transação</div>
          <div className="flex-1 font-semibold">Valor</div>
          <div className="flex-1 font-semibold">Data da Transação</div>
          <div className="flex-1 font-semibold">Nome do Recipiente</div>
        </div>
        <div className="flex flex-col divide-y">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex p-3">
              <div className="flex-1">{transaction.transaction_type}</div>
              <div className="flex-1">{transaction.amount}</div>
              <div className="flex-1">
                {new Date(transaction.transaction_date).toLocaleDateString()}
              </div>
              <div className="flex-1">{transaction.recipient_name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {page} de {meta?.totalPages || 0}
        </span>
        <button
          onClick={() =>
            setPage((prev) => Math.min(prev + 1, meta?.totalPages || prev))
          }
          disabled={meta ? page >= meta.totalPages : true}
          className="bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default TransactionPage;
