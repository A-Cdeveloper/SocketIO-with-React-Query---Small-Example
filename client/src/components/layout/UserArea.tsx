import { LogIn, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useAuthStore } from "@/store/authStore";

const UserArea = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuthStore();
  return (
    <div className="flex items-center space-x-4">
      {isAuthenticated ? (
        <>
          <span className="text-sm text-gray-500">{user?.email}</span>
          <Button
            className="bg-primary hover:bg-primary/90 cursor-pointer"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      ) : (
        <Button
          className="bg-primary hover:bg-primary/90 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      )}
      <ThemeSwitcher />
    </div>
  );
};

export default UserArea;
