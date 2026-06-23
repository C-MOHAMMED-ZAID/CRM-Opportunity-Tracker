import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user')

    return storedUser ? JSON.parse(storedUser) : null
  })
  const [token, setToken] = useState(localStorage.getItem('token'))

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    const { user: loggedInUser, token: authToken } = response.data

    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(loggedInUser))

    setToken(authToken)
    setUser(loggedInUser)

    return response.data
  }

  const register = async (name, email, password) => {
    const response = await api.post('/auth/register', { name, email, password })
    const { user: registeredUser, token: authToken } = response.data

    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(registeredUser))

    setToken(authToken)
    setUser(registeredUser)

    return response.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
