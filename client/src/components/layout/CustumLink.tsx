import { cn } from "@/lib/utils";
import React from "react";
import { Link, useMatch } from "react-router";

const LinkNav = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  const isActive = useMatch(to);

  const linkClasses = cn(
    "text-white hover:text-primary",
    "text-md font-medium",
    isActive ? "text-primary" : "text-white hover:text-primary"
  );
  return (
    <Link to={to} className={linkClasses}>
      {children}
    </Link>
  );
};

export default LinkNav;
