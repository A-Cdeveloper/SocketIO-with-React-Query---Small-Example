import Logo from "./Logo";
import Navigation from "./Navigation";
import UserArea from "./UserArea";
import { useCallback, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./ThemeSwitcher";
import MobileMenu from "./MobileMenu";
import useOutsideClick from "@/hooks/useOutsideClick";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const { refEl } = useOutsideClick(handleMenuClose);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4" ref={refEl}>
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden md:flex items-center gap-4">
            <Navigation />
          </div>

          <div className="hidden md:flex items-center gap-4">
            <UserArea />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitcher />
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={handleMenuToggle}
              aria-label="Toggle menu"
              className="cursor-pointer"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <MobileMenu isOpen={isMenuOpen} onClose={handleMenuClose} />
      </div>
    </header>
  );
};

export default Header;
