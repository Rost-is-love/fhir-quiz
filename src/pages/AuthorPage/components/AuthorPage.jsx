import { PageTitle } from '../../../shared/PageTitle'

import { About } from './About'
import { Person } from './Person'

let authors = [
  {
    name: 'Vlad Ganshin',
    github: 'vganshin',
    avatarUrl: 'https://avatars.githubusercontent.com/u/1931520?v=4'
  },
  {
    name: 'Rostislav Antonov',
    github: 'Rost-is-love',
    avatarUrl: 'https://avatars.githubusercontent.com/u/67863957?v=4'
  },
  {
    name: 'Ilya Eremeev',
    github: 'eremec',
    avatarUrl: 'https://avatars.githubusercontent.com/u/38000648?v=4'
  },
  {
    name: 'Pavel Sadovnikov',
    github: 'Yers1n1a',
    avatarUrl: 'https://avatars.githubusercontent.com/u/32289620?v=4'
  },
  {
    name: 'Varvara Semenova',
    github: 'VarvaraSemenova',
    avatarUrl: 'https://avatars.githubusercontent.com/u/30662300?v=4'
  }
]

export function AuthorPage () {
  return (
    <>
      <PageTitle title={'About'} />

      <About />

      <PageTitle title={'Authors'} />

      <div className='flex text-center gap-10'>
        {authors.map((author) => (
          <Person
            key={author.name}
            name={author.name}
            github={author.github}
            avatarUrl={author.avatarUrl}
          />
        ))}
      </div>
    </>
  )
}
