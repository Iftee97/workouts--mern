const User = require('../models/userModel')
const mongoose = require('mongoose')

// login user
const loginUser = async (req, res) => {
  res.json({ message: 'login user' })
}

// singup user
const singupUser = async (req, res) => {
  res.json({ message: 'signup user' })
}

module.exports = {
  loginUser,
  singupUser
}
