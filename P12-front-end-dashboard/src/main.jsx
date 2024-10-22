import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@/styles/index.scss";
import DashboardPage from "@/pages/Dashboard";
import MainLayout from "@/components/layout/MainLayout";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainLayout>
      <DashboardPage />
    </MainLayout>
  </StrictMode>
);
