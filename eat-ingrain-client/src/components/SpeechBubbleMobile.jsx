import { NavLink } from 'react-router-dom'

const SpeechBubbleMobile = ({speech, link}) => {
    return (
        <NavLink to={link}>
          <p className='speech-bubble-mobile aesthet-nova-h2'>{speech}</p>
        </NavLink>
    )
}

export default SpeechBubbleMobile