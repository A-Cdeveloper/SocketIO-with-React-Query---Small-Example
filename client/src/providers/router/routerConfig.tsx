import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/HomePage";
import navigationRoutes from "./routes";
import AppLayout from "@/components/layout/AppLayout";
import SingleCarPage from "@/pages/SingleCarPage";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: navigationRoutes.home.path,
        element: <HomePage />,
      },
      {
        path: navigationRoutes.car.path,
        element: <SingleCarPage />,
      },
      {
        path: navigationRoutes.addCar.path,
        element: <h1>Add Car</h1>,
      },
    ],
  },
]);
