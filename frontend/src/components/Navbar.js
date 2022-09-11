import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>workout buddy</h1>
        </Link>
        <nav>
          <div>
            <button onClick={handleClick}>logout</button>
          </div>
          <div>
            <Link to='/login'>login</Link>
            <Link to='/signup'>signup</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
