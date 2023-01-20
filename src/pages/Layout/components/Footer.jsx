import { GitIcon } from '../../../icons'

import { Link } from './Link'

export function Footer () {
  return (
    <div className='footer show_on_top root flex shrink-0 basis-auto justify-between items-end pt-20 pb-4 z-100'>
      <div>
        <Link
          text='Where is the quiz?'
          href='#/where-is-quiz'
        />
        <br />
        <Link
          text='About'
          href='#/about'
        />
      </div>

      <div className='text-white'>
        Developed at
        {' '}
        <a
          className='underline'
          href='https://health-samurai.io'
          target='_blank'
          rel='noreferrer'
        >
          Health Samurai
        </a>
        . Powered by{' '}
        <a
          className='underline'
          href='https://aidbox.app'
          target='_blank'
          rel='noreferrer'
        >
          aidbox.app
        </a>.
        <br />
        <a
          className='underline flex items-center cursor-pointer'
          href='https://github.com/Rost-is-love/fhir-quiz'
          target='_blank'
          rel='noreferrer'
        >
          <GitIcon />
          GitHub
        </a>
      </div>
    </div>
  )
}
