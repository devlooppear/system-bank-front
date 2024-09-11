import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logoMetisBank from "/logo/android-chrome-192x192.png";
import useAuth from "../api/hooks/useAuth";

const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("authToken");

  const routesWithoutLogout = ["/login", "/register", "/"];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="w-full flex justify-between bg-neutral-100 border-b-2 border-neutral-300 py-1">
      <Link to="/">
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
            className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
