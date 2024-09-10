import { Link } from "react-router-dom";
import logoMetisBank from "/logo/android-chrome-192x192.png";

const NavBar = () => {
  return (
    <nav className="flex justify-between bg-neutral-100 border-b-2 border-neutral-300 py-1">
      <img
        src={logoMetisBank}
        className="max-w-[50px] rounded-md shadow-md mx-2"
        alt="metis-bank-logo"
      />
      <ul className="flex gap-3 mx-3 justify-center align-middle items-center">
        <li className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer">
          <Link to="/login">Acess Account</Link>
        </li>
        <li className="bg-white font-semibold text-neutral-900 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-50 cursor-pointer">
          <Link to="/register">Open Account</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
