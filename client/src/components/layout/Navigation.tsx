import navigationRoutes from "@/providers/router/routes";
import LinkNav from "./CustumLink";
import { useAuthStore } from "@/store/authStore";

const Navigation = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <nav className="flex items-center space-x-4">
      <LinkNav to={navigationRoutes.home.path}>
        {navigationRoutes.home.label}
      </LinkNav>
      {isAuthenticated && (
        <>
          <LinkNav to={navigationRoutes.addCar.path}>
            {navigationRoutes.addCar.label}
          </LinkNav>
        </>
      )}
    </nav>
  );
};

export default Navigation;
