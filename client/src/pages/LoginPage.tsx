import LoginFormular from "@/features/auth/components/LoginFormular";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router";

const LoginPage = () => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return <LoginFormular />;
};

export default LoginPage;
