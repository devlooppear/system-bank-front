import { useUserById } from "../api/hooks/useUser";
import { useUserTransactions } from "../api/hooks/useUser";
import defaultUserImg from "/imgs/27059cae-6647-4966-b6c6-e80475d08712.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../common/Loader";

interface RecentTransactionsProps {
  userId: any;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ userId }) => {
  const { transactions, loading, error } = useUserTransactions(userId, 1, 6);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-5">
        Erro ao carregar transações: {error}
      </div>
    );
  }

  return (
    <div className="w-full mt-6 bg-white shadow-lg rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
      <div className="flex flex-col divide-y">
        <div className="flex justify-between p-2 font-bold">
          <div className="flex-1">Tipo de Transação</div>
          <div className="flex-1">Valor</div>
          <div className="flex-1">Data</div>
          <div className="flex-1">Destinatário</div>
        </div>
        {transactions.map((transaction: any) => (
          <div key={transaction.id} className="flex justify-between p-2">
            <div className="flex-1">{transaction.transaction_type}</div>
            <div className="flex-1">R$ {transaction.amount.toFixed(2)}</div>
            <div className="flex-1">
              {new Date(transaction.transaction_date).toLocaleDateString()}
            </div>
            <div className="flex-1">{transaction.recipient_name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const user_id = localStorage.getItem("user_id");

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useUserById(user_id ? parseInt(user_id) : 0);

  if (userLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (userError) {
    return (
      <div className="text-red-500 text-center mt-5">
        Erro ao carregar detalhes do usuário: {userError}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-100 to-white flex flex-col items-center gap-3 relative">
      <div className="bg-blue-background min-h-[38vh] bg-cover w-full pt-16 flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold">
          Bem-vindo ao seu perfil
        </h1>
      </div>
      <div className="absolute top-[8rem] bg-white shadow-lg rounded-lg p-6 w-full max-w-[90%] mx-4">
        <div className="flex">
          {user && (
            <>
              <div className="flex flex-col items-center w-full">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-950">
                  Perfil do Usuário
                </h1>
                <img
                  src={defaultUserImg}
                  className="rounded-full border-2 border-neutral-400 drop-shadow-lg mb-4 w-32 h-32"
                  alt="Imagem do Usuário"
                />
                <h2 className="text-xl font-semibold mb-2 text-blue-950">
                  Detalhes do Usuário
                </h2>
                <div className="flex flex-col gap-1 mt-2 min-w-[90%] max-w-[300px]">
                  <p className="text-gray-700 mb-4">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <strong>Nome:</strong> {user.name}
                  </p>
                  {user.accounts && user.accounts.length > 0 && (
                    <>
                      <p className="text-gray-700 mb-4">
                        <strong>Saldo:</strong> R$ {user.accounts[0].balance}
                      </p>
                      <p className="text-gray-700 mb-4">
                        <strong>Tipo da Conta:</strong>{" "}
                        {user.accounts[0].account_type}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <RecentTransactions userId={user_id} />
            </>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
