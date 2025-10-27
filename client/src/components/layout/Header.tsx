import Logo from "./Logo";
import UserArea from "./UserArea";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200"
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <Navigation />
          <UserArea />
        </div>
      </div>
    </header>
  );
};

export default Header;
