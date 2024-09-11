import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../api/hooks/useAuth";
import logoMetisBank from "/logo/android-chrome-512x512.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await login(email, password);
    if (response) {
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } else {
      toast.error(
        "Desculpe, ocorreu um erro. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-t from-blue-500 to-blue-100 flex items-center justify-center">
        <div className="absolute top-[12rem] bg-white rounded-lg shadow-lg p-8 max-w-[90%] w-[480px]">
          <img
            src={logoMetisBank}
            alt="logo-metis-bank"
            className="rounded-full shadow-lg mx-auto w-32 mb-4"
          />
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Acesse Sua Conta
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite seu e-mail"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Digite sua senha"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-800 to-blue-950 text-white font-semibold py-2 rounded-lg transition duration-300 hover:from-blue-600 hover:to-blue-400"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="/register" className="text-blue-600 hover:underline">
              Não tem uma conta? Crie uma agora.
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
