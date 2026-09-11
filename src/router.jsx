import { AppLayout } from "./AppLayout.jsx";
import { CasesPage } from "./pages/CasesPage.jsx";
import { ContactPage } from "./pages/ContactPage.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { ServicesPage } from "./pages/ServicesPage.jsx";

export const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "cases", element: <CasesPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];
