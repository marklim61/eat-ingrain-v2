import React from 'react'
import { NavLink } from 'react-router-dom'
import IngrainLogo from '../assets/transparentINGRAIN.png'
import Dropdown from "../components/Dropdown"
import Button from "../components/Button"

const Navbar = () => {
  const buttonStyle = "relative z-0 block w-[100px] border border-[#83AF9B] rounded-md shadow-sm shadow-[#83AF9B] bg-[#ECE5CE] px-4 py-2 pr-8"
  return (
  <>
    <div id="AdminNavbarContainer" className="mx-auto w-4/5 flex flex-wrap justify-between gap-10 p-10 z-10">
      <NavLink to="/admin">
        <img src={IngrainLogo} alt="Logo" className="h-10" />
      </NavLink>
      <div className="flex sm:flex-row flex-col gap-10">
        <Button name="Inventory" style={buttonStyle}/>
        <Button name="Events" style={buttonStyle}/>
        <Button name="Orders" style={buttonStyle}/>
        <Dropdown /> 
      </div>
    </div>
  </>  
  )
}

export default Navbar;