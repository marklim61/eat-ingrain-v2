import React, { useState } from 'react'
import grainy from '../assets/transparentGrainy2.png'
import './speechbubble.css'
import './Style.css'
import SpeechBubble from '../components/SpeechBubble'
import Navbar from '../components/Navbar'

const Home = () => {
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
          className="absolute top-0 mt-40 pointer-events-none" />
      </div>

      <div className="fixed grid grid-cols-2 grid-rows-2 w-full h-full mt-16 gap-6">
        <SpeechBubble speech="About" position={"top-left-tail"} link={"/about"} />
        <SpeechBubble speech="Events" position={"top-right-tail"} link={"/events"} />
        <SpeechBubble speech="Shop" position={"bottom-left-tail"} link={"/shop"}/>
        <SpeechBubble speech="Contact" position={"bottom-right-tail"} link={"/contact"} />
      </div>
    </div>
    </>
  )
}

export default Home