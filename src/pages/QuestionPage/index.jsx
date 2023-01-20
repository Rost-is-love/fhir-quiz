import { useStore } from '@nanostores/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import '../../App.scss'
import { user } from '../../store/user'

import { NextQuestion } from './NextQuestion'
import { Question } from './Question'

const getNextQuestion = (currentQuestion, allQuestions, userId) => {
  let notAnsweredQuestions = allQuestions.filter((question) => {
    let currentUserRes = question.q_resps?.find(
      (res) => res?.user?.id === userId
    )

    return !(currentUserRes && currentUserRes?.response.trim() === question.q_answer.trim())
  })

  let missNextQuestion =
    (notAnsweredQuestions.length === 1 &&
      notAnsweredQuestions[0].q_id === currentQuestion.id) ||
    notAnsweredQuestions.length === 0

  if (missNextQuestion) {
    return false
  }

  let currentQuestionIdx = notAnsweredQuestions.findIndex(
    (item) => item.q_id === currentQuestion.id
  )

  let nextQuestionInx =
    currentQuestionIdx + 1 === notAnsweredQuestions.length
      ? 0
      : currentQuestionIdx + 1

  return notAnsweredQuestions[nextQuestionInx].q_id
}

export default function QuestionPage () {
  let currentUser = useStore(user)
  let [ questionData, setQuestionData ] = useState(null)
  let [ nextQuestion, setNextQuestion ] = useState(null)
  let params = useParams()
  let questionId = params.id

  useEffect(() => {
    setQuestionData(null)

    async function fetchData () {
      let currentQuestion = await axios.get(
        `https://fhirquiz.edge.aidbox.app/$query/question-data?currentUserId=${currentUser.id}&questionId=${questionId}`
      )
      let allQuestions = await axios.get(
        'https://fhirquiz.edge.aidbox.app/$query/questions'
      )

      let nextQeust = getNextQuestion(
        currentQuestion.data?.data[0]?.resource,
        allQuestions.data.data,
        currentUser.id
      )

      setQuestionData(currentQuestion.data?.data[0]?.resource)
      setNextQuestion(nextQeust)
    }
    if (currentUser) {
      fetchData().catch((e) => {
        console.error(e)
      })
    }
  }, [ questionId, currentUser, nextQuestion ])

  if (questionData) {
    return (
      <div className='w-full z-50'>
        <Question
          setQuestionData={setQuestionData}
          questionData={questionData}
          currentUser={currentUser}
        />
        <NextQuestion nextQuestion={nextQuestion} />
      </div>
    )
  } else {
    return (
      <div className='w-full z-50'>
        <h1 className=' tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold '>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'>
            Question #{questionId}
          </span>
        </h1>
        {currentUser
          ? 'Loading...'
          : (
            <>
              Please
              {' '}
              <a
                href='/'
                className='underline text-cyan-500'
              >
                LogIn
              </a>
              {' '}
              to save your progress
            </>
          )}
      </div>
    )
  }
}
