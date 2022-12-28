import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import LogInPage from "./pages/LogInPage";
import ChooseModePage from "./pages/ChooseModePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogInPage />,
    children: [],
  },
  {
    path: "/mode",
    element: <ChooseModePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
