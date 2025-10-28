import { Outlet, useLocation } from "react-router";
import { useEffect, Suspense } from "react";
import Header from "./Header";
import MainContent from "./MainContent";
import { Spinner } from "@/components/ui/spinner";

const AppLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Header />

      <MainContent>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </MainContent>
    </div>
  );
};

export default AppLayout;
