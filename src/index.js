import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LogInPage from "./pages/LogInPage";
import QuestionListPage from "./pages/QuestionListPage";
import ChooseModePage from "./pages/ChooseModePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogInPage />,
    children: [],
  },
  {
    path: "/questions",
    element: <QuestionListPage />,
  },
  {
    path: "/mode",
    element: <ChooseModePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
