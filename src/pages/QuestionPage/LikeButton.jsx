import axios from 'axios'

import '../../App.scss'
import { LikeIcon, LikedIcon } from '../../icons'

export const LikeButton = ({ questionData, setQuestionData, currentUser }) => {
  let like = !!questionData.like?.id

  let addLike = async () => {
    let likeId = `${questionData.id}_${currentUser.id}`
    setQuestionData((oldState) => ({ ...oldState, like: { id: likeId } }))
    await axios.put(`https://fhirquiz.edge.aidbox.app/Like/${likeId}`, {
      user: {
        resourceType: 'User',
        id: currentUser.id
      },
      question: {
        resourceType: 'Question',
        id: questionData.id
      }
    })
  }

  let removeLike = async () => {
    let likeId = questionData.like?.id
    setQuestionData((oldState) => ({ ...oldState, like: undefined }))
    await axios.delete(`https://fhirquiz.edge.aidbox.app/Like/${likeId}`)
  }

  return (
    <button
      className='cursor-pointer flex items-center'
      onClick={like ? removeLike : addLike}
    >
      {like ? 'liked' : 'like'}
      {like ? <LikedIcon /> : <LikeIcon />}
    </button>
  )
}
