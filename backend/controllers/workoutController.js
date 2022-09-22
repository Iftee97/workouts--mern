const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 }) // gets all workouts and sorts by the newest ones created
  res.status(200).json(workouts)
}

// get single workout
const getWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such workout' })
  }

  const workout = await Workout.findById(id)
  if (!workout) {
    return res.status(404).json({ error: 'no such workout' })
  }

  res.status(200).json(workout)
}

// post a workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body

  const emptyFields = []
  if (!title) {
    emptyFields.push('title')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const workout = await Workout.create({ title, reps, load, user_id })
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such workout' })
  }

  const workout = await Workout.findByIdAndDelete(id)
  if (!workout) {
    return res.status(400).json({ error: 'no such workout' })
  }

  res.status(200).json(workout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'no such workout' })
  }

  const workout = await Workout.findByIdAndUpdate(id, req.body, { new: true })
  if (!workout) {
    return res.status(400).json({ error: 'no such workout' })
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}
