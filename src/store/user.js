import { atom } from "nanostores";

export const user = atom({});

export function addUser(userData) {
  user.set(userData);
}
