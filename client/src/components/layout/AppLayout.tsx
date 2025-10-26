import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header from "./Header";
import MainContent from "./MainContent";

const AppLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Header />

      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
};

export default AppLayout;
