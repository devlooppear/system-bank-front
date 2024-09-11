import { useEffect, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import "tailwindcss/tailwind.css";
import en from "../i18n/translations/en.json";
import ptBR from "../i18n/translations/pt-BR.json";
import esES from "../i18n/translations/es-ES.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    "pt-BR": { translation: ptBR },
    "es-ES": { translation: esES },
  },
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch("https://ipapi.co/country/");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const country = await response.text().then((text) => text.trim());

        if (!language) {
          if (country === "BR") {
            setLanguage("pt-BR");
            i18n.changeLanguage("pt-BR");
          } else if (["ES", "MX", "AR"].includes(country)) {
            setLanguage("es-ES");
            i18n.changeLanguage("es-ES");
          } else {
            setLanguage("en");
            i18n.changeLanguage("en");
          }
        }
      } catch (error) {
        console.error("Error fetching country code:", error);
        setLanguage("en");
        i18n.changeLanguage("en");
      }
    };

    fetchCountryCode();
  }, [language]);

  const handleLanguageChange = (lang: any) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer flex items-center text-center h-[80%]"
        >
          <FaGlobe className="my-1" />
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-blue-900 ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleLanguageChange("en")}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100"
            >
              🇺🇸 {t("English")}
            </button>
            <button
              onClick={() => handleLanguageChange("pt-BR")}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100"
            >
              🇧🇷 {t("Portuguese")}
            </button>
            <button
              onClick={() => handleLanguageChange("es-ES")}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-neutral-100"
            >
              🇪🇸 {t("Spanish")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
