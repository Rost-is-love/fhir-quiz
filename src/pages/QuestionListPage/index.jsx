import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { PageTitle } from '../../shared/PageTitle'

import { Question } from './components/Question'

export default function QuestionListPage () {
  let [ questions, setQuestion ] = useState([])

  useEffect(() => {
    axios.get('https://fhirquiz.edge.aidbox.app/$query/questions')
      .then(({ data }) => {
        setQuestion(data.data)
      })
  }, [])

  return (
    <div className='question-list w-full z-50'>
      <PageTitle title={'Questions'} />

      <div className='grid content'>
        {questions.map((question) => (
          <Question
            key={question.id}
            question={question}
          />
        ))}
      </div>
    </div>
  )
}
