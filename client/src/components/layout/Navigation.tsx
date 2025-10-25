import navigationRoutes from "@/providers/router/routes";
import LinkNav from "./CustumLink";

const Navigation = () => {
  return (
    <nav className="flex items-center space-x-4">
      <LinkNav to={navigationRoutes.home.path}>
        {navigationRoutes.home.label}
      </LinkNav>
      <LinkNav to={navigationRoutes.addCar.path}>
        {navigationRoutes.addCar.label}
      </LinkNav>
    </nav>
  );
};

export default Navigation;
