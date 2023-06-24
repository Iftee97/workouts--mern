import React, { useState, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { user } = useAuthContext()
  const { workouts, dispatch } = useWorkoutsContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/workouts', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          }
        })
        const json = await response.json()
        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json })
        }
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  return (
    <div className='home'>
      <div className='workouts'>
        {loading && !error ? (
          <p>Loading...</p>
        ) : (
          workouts && workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))
        )}
        {error && <p>{error}</p>}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
