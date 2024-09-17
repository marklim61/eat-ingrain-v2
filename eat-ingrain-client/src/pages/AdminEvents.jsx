import AdminNavbar from "../components/AdminNavBar"
import React, { useState, useEffect } from "react"
import Button from "../components/Button";
import Table from "../components/Table";
import { EventsData, EventsColumns, EventsMobileData, EventsMobileColumns } from "./FakeData";

const AdminEvents = () => {
    const tabsStyle = "relative z-0 block w-[100px] border-2 border-[#83AF9B] bg-[#ECE5CE]"
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
        <>
            <AdminNavbar />
            <div className="mx-auto inline-block mb-10">
                <div id="tabs-container" className="flex flex-row pl-5">
                    <Button name="All" style={tabsStyle}/>
                    <Button name="Upcoming" style={tabsStyle}/>
                    <Button name="Past" style={tabsStyle}/>
                </div>
                {isMobile ? 
                    <Table columns={EventsMobileColumns} data={EventsMobileData} /> : <Table columns={EventsColumns} data={EventsData} />
                }
                <div className="flex flex-wrap gap-10 items-end justify-end pr-5">
                    <Button name="Add" style={buttonStyle}/>
                    <Button name="Delete" style={buttonStyle}/> 
                </div>
            </div> 
        </>  
    )
}

export default AdminEvents;