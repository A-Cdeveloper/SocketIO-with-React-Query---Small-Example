type RouteType = {
  path: string;
  label: string;
  name: string;
};

const navigationRoutes: RouteType[] = [
  {
    path: "/",
    label: "Home",
    name: "home",
  },
  {
    path: "/cars/:id",
    label: "Cars",
    name: "car",
  },
];
export default navigationRoutes;
