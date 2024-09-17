import AdminNavbar from "../components/AdminNavBar"
import React, { useState, useEffect } from "react"
import {useTable} from "react-table";
import EditIcon from "../assets/edit.png"
import Button from "../components/Button";
import Table from "../components/Table";

const AdminEvents = () => {
    const tabsStyle = "relative z-0 block w-[100px] border-2 border-[#83AF9B] bg-[#ECE5CE]"
    const buttonStyle = "relative z-0 block w-[100px] border border-[#83AF9B] rounded-md shadow-sm shadow-[#83AF9B] bg-[#ECE5CE]"
    const data = React.useMemo(
        () => [
            { id: 1, title: "Test", nameOfPlace: "Test", address: "Test", date: "Test", time: "Test", description: "Test", dateCreated: "Test", image: "Test" },
            { id: 2, title: "Test", nameOfPlace: "Test", address: "Test", date: "Test", time: "Test", description: "Test", dateCreated: "Test", image: "Test" },
            { id: 3, title: "Test", nameOfPlace: "Test", address: "Test", date: "Test", time: "Test", description: "laskdjflkasdlfjlasdjflasdjdsalkjflkasdjlkasdflasdldkfalk;sdjflasdjflk;sadlfasdlk;fjaslkdjflkasdjlkdasjfldajflk", dateCreated: "Test", image: "Test" },
        ],
        []
    );

    const columns = React.useMemo(
        () => [
            { Header: "Id", accessor: "id" },
            { Header: "Title", accessor: "title" },
            { Header: "Place", accessor: "nameOfPlace" },
            { Header: "Address", accessor: "address" },
            { Header: "Date", accessor: "date" },
            { Header: "Time", accessor: "time" },
            { Header: "Description", accessor: "description" },
            { Header: "Date Created", accessor: "dateCreated" },
            { Header: "Image", accessor: "image" },
        ],
        []
    );

    const mobileData = React.useMemo(
        () => [
            { id: 1, title: "Test", description: "Test"},
            { id: 2, title: "Test", description: "alsdjflsajfjaksdljfklasjdlkfjasjflkasdjflk;kasddjflkdsa"},
        ],
        []
    );

    const mobileColumns = React.useMemo(
        () => [
            { Header: "Id", accessor: "id" },
            { Header: "Title", accessor: "title" },
            { Header: "Description", accessor: "description" },
        ],
        []
    );

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
                    <Table columns={mobileColumns} data={mobileData} /> : <Table columns={columns} data={data} />
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