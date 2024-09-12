import React from 'react'
import grainy from '../assets/transparentGrainy2.png'
import './Style.css'
import './speechbubble.css'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MobileHome = () => {

  return (
    <>
    <Navbar/>
    <div className="absolute top-0 z-0 flex justify-center items-center h-screen w-screen">
      {/* Center grainy */}
      <div className="absolute top-0 flex justify-center items-center h-screen w-screen"> 
        <img 
          src={grainy} 
          alt="Character" 
          width={600} 
          className="absolute top-0 mt-20 pointer-events-none" />
      </div>
      
      {/* Speech Bubbles */}
      <div className="absolute bottom-0 mb-10 flex space-x-4">
        <NavLink to="/about">
          <p className='speech-bubble-mobile aesthet-nova-h2'>About</p>
        </NavLink>
        <NavLink to="/events">
          <p className='speech-bubble-mobile aesthet-nova-h2'>Event</p>
        </NavLink>
        <NavLink to="/shop">
          <p className='speech-bubble-mobile aesthet-nova-h2'>Shop</p>
        </NavLink>
        <NavLink to="/contact">
          <p className='speech-bubble-mobile aesthet-nova-h2'>Contact</p>
        </NavLink>
      </div>
    </div>
    </>
  )
}

export default MobileHome