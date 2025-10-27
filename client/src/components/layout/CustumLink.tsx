import { cn } from "@/lib/utils";
import React from "react";
import { Link, useMatch } from "react-router";

type LinkNavProps = {
  to: string;
  children: React.ReactNode;
  "aria-label"?: string;
};

const LinkNav = ({ to, children, "aria-label": ariaLabel }: LinkNavProps) => {
  const isActive = useMatch(to);

  const linkClasses = cn(
    "dark:text-white text-black hover:text-primary",
    "text-md font-medium",
    isActive
      ? "text-primary dark:text-primary"
      : "dark:text-white text-black hover:text-primary"
  );
  return (
    <Link to={to} className={linkClasses} aria-label={ariaLabel}>
      {children}
    </Link>
  );
};

export default LinkNav;
