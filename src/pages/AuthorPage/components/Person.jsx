export function Person ({ name, avatarUrl, github }) {
  let gitUrl = `https://github.com/${github}`
  return (
    <a
      href={gitUrl}
      target='_blank'
      rel='noreferrer'
    >
      <div className='flex flex-col gap-4'>
        <img
          className='rounded-full w-32'
          src={avatarUrl}
          alt={name}
        />
        <div className='text-white'>{name}</div>
      </div>
    </a>
  )
}
