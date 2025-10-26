import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/HomePage";
import navigationRoutes from "./routes";
import AppLayout from "@/components/layout/AppLayout";
import SingleCarPage from "@/pages/SingleCarPage";
import AddCarPage from "@/pages/AddCarPage";
import EditCarPage from "@/pages/EditCarPage";
import LoginPage from "@/pages/LoginPage";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

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
        element: (
          <ProtectedRoute>
            <AddCarPage />
          </ProtectedRoute>
        ),
      },
      {
        path: navigationRoutes.editCar.path,
        element: (
          <ProtectedRoute>
            <EditCarPage />
          </ProtectedRoute>
        ),
      },
      {
        path: navigationRoutes.login.path,
        element: <LoginPage />,
      },
    ],
  },
]);
