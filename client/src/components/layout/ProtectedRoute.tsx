import navigationRoutes from "@/providers/router/routes";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  return (
    <div>
      {isAuthenticated ? (
        children
      ) : (
        <Navigate to={navigationRoutes.login.path} />
      )}
    </div>
  );
};

export default ProtectedRoute;
