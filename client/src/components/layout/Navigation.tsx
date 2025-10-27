import navigationRoutes from "@/providers/router/routes";
import LinkNav from "./CustumLink";
import { useAuthStore } from "@/store/authStore";

const Navigation = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="flex items-center space-x-4" aria-label="Main navigation">
      <LinkNav to={navigationRoutes.home.path} aria-label="Go to home page">
        {navigationRoutes.home.label}
      </LinkNav>
      {isAuthenticated && (
        <>
          <LinkNav to={navigationRoutes.addCar.path} aria-label="Add new car">
            {navigationRoutes.addCar.label}
          </LinkNav>
        </>
      )}
    </nav>
  );
};

export default Navigation;
