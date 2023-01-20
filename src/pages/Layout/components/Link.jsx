
export function Link ({ text, href }) {
  return (
    <a
      className='tracking-wide cursor-pointer underline leading-loose font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 transition-all duration-1000 hover:from-pink-600 hover:to-yellow-400'
      href={href}
    >
      {text}
    </a>
  )
}
