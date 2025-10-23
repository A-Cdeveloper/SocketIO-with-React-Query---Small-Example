import { StrictMode } from "react";
import "./index.css";
import AppProviders from "./providers";
import ErrorBoundary from "./components/ErrorBoundary";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProviders />
    </ErrorBoundary>
  </StrictMode>
);
