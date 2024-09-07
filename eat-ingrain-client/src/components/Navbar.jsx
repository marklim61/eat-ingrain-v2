import React from 'react'
import { NavLink } from 'react-router-dom'
import ingrain_Logo from '../assets/transparentINGRAIN.png'

const Navbar = () => {
  return (
    <div className="w-full flex justify-center p-10 z-10">
        <NavLink to="/">
          <img src={ingrain_Logo} alt="Logo" className="h-auto max-h-[8rem] min-h-[4rem] md:h-[calc(100vw/12)] sm:h-[calc(100vw/12)] cursor-pointer" />
        </NavLink>
      </div>
  )
}

export default Navbar