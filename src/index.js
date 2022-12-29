import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import LogInPage from "./pages/LogInPage";
import QuestionListPage from "./pages/QuestionListPage";
import QuestionPage from "./pages/QuestionPage";
import ChooseModePage from "./pages/ChooseModePage";
import AuthorPage from "./pages/AuthorPage";
import Layout from "./pages/Layout";
import QuestionSuggestionPage from "./pages/QuestionSuggestionPage";
import WhereIsQuiz from "./pages/WhereIsQuiz";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { main } from "./utils";

const router = createHashRouter([
  {
    path: "/",
    element: <LogInPage />,
  },
  {
    path: "/questions",
    element: <QuestionListPage />,
  },
  {
    path: "/questions/:id",
    element: <QuestionPage />,
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
  {
    path: "*",
    element: <LogInPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <RouterProvider router={router} />
  </Layout>
);

main();
