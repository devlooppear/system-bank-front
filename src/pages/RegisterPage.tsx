import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoMetisBank from "/logo/android-chrome-512x512.png";
import { useCreateUser } from "../api/hooks/useUser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const { createUser, loading } = useCreateUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t("register.error-create"));
      return;
    }

    const userData = { email, password, name };

    const result = await createUser(userData);
    if (result) {
      toast.success(t("register.success"));
      navigate("/login");
    } else {
      toast.error(t("register.error-create"));
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
            {t("register.access-account")}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                {t("register.name")}
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t("register.name-placeholder")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                {t("login.email")}
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t("login.email-placeholder")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                {t("login.password")}{" "}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t("login.password-placeholder")}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                {t("register.confirm-password")}{" "}
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={t("register.confirm-password-placeholder")}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-800 to-blue-950 text-white font-semibold py-2 rounded-lg transition duration-300 hover:from-blue-600 hover:to-blue-400"
              disabled={loading}
            >
              {loading ? t("register.loading") : t("register.register")}{" "}
            </button>
          </form>
          <div className="text-center mt-4">
            <a href="/login" className="text-blue-600 hover:underline">
              {t("register.already-have-account")}{" "}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
