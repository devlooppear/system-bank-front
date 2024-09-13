import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logoMetisBank from "/logo/android-chrome-192x192.png";
import useAuth from "../api/hooks/useAuth";
import { useEffect, useState } from "react";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import LanguageSwitcher from "../components/i18n/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > window.innerHeight);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const token = localStorage.getItem("authToken");

  const routesWithoutLogout = ["/login", "/register", "/"];
  const navItems = [
    { to: "/login", label: t("navbar.access-account"), show: !token || routesWithoutLogout.includes(location.pathname) },
    { to: "/register", label: t("navbar.open-account"), show: !token || routesWithoutLogout.includes(location.pathname) },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="w-full flex justify-between bg-neutral-100 border-b-2 border-neutral-300 py-1">
        <Link to={token ? "/dashboard" : "/"}>
          <img
            src={logoMetisBank}
            className="max-w-[50px] rounded-md shadow-md mx-2"
            alt="metis-bank-logo"
          />
        </Link>
        <ul className="flex gap-3 mx-3 justify-center items-center">
          {navItems.map(
            (item) =>
              item.show && (
                <li key={item.to} className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer">
                  <NavLink to={item.to}>{item.label}</NavLink>
                </li>
              )
          )}
          {token && (
            <li
              className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer flex items-center text-center h-[71%]"
              title={'logout'}
              onClick={handleLogout}
            >
              {isWideScreen ? 'Logout' : <FaSignOutAlt size={18} className="text-neutral-700" />}
            </li>
          )}
          <LanguageSwitcher />
          {!isWideScreen && (
            <button
              onClick={toggleModal}
              className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer flex items-center text-center h-[70%]"
            >
              {isModalOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </ul>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-64 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Metis Bank</h2>
              <button onClick={toggleModal} className="text-neutral-700">
                <FaTimes />
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                {navItems.map(
                  (item) =>
                    item.show && (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          onClick={toggleModal}
                          className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg ${
                              isActive ? "bg-gray-700 text-white" : "hover:bg-gray-600 text-gray-800"
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </li>
                    )
                )}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
