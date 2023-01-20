import '../../App.scss'

import { Footer } from './components/Footer'
import { Header } from './components/Header'

export default function Layout ({ children }) {
  return (
    <div className='flex flex-col'>
      <Header />

      <div className='max-w-4xl self-center px-8 text-white grow'>
        {children}
      </div>

      <Footer />
    </div>
  )
}
