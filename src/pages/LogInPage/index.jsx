import '../../App.scss'
import { useStore } from '@nanostores/react'

import { user } from '../../store/user'

// Welcome

export default function LogInPage () {
  let currentUser = useStore(user)

  return (
    <div className='first'>
      <div className='first__container'>
        <div className='w-full p-6  z-50'>
          <h1 className='tracking-wider text-7xl mb-7 font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'>
            FHIR quiz
          </h1>
          <p className='text-center mb-7 text-xl text-white'>
            Quiz and FHIR modeling knowledge base.
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            {currentUser?.id
             ? (
               <div
                 style={{ flexBasis: '400px' }}
                 className='flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500'
               >

                 <a
                   href='#/questions'
                   className='p-6 flex items-center rounded-xl text-4xl font-medium justify-center w-full bg-transparent'
                 >
                   Go to questions
                 </a>
               </div>
             )
             : (
               <div>
                 <div
                   style={{ flexBasis: '400px' }}
                   className='flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500'
                 >
                   <a
                     href='https://fhirquiz.edge.aidbox.app/auth/redirect/github'
                     className='p-6 flex items-center rounded-xl text-4xl font-medium justify-center w-full bg-transparent hover:from-pink-600 hover:to-yellow-400 duration-500'
                   >
                     Sign in with Github
                   </a>
                 </div>

                 <div
                   style={{ flexBasis: '400px' }}
                   className='flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500'
                 >
                   <a
                     href='https://fhirquiz.edge.aidbox.app/auth/redirect/google'
                     className='p-6 flex items-center rounded-xl text-4xl font-medium justify-center w-full bg-transparent hover:from-pink-600 hover:to-yellow-400 duration-500'
                   >
                     Sign in with Google
                   </a>
                 </div>
               </div>
             )}
    </div>
    </div>
    </div>
    <div className='stars-bg'>
      <div id='stars' />
      <div id='stars2' />
      <div id='stars3' />
    </div>
    </div>
  )
}
