import React from 'react'
import { PropsChildren } from '../../types'
const Login = ({ children }: PropsChildren) => {
  return (
    <div>
      login
      {children}
    </div>
  )
}

export default Login
