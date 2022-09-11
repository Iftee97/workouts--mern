import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = async () => {
    localStorage.removeItem('user') // remove user from local storage
    dispatch('LOGOUT') // dispatch logout action
  }

  return {
    logout
  }
}
