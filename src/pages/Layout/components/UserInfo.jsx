import { useStore } from '@nanostores/react'
import axios from 'axios'

import { user as userStore } from '../../../store/user'

function logout () {
  axios.delete('https://fhirquiz.edge.aidbox.app/Session')
    .then((res) => {
      console.log(res.data.entry)
      window.location.reload()
    })
}

export function UserInfo () {
  let user = useStore(userStore)

  if (!user) {
    return (
      <div>
        <a
          className='text-transparent bg-white bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-600'
          href='https://fhirquiz.edge.aidbox.app/auth/redirect/github'
        >
          Sign in
        </a>
      </div>
    )
  }

  return (
    <div className='flex items-center gap-2'>
      <div className='text-transparent bg-white bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-600 cursor-default'>
        {user?.name?.formatted || user?.userName}
      </div>

      <div>
        <img
          className='rounded-full w-10'
          src={user?.photo}
          alt={'user'}
        />
      </div>

      <button
        className='cursor-pointer transition-all duration-1000 text-transparent bg-white bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-pink-600'
        onClick={logout}
      >
        →
      </button>
    </div>
  )
}
