import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import LogInPage from "./pages/LogInPage";
import QuestionListPage from "./pages/QuestionListPage";
import ChooseModePage from "./pages/ChooseModePage";
import AuthorPage from "./pages/AuthorPage";
import Layout from "./pages/Layout";
import QuestionSuggestionPage from "./pages/QuestionSuggestionPage";
import WhereIsQuiz from "./pages/WhereIsQuiz";
import { createHashRouter, RouterProvider } from "react-router-dom";

const router = createHashRouter([
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
  {
    path: "/authors",
    element: <AuthorPage />,
  },
  {
    path: "/suggest",
    element: <QuestionSuggestionPage />,
  },
  {
    path: "/where-is-quiz",
    element: <WhereIsQuiz />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <RouterProvider router={router} />
  </Layout>
);
