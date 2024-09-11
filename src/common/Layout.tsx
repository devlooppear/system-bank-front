import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const location = useLocation();
  const authToken = localStorage.getItem("authToken");

  const routesWithoutSidebar = ["/login", "/register", "/"];

  const shouldHideSidebar =
    !authToken || routesWithoutSidebar.includes(location.pathname);

  return (
    <>
      <NavBar />
      <div className="flex">
        {!shouldHideSidebar && window.innerWidth > window.innerHeight && (
          <Sidebar />
        )}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
