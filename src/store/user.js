import { atom } from 'nanostores'

export const user = atom(null)

export function addUser (userData) {
  user.set(userData)
}
