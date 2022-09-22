import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchWorkouts } = useWorkoutsContext()

  const logout = async () => {
    localStorage.removeItem('user') // remove user from local storage
    dispatch({ type: 'LOGOUT' }) // dispatch logout action
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null }) // dispatch set workouts action
  }

  return {
    logout
  }
}
