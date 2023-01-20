import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './index.scss'

import { AuthorPage } from './pages/AuthorPage'
// import { ChooseModePage } from './pages/ChooseModePage'
import Layout from './pages/Layout'
import LogInPage from './pages/LogInPage'
import QuestionListPage from './pages/QuestionListPage'
import QuestionPage from './pages/QuestionPage'
import QuestionSuggestionPage from './pages/QuestionSuggestionPage'
import WhereIsQuiz from './pages/WhereIsQuiz'
import { main } from './utils'

const router = createHashRouter([
  {
    path: '/',
    element: <LogInPage />
  },
  {
    path: '/questions',
    element: <QuestionListPage />
  },
  {
    path: '/question/:id',
    element: <QuestionPage />
  },
  {
    path: '/about',
    element: <AuthorPage />
  },
  {
    path: '/suggest',
    element: <QuestionSuggestionPage />
  },
  {
    path: '/where-is-quiz',
    element: <WhereIsQuiz />
  },
  {
    path: '*',
    element: <LogInPage />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Layout>
    <RouterProvider router={router} />
  </Layout>
)

main()
