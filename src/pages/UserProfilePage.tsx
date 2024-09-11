import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUserById, useUpdateUser } from "../api/hooks/useUser";
import { RootState } from "../store/store";
import defaultUserImg from "/imgs/27059cae-6647-4966-b6c6-e80475d08712.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfilePage = () => {
  const { user_id } = useSelector((state: RootState) => state.auth);

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useUserById(user_id || 0);
  const {
    updateUser,
    loading: updateLoading,
    error: updateError,
  } = useUpdateUser();

  const [name, setName] = useState<string>(user?.name || "");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleUpdateName = async () => {
    if (!user_id) return;

    try {
      await updateUser(user_id, { name });
      toast.success("Nome atualizado com sucesso!");
      setIsModalOpen(false); // Fechar o modal após a atualização
    } catch (err) {
      toast.error("Falha ao atualizar o nome.");
    }
  };

  if (userLoading) return <div className="text-center mt-5">Carregando detalhes do usuário...</div>;
  if (userError) return <div className="text-red-500 text-center mt-5">Erro ao carregar detalhes do usuário: {userError}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-100 to-white flex flex-col items-center gap-3 relative">
      <div className="bg-blue-background min-h-[38vh] bg-cover w-full pt-16 flex justify-center items-center">
        <h1 className="text-white text-4xl font-bold">Bem-vindo ao seu perfil</h1>
      </div>
      <div className="absolute top-[8rem] bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-950">
          Perfil do Usuário
        </h1>
        {user && (
          <div className="flex flex-col items-center">
            <img
              src={defaultUserImg}
              className="rounded-full border-2 border-neutral-400 drop-shadow-lg mb-4 w-32 h-32"
              alt="Imagem do Usuário"
            />
            <h2 className="text-xl font-semibold mb-2 text-blue-950">
              Detalhes do Usuário
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>Email:</strong> {user.email}
            </p>
            <div className="flex flex-col gap-1 mt-2 min-w-[90%] max-w-[300px]">
              <label className="block text-lg mb-2 font-semibold text-neutral-700">Nome:</label>
              <p className="border bg-neutral-200 border-gray-300 p-3 rounded-md mb-4 w-full text-gray-800 opacity-90">{name}</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-blue-800 to-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 w-full"
              >
                Editar Nome
              </button>
            </div>
            {updateError && (
              <p className="mt-4 text-red-500">
                Erro ao atualizar nome: {updateError}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Modal para edição de nome */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Editar Nome</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 rounded-md mb-4 w-full focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
            />
            <div className="flex justify-end">
              <button
                onClick={handleUpdateName}
                disabled={updateLoading}
                className="bg-blue-800 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-blue-700"
              >
                {updateLoading ? "Atualizando..." : "Salvar"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="ml-2 bg-gray-300 text-black font-semibold py-2 px-4 rounded-lg transition duration-300 hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default UserProfilePage;
