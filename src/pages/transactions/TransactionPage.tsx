import { useState, useEffect } from "react";
import { useUserTransactions } from "../../api/hooks/useUser";
import { toast } from "react-toastify";
import Loader from "../../common/Loader";
import { FaSort } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TransactionPage = () => {
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<number | null>(null);
  const [transactionType, setTransactionType] = useState<string | undefined>(
    undefined
  );
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [sortByDate, setSortByDate] = useState<"asc" | "desc">("asc");
  const [period, setPeriod] = useState<"7" | "15" | "30" | "90" | undefined>(
    undefined
  );
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const { transactions, loading, error, meta } = useUserTransactions(
    userId as number,
    page,
    10,
    transactionType,
    startDate,
    endDate,
    undefined,
    undefined,
    period,
    sortByDate
  );

  useEffect(() => {
    if (error) {
      toast.error(`Erro ao carregar transações: ${error}`);
    }
  }, [error]);

  const clearFilters = () => {
    setTransactionType(undefined);
    setStartDate("");
    setEndDate("");
    setSortByDate("asc");
    setPeriod(undefined);
    setPage(1);
  };

  const navigate = useNavigate();
  const goToTransaction = () => {
    navigate("/transaction/create");
  };

  const transactionTypes = ["TED", "PIX"];
  const periods = ["7", "15", "30", "90"];

  return (
    <div className="min-h-screen bg-neutral-50 shadow-inner p-4 flex flex-col gap-5">
      <h1 className="text-2xl font-bold mb-4">Transações</h1>

      <div className="flex mb-4 gap-3">
        <div className="relative flex-1">
          <h5 className="text-neutral-700 pb-3">Data de Início</h5>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg p-2 w-full"
            placeholder="Data de Início"
          />
        </div>
        <div className="relative flex-1">
          <h5 className="text-neutral-700 pb-3">Data de Fim</h5>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-lg p-2 w-full"
            placeholder="Data de Fim"
          />
        </div>
        <div className="relative flex-1">
          <h5 className="text-neutral-700 pb-3">Tipo de Transação</h5>
          <div
            onClick={() =>
              setTransactionType(transactionType === "TED" ? undefined : "TED")
            }
            className="cursor-pointer border rounded-lg p-2 flex justify-between items-center bg-white"
          >
            <span>{transactionType ? transactionType : "Selecionar"}</span>
            <FaSort />
          </div>
          {transactionType && (
            <div className="absolute mt-1 bg-white border rounded-lg shadow-lg z-10">
              {transactionTypes.map((type) => (
                <div
                  key={type}
                  onClick={() => setTransactionType(type)}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {type}
                </div>
              ))}
              <div
                onClick={() => setTransactionType(undefined)}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Todos
              </div>
            </div>
          )}
        </div>
        <div className="relative flex-1">
          <h5 className="text-neutral-700 pb-3">Ordenar por Data</h5>
          <div className="flex gap-2">
            <button
              onClick={() => setSortByDate("asc")}
              className={`border rounded-lg p-2 ${
                sortByDate === "asc" ? "bg-blue-800 text-white" : "bg-white"
              } opacity-90`}
            >
              Ascendente
            </button>
            <button
              onClick={() => setSortByDate("desc")}
              className={`border rounded-lg p-2 ${
                sortByDate === "desc" ? "bg-blue-800 text-white" : "bg-white"
              } opacity-90`}
            >
              Descendente
            </button>
          </div>
        </div>
        <div className="relative flex-1">
          <h5 className="text-neutral-700 pb-3">Período</h5>
          <div
            onClick={() => setIsPeriodOpen((prev) => !prev)}
            className="cursor-pointer border rounded-lg p-2 flex justify-between items-center bg-white"
          >
            <span>{period ? `${period} Dias` : "Selecionar Período"}</span>
            <FaSort />
          </div>
          {isPeriodOpen && (
            <div className="absolute mt-1 bg-white border rounded-lg shadow-lg z-10">
              {periods.map((p) => (
                <div
                  key={p}
                  onClick={() => {
                    setPeriod(p as "7" | "15" | "30" | "90");
                    setIsPeriodOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  {p} Dias
                </div>
              ))}
              <div
                onClick={() => {
                  setPeriod(undefined);
                  setIsPeriodOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                Todos
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={clearFilters}
          className="max-w-[180px] bg-neutral-400 text-white px-4 py-2 rounded"
        >
          Limpar Filtros
        </button>
        <button
          onClick={goToTransaction} // Corrected here
          className="max-w-[180px] bg-blue-800 text-white px-4 py-2 rounded"
        >
          Nova Transação
        </button>
      </div>

      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden">
        {loading ? (
          <Loader />
        ) : (
          <>
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
                  <div className="flex-1">{transaction.amount.toFixed(2)}</div>
                  <div className="flex-1">
                    {new Date(transaction.transaction_date).toLocaleDateString()}
                  </div>
                  <div className="flex-1">{transaction.recipient_name}</div>
                </div>
              ))}
            </div>
          </>
        )}
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
          onClick={() => setPage((prev) => Math.min(prev + 1, meta?.totalPages || page))}
          disabled={page === meta?.totalPages}
          className="bg-blue-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default TransactionPage;
