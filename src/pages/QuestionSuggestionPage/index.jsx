import '../../App.scss'
import { useStore } from '@nanostores/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { SubmitButton } from '../../shared/SubmitButton'
import { user } from '../../store/user'

function suggestQuestion (suggestion, userId, setSuggested) {
  axios
    .post('https://fhirquiz.edge.aidbox.app/QuestionSuggestion',
      userId ? { ...suggestion, user: { id: userId, resourceType: 'User' } } : suggestion)
    .then((res) => {
      console.log(res.data.entry)
      setSuggested(true)
    })
}

const Suggested = (onClick) => (
  <div>
    <h1 className=' tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold '>
      <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'>
        Suggest question
      </span>
    </h1>

    <div className='leading-6 text-white tracking-wide mb-7'>
      Thank you for your contribution.
    </div>

    <button
      className='cursor-pointer text-transparent bg-white bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-600'
      onClick={onClick}
    >
      One more suggestion →
    </button>
  </div>
)

export default function QuestionSuggestionPage () {
  let [suggested, setSuggested] = useState(false)
  let [suggestion, setSuggestion] = useState(null)
  let currentUser = useStore(user)
  let [email, setEmail] = useState(null)

  useEffect(() => {
    setEmail(currentUser?.email)
  }, [currentUser])

  if (suggested) {
    return (
      <Suggested onClick={() => { setSuggested(false); setSuggestion(null) }} />
    )
  }

  return (
    <div>
      <h1 className=' tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold '>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'>
          Suggest question
        </span>
      </h1>

      <div className='leading-6 text-white tracking-wide mb-7'>
        Become a FHIR-star with providing new questions and helping newbies in educating FHIR model.
        <br />
        <br />

        Here you can create and submit your question.

        After submitting this question will be sent to review and published.

        Don{'\''}t forget to provide the correct answer to you question, please.
        You also can add several answer options and explanations of the correct answer. You can even provide the link to the corresponding page of fhir specification or discussion in fhir chat.

        We are looking forward  to receiving your questions!
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          Email:
          <input
            className='rounded-xl text-black py-2 px-4 outline-0 w-2/3'
            placeholder='Email'
            id='email_input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-2'>
          Suggestion:
          <textarea
            className='outline-0 rounded-2xl text-black w-2/3 p-4'
            placeholder='Your suggestion...'
            id='text_input'
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
          />
        </div>
        <SubmitButton
          onClick={() => suggestQuestion({ type: 'suggestion', email, suggestion }, currentUser?.id, setSuggested)}
          disabled={!email || !suggestion}
        />
      </div>
    </div>
  )
}
