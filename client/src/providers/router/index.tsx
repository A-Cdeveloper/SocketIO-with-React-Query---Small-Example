import { RouterProvider } from "react-router";
import { router } from "./routerConfig";

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
