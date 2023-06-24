import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(email, password)
    await signup(email, password)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h3>sign up</h3>

      <label>email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button disabled={isLoading}>
        {isLoading ? 'signing up...' : 'sign up'}
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Signup
