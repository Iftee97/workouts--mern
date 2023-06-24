import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout, loading, error } = useLogout()
  const { user } = useAuthContext()

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>
            workout buddy
          </h1>
        </Link>
        <nav>
          {user && (
            <div>
              <span>
                {user.email}
              </span>
              <button onClick={logout}>
                {loading ? 'loading...' : 'logout'}
              </button>
              {error && <p>{error}</p>}
            </div>
          )}
          {!user && (
            <div>
              <Link to='/login'>
                login
              </Link>
              <Link to='/signup'>
                signup
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
