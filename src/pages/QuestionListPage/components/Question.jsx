import { useStore } from '@nanostores/react'

import { CheckIcon } from '../../../icons'
import { user } from '../../../store/user'

export function Question ({ question }) {
  let currentUser = useStore(user)
  function pickQuestionResp (qResponse) {
    return qResponse.user.id === currentUser?.id && qResponse.response === question.q_answer
  }

  function showCheckMark (qResponses) {
    return qResponses?.some(pickQuestionResp)
  }

  let questionUrl = `#/question/${question.q_id}`

  return (
    <div
      key={question.id}
      className='question'
      title={question.q_name}
    >
      {showCheckMark(question?.q_resps.filter(Boolean)) && currentUser?.id
        ? <CheckIcon />
        : <div className='w-5 h-5 mr-3' />
      }

      <a
        className='name truncate mr-7 text-transparent bg-white bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-600'
        href={questionUrl}
      >
        {question.q_name}
      </a>

      <span className='author italic mr-5 max-[800px]:hidden'>by {question.q_author}</span>

      <div className='flex items-center'>
        <div className='text-center whitespace-nowrap'>{question.l_count} votes</div>
      </div>
    </div>
  )
}
