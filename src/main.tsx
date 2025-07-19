import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { AppRouter } from "./routes/app-router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
    <Toaster position="bottom-center" />
  </StrictMode>
);
