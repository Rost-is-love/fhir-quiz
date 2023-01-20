export function About () {
  return (
    <div className='leading-6 text-white tracking-wide mb-7'>
      Welcome to our FHIR quiz! Are you familiar with the Fast Healthcare Interoperability Resources (FHIR) standard? Whether you{'\''}re a healthcare professional, a developer, or just someone interested in healthcare technology, this quiz is for you. Test your knowledge of FHIR and see how you stack up against others in the field. With questions ranging from the basics to more advanced topics, this quiz is sure to challenge and educate you. So get ready to put your FHIR skills to the test
      –
      {' '}
      <a
        className='underline text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-600'
        href='#/questions'
      >
        let{'\''}s get started!
      </a>
    </div>
  )
}
