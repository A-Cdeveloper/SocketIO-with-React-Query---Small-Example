import { StrictMode } from "react";
import "./index.css";
import AppProviders from "./providers";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>
);
