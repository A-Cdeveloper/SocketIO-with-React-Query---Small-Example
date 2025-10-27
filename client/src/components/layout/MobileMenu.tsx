import { useAuthStore } from "@/store/authStore";
import { LogIn, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import Navigation from "./Navigation";

const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { logout, user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    navigate("/login");
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
    logout();
  };

  let content = (
    <div className="w-full flex justify-end">
      <Button
        className="bg-primary hover:bg-primary/90 cursor-pointer"
        onClick={handleLogoutClick}
        aria-label="Logout from your account"
      >
        <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
        Logout
      </Button>
    </div>
  );

  if (!isAuthenticated) {
    content = (
      <div className="w-full flex justify-end">
        <Button
          className="bg-primary hover:bg-primary/90 cursor-pointer"
          onClick={handleLoginClick}
          aria-label="Login to your account"
        >
          <LogIn className="mr-2 h-4 w-4" aria-hidden="true" />
          Login
        </Button>
      </div>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg p-4 w-[200px] flex flex-col gap-4">
      {/* User info - on top */}
      {isAuthenticated && (
        <div className="text-sm text-gray-500 text-end" aria-label="User email">
          {user?.email}
        </div>
      )}

      {/* Menu items */}
      <Navigation onClose={onClose} />

      {/* Logout button - on bottom */}
      {content}
    </div>
  );
};

export default MobileMenu;
