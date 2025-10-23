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
        path: navigationRoutes[0].path,
        element: <HomePage />,
      },
      {
        path: navigationRoutes[1].path,
        element: <SingleCarPage />,
      },
    ],
  },
]);
