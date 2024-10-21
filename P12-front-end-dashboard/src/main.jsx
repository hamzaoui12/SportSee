import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/index.scss";
import DashboardPage from "@/pages/Dashboard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <DashboardPage />
  </StrictMode>
);
