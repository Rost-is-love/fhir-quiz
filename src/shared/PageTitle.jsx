export function PageTitle ({ title }) {
  return (
    <h1 className='tracking-wide text-5xl mt-7 mb-7 leading-normal font-semibold'>
      <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'>
        {title}
      </span>
    </h1>
  )
}
