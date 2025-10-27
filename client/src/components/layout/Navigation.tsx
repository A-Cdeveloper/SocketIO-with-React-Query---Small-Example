import navigationRoutes from "@/providers/router/routes";
import LinkNav from "./CustumLink";
import { useAuthStore } from "@/store/authStore";

const Navigation = ({ onClose }: { onClose?: () => void }) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav
      className="flex flex-wrap items-center space-x-0 md:space-x-4 border-y border-gray-200 md:border-y-0 md:border-none dark:border-gray-700 py-2 md:py-0 w-full md:w-auto space-y-2 md:space-y-0"
      aria-label="Main navigation"
    >
      <LinkNav
        to={navigationRoutes.home.path}
        aria-label="Go to home page"
        onClose={onClose}
      >
        {navigationRoutes.home.label}
      </LinkNav>
      {isAuthenticated && (
        <>
          <LinkNav
            to={navigationRoutes.addCar.path}
            aria-label="Add new car"
            onClose={onClose}
          >
            {navigationRoutes.addCar.label}
          </LinkNav>
        </>
      )}
    </nav>
  );
};

export default Navigation;
