import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(email, password)
    await login(email, password)
  }

  return (
    <form className='login' onSubmit={handleSubmit}>
      <h3>login</h3>

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
        {isLoading ? 'logging in...' : 'login'}
      </button>
      {error && <div className='error'>{error}</div>}
    </form>
  )
}

export default Login
