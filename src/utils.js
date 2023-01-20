import axios from 'axios'

import { addUser } from './store/user'

export const hasUser = async () => {
  try {
    let user = await axios.get(
      'https://fhirquiz.edge.aidbox.app/auth/userinfo'
      // {
      //   headers: {
      //     authorization:
      //         'Bearer ZmZlMTQyZDAtYzFlNi00N2QyLTlhMGItM2JjNzk1MTk3YWJm'
      //   }
      // }
    )
    addUser(user.data)
    return true
  } catch (error) {
    console.error(error)
  }

  return false
}

export const main = async () => {
  // let isUserLoggedIn = await hasUser()
  // let hash = window.location.hash

  await hasUser()

  // if (!isUserLoggedIn && hash.length > 0) {
  //   console.log("window.location.href");
  //   window.location.href =
  //     "https://fhirquiz.edge.aidbox.app/Static/index.html/$show";
  // }

  // if (isUserLoggedIn && hash.length === 0) {
  //   window.location.href =
  //     "https://fhirquiz.edge.aidbox.app/Static/index.html/$show/#/mode";
  // }
}
