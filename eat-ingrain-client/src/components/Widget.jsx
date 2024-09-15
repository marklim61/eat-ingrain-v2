import { NavLink } from 'react-router-dom'
const Widget = ({title, icon, link}) => {
    return (
        <NavLink to={link} className="w-[200px] h-[200px] hover:scale-110 p-[40px] flex flex-col justify-center items-center rounded-3xl bg-[#ECE5CE] shadow-lg shadow-[#83AF9B] transition-all duration-300">
            <h2 className='text-xl font-bold'>{title}</h2>
            <img src={icon} alt={`${title} widget`} />
        </NavLink>
    )
}

export default Widget