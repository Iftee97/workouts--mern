import React from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleDeleteOnClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok) {
      console.log('workout deleted')
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
    <div className='workout-details'>
      <h4>
        {workout.title}
      </h4>
      <p>
        <strong>
          Load (kg): {workout.load}
        </strong>
      </p>
      <p>
        <strong>
          Reps: {workout.load}
        </strong>
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span
        className="material-symbols-outlined"
        onClick={handleDeleteOnClick}
      >
        delete
      </span>
    </div>
  )
}

export default WorkoutDetails
