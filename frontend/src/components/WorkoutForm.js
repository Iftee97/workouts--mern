import React, { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('You must be logged in')
      return
    }
    const workout = {
      title,
      load,
      reps
    }
    try {
      setLoading(true)
      const response = await fetch('https://workouts-mern.cyclic.app/api/workouts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workout)
      })
      const json = await response.json()
      console.log('json: >>>>>>>>>', json)
      if (response.ok) {
        dispatch({ type: 'CREATE_WORKOUT', payload: json })
        console.log('new workout created')
      } else {
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
    } catch (error) {
      console.log(error.message)
      setError('Could not create workout. Try again.')
    } finally {
      setEmptyFields([])
      setError(null)
      setLoad('')
      setReps('')
      setTitle('')
      setLoading(false)
    }
  }

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>
        Add a new workout
      </h3>
      <label>
        Exercise Title:
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes('title') ? 'error' : ''}
      />
      <label>
        Load (kg):
      </label>
      <input
        type="number"
        value={load}
        onChange={(e) => setLoad(e.target.value)}
        className={emptyFields.includes('load') ? 'error' : ''}
      />
      <label>
        Reps:
      </label>
      <input
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />
      {error && (
        <div className='error'>
          {error}
        </div>
      )}
      <button type='submit'>
        {loading ? 'Loading...' : 'Add Workout'}
      </button>
    </form>
  )
}

export default WorkoutForm
