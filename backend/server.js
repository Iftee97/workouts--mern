require('dotenv').config()
const express = require('express')
const app = express()
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose')

// connect to mongoose
const main = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('connected to mongo db')
}
main().catch(err => console.log(err))

// middlewares
app.use(express.json()) // checks for data in req.body

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use('/api/workouts', workoutRoutes)

app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`)
})
