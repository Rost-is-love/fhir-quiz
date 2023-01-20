import '../../App.scss'
import { useStore } from '@nanostores/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

import { user } from '../../store/user'

function suggestQuestion (e, suggestion, userId, setSuggested) {
  axios
    .post('https://fhirquiz.edge.aidbox.app/QuestionSuggestion',
      userId ? { ...suggestion, user: { id: userId, resourceType: 'User' } } : suggestion)
    .then((res) => {
      console.log(res.data.entry)
      setSuggested(true)
    })
}

export default function QuestionSuggestionPage () {
  let [ suggested, setSuggested ] = useState(false)
  let [ suggestion, setSuggestion ] = useState(null)
  let currentUser = useStore(user)
  let [ email, setEmail ] = useState(null)

  useEffect(() => {
    setEmail(currentUser?.email)
  }, [ currentUser ])

  if (suggested) {
    return (
      <div>
        <h1 className=' tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold '>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'>
            Where is the quiz?
          </span>
        </h1>

        <div className='leading-6 text-white tracking-wide mb-7'>
          Thank you for submitting the form. We will review it and put you in the waiting list or get back to you.
        </div>

        <span>
          In the meantime you can study FHIR with{' '}
          <a
            className='cursor-pointer text-transparent bg-white bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'
            href='#/questions'
          >
            public questions
          </a>
          .
        </span>
      </div>
    )
  } else {
    return (
      <div>
        <h1 className=' tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold '>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'>
            Where is the quiz?
          </span>
        </h1>

        <div className='leading-6 text-white tracking-wide mb-7'>

          Probably, you clicked on this button to know more about our party mode quiz. Organization of the quiz competition is a complex and exciting process. We are planning to collect more questions and create a platform, that will allow you to play in teams and learn FHIR with fun. We will be happy to organize it in the nearest future. If you and your colleagues want to participate in our party mode quiz, please, let us know by submitting this form. If you have any ideas on how to create the perfect party mode quiz and you are ready to share it with us, let{'\''}s create it together! To apply for the waiting list or submit cooperation, please, fill this form.

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

          {suggestion && email
            ? (
              <div className='w-40'>
                <button
                  className='cursor-pointer flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500'
                  onClick={(e) => suggestQuestion(e, { type: 'where-is-quiz', email, suggestion }, currentUser?.id, setSuggested)}
                >
                  <span className='tracking-wide p-2 flex rounded-xl text-xl font-medium justify-center w-full bg-transparent hover:text-white duration-500'>
                    Submit
                  </span>
                </button>
              </div>
            )
            : (
              <div className='w-40'>
                <div className='flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 text-gray-800'>
                  <span className='tracking-wide p-2 flex rounded-xl text-xl font-medium justify-center w-full bg-transparent'>
                    Submit
                  </span>
                </div>
              </div>
            )}

        </div>
      </div>
    )
  }
}
