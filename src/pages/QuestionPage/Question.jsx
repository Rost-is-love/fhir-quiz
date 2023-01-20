import axios from 'axios'
import cn from 'classnames'
import { useState } from 'react'

import '../../App.scss'
import { LikeButton } from './LikeButton'

export const Question = ({ setQuestionData, questionData, currentUser }) => {
  let [selectedOptionValue, setSelectedOptionValue] = useState('')
  let [resultVisible, setResultVisible] = useState(false)
  let tip = questionData.options.find(
    (valueAndTip) => valueAndTip.value.trim() === selectedOptionValue.trim()
  )?.tip

  let submitResponse = async (answer, question, currentUser) => {
    setResultVisible(true)
    await axios.put(
      `https://fhirquiz.edge.aidbox.app/QuestionResponse/${currentUser.id}_${question.id}`,
      {
        user: {
          resourceType: 'User',
          id: currentUser.id
        },
        question: {
          resourceType: 'Question',
          id: question.id
        },
        response: answer
      }
    )
  }

  return (
    <>
      <h1 className='tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold '>
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'>
          Question #{questionData.id}
        </span>
        <span className='text-xl ml-2 pb-1 text-white'>
          by {questionData?.user?.name?.formatted}
        </span>
      </h1>

      <p className='text-white text-xl tracking-wide text-left mb-10'>
        {questionData.question}
      </p>

      <div className='flex gap-4 flex-col mb-7'>
        {questionData.options?.map(({ value }, i) => {
          return (
            <div
              className='flex items-center mb-1 hover:cursor-pointer'
              key={i}
            >
              <input
                id={`default-radio-${i + 1}`}
                type='radio'
                value=''
                checked={selectedOptionValue === value}
                name='default-radio'
                className='w-4 h-4 accent-pink-500'
                onClick={() => {
                  setSelectedOptionValue(value)
                  setResultVisible(false)
                }}
              />
              <label
                id={`label-radio-${i + 1}`}
                htmlFor={`default-radio-${i + 1}`}
                className={cn({
                  'option-text ml-2 text-l text-left font-medium text-white': true,
                  'text-green-500':
                    resultVisible &&
                    selectedOptionValue === value &&
                    selectedOptionValue.trim() === questionData.answer.trim(),
                  'text-red-500':
                    resultVisible &&
                    selectedOptionValue === value &&
                    selectedOptionValue.trim() !== questionData.answer.trim()
                })}
              >
                {value}
              </label>
            </div>
          )
        })}
      </div>

      <div className='flex justify-between mb-10'>
        <div>
          <button
            className='px-6 mr-7 flex items-center rounded-xl text-2xl font-medium justify-center bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500'
            style={{ padding: '8px 24px 8px 24px' }}
            onClick={() => {
              submitResponse(selectedOptionValue, questionData, currentUser)
            }}
          >
            Submit
          </button>
        </div>
        <LikeButton
          questionData={questionData}
          setQuestionData={setQuestionData}
          currentUser={currentUser}
        />
      </div>
      {resultVisible && tip && (
        <div className='tip-place'>
          <h3 className='font-semibold text-xl'>Tip:</h3>
          <p className='tip-text'>{tip}</p>
        </div>
      )}
    </>
  )
}
