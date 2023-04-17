import React from 'react'
import { PropsChildren } from '../../types'
const Register = ({ children }: PropsChildren) => {
  return (
    <div className='h-10 w-full bg-orange'>
      register
      {children}
    </div>
  )
}

export default Register
