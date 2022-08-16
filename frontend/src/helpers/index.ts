import { jwt } from "constants/index"

export const checkIsLogin = () => {
  if (jwt) {
    window.location.href = '/dashboard'
  }
}

export const checkIsNotLogin = () => {
  if (!jwt) {
    window.location.href = '/auth/login'
  }
}


