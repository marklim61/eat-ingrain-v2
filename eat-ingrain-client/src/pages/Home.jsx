import React, { useState } from 'react'
import grainy from '../assets/transparentGrainy2.png'
import './speechbubble.css'
import './Style.css'
import SpeechBubble from '../components/SpeechBubble'

const Home = () => {
  return (
    // Put everything in a container
  <div className="absolute top-0 z-0 flex justify-center items-center h-screen w-screen">
      {/* Center grainy */}
      <div className="absolute top-0 flex justify-center items-center h-screen w-screen"> 
        <img 
          src={grainy} 
          alt="Character" 
          width={600} 
          className="absolute top-0 mt-20 pointer-events-none" />
      </div>

      <div className="grid grid-cols-2 grid-rows-2 w-full h-full mt-16 gap-6">
        <SpeechBubble speech="About" position={"top-left-tail"} />
        <SpeechBubble speech="Events" position={"top-right-tail"} />
        <SpeechBubble speech="Shop" position={"bottom-left-tail"} />
        <SpeechBubble speech="Contact" position={"bottom-right-tail"} />
      </div>
    </div>
  )
}

export default Home