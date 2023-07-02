require('dotenv').config()
const express = require('express')
const app = express()
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
var cors = require('cors')


// connect to mongoose
const main = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('connected to mongo db')
}
main().catch(err => console.log(err))


// middlewares
app.use(express.json()) // checks for data in req.body

app.use(cors({
  // origin: 'http://localhost:3000' || 'http://192.168.0.106:3000' || '*', // development
  origin: 'https://workouts-mern.vercel.app' || '*', // production
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


// home route:
app.get('/', (req, res) => {
  res.json({ message: 'hello world' })
})


// start server
app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`)
})

// production server hosted at https://www.cyclic.sh/
