import { Iuser } from "types/interfaces"

export const user: Iuser = JSON.parse(localStorage.getItem('user') as string) 
export const jwt = JSON.parse(localStorage.getItem('jwt') as string)
export const authorization = { headers: { Authorization: `Bearer ${jwt}` } }