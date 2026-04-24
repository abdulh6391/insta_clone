import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex h-20 max-w-full bg-red-900 gap-10 items-center justify-around'>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/feed'>Feed</NavLink>
        <NavLink to='/create'>Create</NavLink>
    </div>
  )
}

export default Navbar