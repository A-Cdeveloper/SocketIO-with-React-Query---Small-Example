import React from "react";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container mx-auto px-4 py-8" role="main" id="main-content">
      {children}
    </main>
  );
};

export default MainContent;
