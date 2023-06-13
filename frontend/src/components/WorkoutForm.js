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
      const response = await fetch('/api/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(workout)
      })
      const json = await response.json()
      console.log('json: >>>>>>>>>', json)
      if (response.ok) {
        setEmptyFields([])
        setError(null)
        setLoad('')
        setReps('')
        setTitle('')
        dispatch({ type: 'CREATE_WORKOUT', payload: json })
        console.log('new workout created')
      } else {
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setError('Could not create workout. Try again.')
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
