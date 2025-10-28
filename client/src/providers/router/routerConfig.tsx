import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import navigationRoutes from "./routes";
import AppLayout from "@/components/layout/AppLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

// Lazy load all pages except critical ones
const HomePage = lazy(() => import("@/pages/HomePage"));
const SingleCarPage = lazy(() => import("@/pages/SingleCarPage"));
const AddCarPage = lazy(() => import("@/pages/AddCarPage"));
const EditCarPage = lazy(() => import("@/pages/EditCarPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));

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
