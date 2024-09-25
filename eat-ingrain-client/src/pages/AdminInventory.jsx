import AdminNavbar from "../components/AdminNavBar"
import React, { useState, useEffect } from "react"
import Button from "../components/Button";
import Table from "../components/Table";
import { InventoryData, InventoryColumns, InventoryMobileData, InventoryMobileColumns } from "./FakeData";

const AdminInventory = () => {
    const buttonStyle = "relative z-0 block w-[100px] border border-[#83AF9B] rounded-md shadow-sm shadow-[#83AF9B] bg-[#ECE5CE]"
    const [isMobile, setIsMobile] = useState(false);
    const handleResize = () => {
        if (window.innerWidth < 800) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
        <div className="absolute top-0 bg-white">
            <AdminNavbar />
            <div className="mx-auto inline-block mb-10">
                {isMobile ? 
                    <Table columns={InventoryMobileColumns} data={InventoryMobileData} /> : <Table columns={InventoryColumns} data={InventoryData} />
                }
                <div className="flex flex-wrap gap-10 items-end justify-end pr-5">
                    <Button name="Add" style={buttonStyle}/>
                    <Button name="Delete" style={buttonStyle}/> 
                </div>
            </div> 
        </div>
    )
}
export default AdminInventory;