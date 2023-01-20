import cn from 'classnames'

export const SubmitButton = ({ onClick, disabled }) => {
  return (
    <div className='w-40'>
      <div
        className={cn({
          'flex mt-4 p-1 gap-x-2 rounded-xl bg-gradient-to-r': true,
          'cursor-pointer from-yellow-400 to-pink-600 hover:from-pink-600 hover:to-yellow-400 hover:duration-500': !disabled,
          'from-gray-400 to-gray-600 text-gray-800': disabled
        })}
      >
        <button
          onClick={onClick}
          className='tracking-wide p-2 flex rounded-xl text-xl font-medium justify-center w-full bg-transparent hover:text-white duration-500'
        >
          Submit
        </button>
      </div>
    </div>
  )
}
