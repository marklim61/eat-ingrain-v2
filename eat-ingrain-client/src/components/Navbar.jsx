import React from 'react'
import { NavLink } from 'react-router-dom'
import ingrain_Logo from '../assets/transparentINGRAIN.png'

const Navbar = () => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 mt-12">
        <NavLink to="/">
          <img src={ingrain_Logo} alt="Logo" className="h-auto max-h-[8rem] min-h-[4rem] md:h-[calc(100vw/12)] sm:h-[calc(100vw/12)] cursor-pointer" />
        </NavLink>
      </div>
  )
}

export default Navbar