
import AdminNavbar from "../components/AdminNavBar"
import handcart from "../assets/handcart.png"
import confetti from "../assets/confetti.png"
import createOrder from "../assets/createOrder.png"
import Widget from "../components/Widget"
import Dropdown from "../components/Dropdown"
const AdminDashboard = () => {
    return (
        <>
            <div className="mx-auto w-4/5 mt-10 mb-5 flex items-center">
                <AdminNavbar />
                <Dropdown />
            </div>
            
            <div className="mx-auto w-4/5 mb-5">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
            <div className="mx-auto w-4/5 flex flex-wrap justify-center items-center gap-24 border-2 border-[#83AF9B] rounded-lg p-[40px] mb-10">
                <Widget title="Inventory" icon={handcart} link="/admin/inventory" />
                <Widget title="Event" icon={confetti} link="/admin/event" />
                <Widget title="Orders" icon={createOrder} link="/admin/orders" />
            </div>
        </>
    )
}

export default AdminDashboard