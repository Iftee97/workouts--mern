import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchWorkouts } = useWorkoutsContext()

  const logout = async () => {
    try {
      setLoading(true)
      localStorage.removeItem('user') // remove user from local storage
      dispatch({ type: 'LOGOUT' }) // dispatch logout action
      dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null }) // dispatch set workouts action
      setLoading(false)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return {
    logout,
    loading,
    error
  }
}
