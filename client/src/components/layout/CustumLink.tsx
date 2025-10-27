import { cn } from "@/lib/utils";
import React from "react";
import { Link, useMatch } from "react-router";

type LinkNavProps = {
  to: string;
  children: React.ReactNode;
  "aria-label"?: string;
  onClose?: () => void;
};

const LinkNav = ({
  to,
  children,
  "aria-label": ariaLabel,
  onClose,
}: LinkNavProps) => {
  const isActive = useMatch(to);

  const handleClick = () => {
    onClose?.();
  };

  const linkClasses = cn(
    "dark:text-white text-black hover:text-primary",
    "text-md font-medium",
    "w-full md:w-auto text-end md:text-start",
    isActive
      ? "text-primary dark:text-primary"
      : "dark:text-white text-black hover:text-primary"
  );
  return (
    <Link
      to={to}
      className={linkClasses}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default LinkNav;
