import { Link } from "react-router-dom";
import logoMetisBank from "/logo/android-chrome-192x192.png";

const NavBar = () => {
  return (
    <>
      <nav className="flex justify-between bg-neutral-100 border-b-2 border-neutral-300 py-1">
        <img src={logoMetisBank} className="max-w-[50px] rounded-md shadow-md border-2 border-neutral-400 mx-2" alt="metis-bank-logo" />
        <ul className="flex gap-3 mx-3 justify-center align-middle items-center">
          <li className="bg-neutral-200 font-semibold text-neutral-700 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-100 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="bg-neutral-200 font-semibold text-neutral-700 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-100 cursor-pointer">
            <Link to="/blogs">Blogs</Link>
          </li>
          <li className="bg-neutral-200 font-semibold text-neutral-700 px-2 py-1 rounded-md shadow-md border-2 border-neutral-400 hover:bg-neutral-100 cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
