import React from 'react'
import { NavLink } from 'react-router-dom'
import ingrain_Logo from '../assets/transparentINGRAIN.png'

const Navbar = () => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 mt-12">
        <NavLink to="/">
          <img src={ingrain_Logo} alt="Logo" className="lg:h-32 md:h-16 sm:h-16 cursor-pointer" />
        </NavLink>
      </div>
  )
}

export default Navbar