import '../../App.scss'

import { Footer } from './components/Footer'
import { Header } from './components/Header'

export default function LogInPage ({ children }) {
  return (
    <div>
      <Header />

      <div className='main_content root text-white grow'>
        {children}
      </div>

      <Footer />
    </div>
  )
}
