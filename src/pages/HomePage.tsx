import { FaCheck, FaMobileAlt, FaShieldAlt } from "react-icons/fa";
import logoMetisBank from "/logo/android-chrome-512x512.png";
import aboutUSMetis from "/imgs/21c04bda-8310-49bb-8a47-7e01adf192bc.jpeg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-blue-600 to-blue-800 text-white text-center p-6">
        <img
          src={logoMetisBank}
          alt="logo-metis-bank"
          className="rounded-full shadow-lg my-4 w-32 sm:w-40 lg:w-48"
        />
        <h1 className="text-5xl font-extrabold mb-4">
          {t("title")}
        </h1>
        <p className="text-lg mb-4 max-w-2xl">
          {t("welcome")}
        </p>
        <NavLink to="register">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300">
            {t("openAccount")}
          </button>
        </NavLink>
      </header>

      <section className="py-12 bg-gray-100 min-h-[55vh]">
        <div className="max-w-7xl mx-auto px-5">
          <h3 className="text-4xl py-3 font-semibold text-gray-800 text-center mb-8">
            {t("whatWeOffer")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
            <div className="flex flex-col items-center bg-white px-6 py-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaShieldAlt className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold">{t("security.title")}</h4>
              <p className="text-gray-600 text-center">
                {t("security.description")}
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaCheck className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold">{t("simplicity.title")}</h4>
              <p className="text-gray-600 text-center">
                {t("simplicity.description")}
              </p>
            </div>
            <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <FaMobileAlt className="w-12 h-12 text-blue-600 mb-4" />
              <h4 className="text-xl font-bold">{t("accessibility.title")}</h4>
              <p className="text-gray-600 text-center">
                {t("accessibility.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row bg-gray-200 py-12">
        <div className="lg:w-1/2 flex justify-center mb-6 lg:mb-0">
          <img
            src={aboutUSMetis}
            alt="metis-bank-about"
            className="max-w-xs sm:max-w-md lg:max-w-lg rounded-md shadow-lg"
          />
        </div>
        <div className="lg:w-1/2 px-6 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4 border-b-2 border-blue-950 py-2">
            {t("aboutUs")}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {t("aboutUsDescription")}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
