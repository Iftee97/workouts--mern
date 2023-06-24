import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages and components
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

const App = () => {
  const { user } = useAuthContext()
  console.log(process.env.REACT_APP_BACKEND_SERVER_URL)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

// backend hosted at: https://workouts-mern.cyclic.app
/*
in package.json:
  "proxy": "https://workouts-mern.cyclic.app", // production backend
  "proxy": "http://localhost:4000", // development backend
*/
