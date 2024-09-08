import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const SpeechBubble = ({ speech, position }) => {
  // State to manage visibility of the speech bubble
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div 
      className="flex justify-center items-center relative"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      {/* <div className="block w-full p-44 rounded-lg shadow-lg opacity-0 hover:opacity-100" /> */}
      {showPopup && (
        <NavLink to="/about" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <p className={`speech-bubble aesthet-nova ${position} uppercase`}>{speech}</p>
        </NavLink>
      )}
    </div>
  );
};

export default SpeechBubble;
