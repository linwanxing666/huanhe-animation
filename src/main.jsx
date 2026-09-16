import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router.jsx";
import "./styles.css";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
const router = createBrowserRouter(routes, { basename: basePath });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
