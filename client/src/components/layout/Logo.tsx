import { Car } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Car className="h-6 w-6 text-primary" />
      <span className="text-xl font-bold">CarHub</span>
    </div>
  );
};

export default Logo;
