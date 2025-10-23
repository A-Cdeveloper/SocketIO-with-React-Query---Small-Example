import { useTheme } from "@/hooks/useTheme";
import { LogIn, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

const UserArea = () => {
  const { toggleTheme } = useTheme();
  return (
    <div className="flex items-center space-x-4">
      {/* Theme Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
      >
        <Sun className="h-4 w-4 dark:hidden" />
        <Moon className="h-4 w-4 hidden dark:block" />
      </Button>

      {/* Login Button */}
      <Button className="bg-primary hover:bg-primary/90">
        <LogIn className="mr-2 h-4 w-4" />
        Login
      </Button>
    </div>
  );
};

export default UserArea;
