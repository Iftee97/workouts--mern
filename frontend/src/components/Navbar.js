import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <Link to='/'>
          <h1>workout buddy</h1>
        </Link>
        <nav>
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
