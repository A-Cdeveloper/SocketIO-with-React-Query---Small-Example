import { Car } from "lucide-react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Car className="h-6 w-6 text-primary" />
      <Link to="/" className="text-xl font-bold">
        CarHub
      </Link>
    </div>
  );
};

export default Logo;
