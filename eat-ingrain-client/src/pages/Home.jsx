import React, { useState, useEffect } from 'react'
import grainy from '../assets/transparentGrainy2.png'
import './speechbubble.css'
import './Style.css'
import SpeechBubble from '../components/SpeechBubble'
import SpeechBubbleMobile from '../components/SpeechBubbleMobile'
import Navbar from '../components/Navbar'

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
    <Navbar/>
    {/* Center grainy */}
    <div className="mx-auto w-4/5 min-w-[300px] max-w-[500px] h-full pt-16"> 
      <img 
        src={grainy} 
        alt="Character" 
        width="100%" 
        className="pointer-events-none" />
    </div>

    {/* Speech Bubbles */}
    <div className="absolute top-0 z-20 w-screen h-screen flex justify-center items-center">
      {isMobile ? (
        <div className="absolute bottom-0 mb-10 flex space-x-4">
          <SpeechBubbleMobile speech="About" link={"/about"} />
          <SpeechBubbleMobile speech ="Events" link={"/events"} />
          <SpeechBubbleMobile speech="Shop" link={"/shop"} />
          <SpeechBubbleMobile speech="Contact" link={"/contact"} />
        </div>
      ) : (
      <div className="fixed z-20 mx-auto grid grid-cols-2 grid-rows-2 w-4/5 h-full pt-16 gap-6">
        <SpeechBubble speech="About" position={"top-left-tail"} link={"/about"} />
        <SpeechBubble speech="Events" position={"top-right-tail"} link={"/events"} />
        <SpeechBubble speech="Shop" position={"bottom-left-tail"} link={"/shop"}/>
        <SpeechBubble speech="Contact" position={"bottom-right-tail"} link={"/contact"} />
      </div>
      )}
    </div>
    </>
  )
}

export default Home