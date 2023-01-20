import '../../App.scss'

export const NextQuestion = ({ nextQuestion }) => {
  return (
    <>
      {nextQuestion
        ? (
          <div className='mt-10 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500'>
            <a
              href={`#/question/${nextQuestion}`}
              className='p-3 flex items-center rounded-xl text-2xl font-medium justify-center w-full bg-transparent'
            >
              <svg
                className='w-10 h-10 fill-current mr-5'
                viewBox='0 0 16 16'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
              >
                <g>
                  <path d='M8.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H4.75a.75.75 0 000 1.5h4.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.75.75 0 000-1.01l-2.5-2.75a.75.75 0 00-1.06-.05z' />

                  <path
                    fillRule='evenodd'
                    d='M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z'
                    clipRule='evenodd'
                  />
                </g>
              </svg>
              Next Question
            </a>
          </div>
        )
        : (
          <div className='mt-10 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 text-gray-800'>
            <span className='p-3 flex items-center rounded-xl text-2xl font-medium justify-center w-full bg-transparent'>
              <svg
                className='w-10 h-10 fill-current mr-5'
                viewBox='0 0 16 16'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
              >
                <g>
                  <path d='M8.245 4.695a.75.75 0 00-.05 1.06l1.36 1.495H4.75a.75.75 0 000 1.5h4.805l-1.36 1.495a.75.75 0 001.11 1.01l2.5-2.75a.75.75 0 000-1.01l-2.5-2.75a.75.75 0 00-1.06-.05z' />

                  <path
                    fillRule='evenodd'
                    d='M0 8a8 8 0 1116 0A8 8 0 010 8zm8-6.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z'
                    clipRule='evenodd'
                  />
                </g>
              </svg>
              Questions are completed
            </span>
          </div>
        )}
    </>
  )
}
