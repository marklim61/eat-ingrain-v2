
import AdminNavbar from "../components/AdminNavBar"
import handcart from "../assets/handcart.png"
import confetti from "../assets/confetti.png"
import createOrder from "../assets/createOrder.png"
import Widget from "../components/Widget"
import Dropdown from "../components/Dropdown"
import { NavLink } from "react-router-dom"
import IngrainLogo from "../assets/transparentINGRAIN.png"
const AdminDashboard = () => {
    return (
        <div className="absolute top-0 bg-white w-full">
            <div className="mx-auto w-4/5 mt-10 mb-5 flex flex-wrap justify-between items-center">
                <NavLink to="/admin" className="mx-auto">
                    <img src={IngrainLogo} alt="Logo" className="h-auto max-h-[8rem] min-h-[4rem] md:h-[calc(100vw/12)] sm:h-[calc(100vw/12)] cursor-pointer z-10" />
                </NavLink>
                <Dropdown className="justify-end"/>
            </div>
            
            <div className="mx-auto w-4/5 mb-5">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
            <div className="mx-auto w-4/5 flex flex-wrap justify-center items-center gap-24 border-2 border-[#83AF9B] rounded-lg p-[40px] mb-10">
                <Widget title="Inventory" icon={handcart} link="/admin/inventory" />
                <Widget title="Event" icon={confetti} link="/admin/events" />
                <Widget title="Orders" icon={createOrder} link="/admin/orders" />
            </div>
        </div>
    )
}

export default AdminDashboard