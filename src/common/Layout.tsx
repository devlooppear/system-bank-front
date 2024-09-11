import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <div className="flex">
        {window.innerWidth > window.innerHeight && <Sidebar />}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
