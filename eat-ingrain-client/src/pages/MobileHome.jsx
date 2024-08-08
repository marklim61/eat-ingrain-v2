import React from 'react'
import grainy from '../assets/transparentGrainy2.png'
import './Style.css'
import './speechbubble.css'
import { NavLink } from 'react-router-dom'

const MobileHome = () => {

  return (
    // Put everything in a container
    <div className="flex justify-center items-center max-h-screen max-w-screen bg-white">

      {/* Center grainy */}
      <div className="inset-0 justify-center flex items-center h-screen pt-12"> 
        <img 
          src={grainy} 
          alt="Character" 
          width={600} 
          className="pointer-events-none bg-white" />
      </div>
      
      {/* Speech Bubbles */}
      <div className="absolute flex justify-center items-center mt-96 pt-36 space-x-4">
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
  )
}

export default MobileHome