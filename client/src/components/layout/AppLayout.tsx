import { Outlet } from "react-router";
import Header from "./Header";
import MainContent from "./MainContent";

const AppLayout = () => {
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
