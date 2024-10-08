import AdminNavbar from "../components/AdminNavBar"
import React, { useState, useEffect } from "react"
import Button from "../components/Button";
import Table from "../components/Table";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBox from "../components/ErrorBox";
import { EventsColumns, EventsMobileColumns, EventsTabletColumns } from "../components/AdminColumns";

const AdminEvents = () => {
    const tabsStyle = "relative z-0 block w-[100px] border-2 border-[#83AF9B] bg-[#ECE5CE]"
    const activeTabStyle = "relative z-0 block w-[100px] border-2 border-[#83AF9B] bg-[#FFDDC1]"; // Active tab color
    const buttonStyle = "relative z-0 block w-[100px] border border-[#83AF9B] rounded-md shadow-sm shadow-[#83AF9B] bg-[#ECE5CE]"
    
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [activeTab, setActiveTab] = useState("All");
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);

    
    const handleResize = () => {
        if (window.innerWidth < 600) {
            setIsMobile(true);
            setIsTablet(false);
        } else if (window.innerWidth >= 600 && window.innerWidth < 900) {
            setIsMobile(false);
            setIsTablet(true);
        } else {
            setIsMobile(false);
            setIsTablet(false);
        }
    }

    useEffect(() => {
        // Add event listener to window resize event
        window.addEventListener('resize', handleResize);

        // Call handleResize once to set initial state
        handleResize();

        // Clean up
        return () => {
            // Remove event listener when component is unmounted
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function tab(tabName) {
        setActiveTab(tabName);
    }

    const fetchEvents = async () => {
        setIsLoading(true); // Start loading
        let url = "";

        if (activeTab === "Upcoming") {
            url = "http://localhost:3001/get-upcoming-events";
        } else if (activeTab === "Past") {
            url = "http://localhost:3001/get-past-events";
        } else if (activeTab === "First Time") {
            url = "http://localhost:3001/get-first-time-events";
        } else {
            url = "http://localhost:3001/get-events";
        }

        try {
            const res = await fetch(url);
            const data = await res.json();

            console.log(data);
            if (!Array.isArray(data) || data.length === 0) {
                setEvents([]);
                setHasError(true);
                setError(`No ${activeTab} events found`);
                return;
            } else {
                setHasError(false);
                setError(null);
            }

            const formattedData = data.map(event => ({
                ...event,
                date: new Date(event.date).toDateString(),
            }));
            // console.log(formattedData);
            setEvents(formattedData);
        } catch (err) {
            console.error(err);
            setEvents([]);
            setHasError(true);
            setError("Failed to fetch events");
        } 
        finally {
            setIsLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [activeTab]); // Refetch events when activeTab changes

    return (
        <div className="absolute top-0 h-inherit w-full bg-white">
            <AdminNavbar />
            <h1 className="text-3xl font-bold mx-auto w-4/5 pl-10 pr-10 mb-5">Events</h1>
            <div className="mx-auto w-4/5 mb-10">
                {isMobile ?
                    <div id="tabs-container" className="flex flex-wrap pl-6">
                        <select id="tabs-container" value={activeTab} className={tabsStyle} onChange={(e) => tab(e.target.value)}>
                            <option value="All">All</option>
                            <option value="Upcoming">Upcoming</option>
                            <option value="Past">Past</option>
                            <option value="First Time">First Time</option>
                        </select>
                    </div>
                    :
                    <div id="tabs-container" className="flex flex-wrap pl-6">
                        <Button name="All" style={activeTab === "All" ? activeTabStyle : tabsStyle} onClick={() => tab("All")} />
                        <Button name="Upcoming" style={activeTab === "Upcoming" ? activeTabStyle : tabsStyle} onClick={() => tab("Upcoming")}/>
                        <Button name="Past" style={activeTab === "Past" ? activeTabStyle : tabsStyle} onClick={() => tab("Past")}/>
                        <Button name="First Time" style={activeTab === "First Time" ? activeTabStyle : tabsStyle} onClick={() => tab("First Time")}/>
                    </div>
                }
                {   isLoading ? <LoadingSpinner />
                    : hasError ? <ErrorBox error={error} /> 
                    : isMobile ? <Table columns={EventsMobileColumns} data={events} className="w-full"/> 
                    : isTablet ? <Table columns={EventsTabletColumns} data={events} className="w-full"/> 
                    : <Table columns={EventsColumns} data={events}/> 
                }
                <div className="flex flex-wrap gap-10 items-end justify-end pr-5">
                    <Button name="Add" style={buttonStyle}/>
                    <Button name="Delete" style={buttonStyle}/> 
                </div>
            </div> 
        </div>  
    )
}

export default AdminEvents;