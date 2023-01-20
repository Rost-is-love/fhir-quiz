import { Link } from './Link'
import { UserInfo } from './UserInfo'

export function Header () {
  return (
    <div className='mt-4 mb-12 mx-8 flex justify-between text-white show_on_top max-[800px]:flex-col max-[800px]:items-start'>
      <div className='tracking-wide text-3xl cursor-pointer underline leading-loose font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600 transition-all duration-1000 hover:from-pink-600 hover:to-yellow-400'>
        <a href='#/'>FHIR quiz</a>
      </div>

      <div className='flex items-center gap-7 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-1'>
        <Link
          text='Questions'
          href='#/questions'
        />
        <Link
          text='Suggest question'
          href='#/suggest'
        />

        <UserInfo />
      </div>
    </div>
  )
}
