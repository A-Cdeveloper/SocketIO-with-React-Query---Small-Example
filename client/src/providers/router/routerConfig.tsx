import { createBrowserRouter } from "react-router";
import HomePage from "@/pages/HomePage";
import navigationRoutes from "./routes";
import AppLayout from "@/components/layout/AppLayout";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: navigationRoutes[0].path,
        element: <HomePage />,
      },
    ],
  },
]);
