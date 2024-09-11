import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Layout = () => {
  const location = useLocation();
  const authToken = localStorage.getItem("authToken");

  const routesWithoutSidebar = ["/login", "/register", "/"];
  const shouldHideSidebar =
    !authToken || routesWithoutSidebar.includes(location.pathname);

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > window.innerHeight);

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
      <NavBar />
      <div className="flex">
        {!shouldHideSidebar && isWideScreen && <Sidebar />}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
