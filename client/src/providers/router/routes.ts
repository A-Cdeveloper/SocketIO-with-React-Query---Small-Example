type RouteType = {
  path: string;
  label: string;
  name: string;
};

const navigationRoutes: Record<string, RouteType> = {
  home: {
    path: "/",
    label: "Home",
    name: "home",
  },
  car: {
    path: "/cars/:id",
    label: "Cars",
    name: "car",
  },
  addCar: {
    path: "cars/add-car",
    label: "Add Car",
    name: "addCar",
  },
};

export default navigationRoutes;
