import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>workout buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button onClick={logout}>logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to='/login'>login</Link>
              <Link to='/signup'>signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
