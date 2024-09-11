import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logoMetisBank from "/logo/android-chrome-192x192.png";
import useAuth from "../api/hooks/useAuth";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import LanguageSwitcher from "../components/i18n/LanguageSwitcher";

const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isWideScreen, setIsWideScreen] = useState(
    window.innerWidth > window.innerHeight
  );

  const token = localStorage.getItem("authToken");

  const routesWithoutLogout = ["/login", "/register", "/"];

  const handleLogout = async () => {
    await logout();
    navigate("/");
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
    <nav className="w-full flex justify-between bg-neutral-100 border-b-2 border-neutral-300 py-1">
      <Link to={token ? "/dashboard" : "/"}>
        <img
          src={logoMetisBank}
          className="max-w-[50px] rounded-md shadow-md mx-2"
          alt="metis-bank-logo"
        />
      </Link>
      <ul className="flex gap-3 mx-3 justify-center align-middle items-center">
        {!token || routesWithoutLogout.includes(location.pathname) ? (
          <>
            <li className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer">
              <NavLink to="/login">Acess Account</NavLink>
            </li>
            <li className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer">
              <NavLink to="/register">Open Account</NavLink>
            </li>
          </>
        ) : (
          <li
            className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer flex items-center text-center h-[71%]"
            title="logout"
            onClick={handleLogout}
          >
            {isWideScreen ? (
              "Logout"
            ) : (
              <FaSignOutAlt size={18} className="text-neutral-700" />
            )}
            {isWideScreen ? null : ""}
          </li>
        )}
        <LanguageSwitcher />
      </ul>
    </nav>
  );
};

export default NavBar;
