import AdminNavbar from "../components/AdminNavBar"
import React, { useState, useEffect } from "react"
import Button from "../components/Button";
import Table from "../components/Table";
import { OrdersData, OrdersColumns, OrdersMobileData, OrdersMobileColumns } from "./FakeData";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorBox from "../components/ErrorBox";

const AdminOrders = () => {
    const tabsStyle = "relative z-0 block w-[100px] border-2 border-[#83AF9B] bg-[#ECE5CE]"
    const activeTabStyle = "relative z-0 block w-[100px] border-2 border-[#83AF9B] bg-[#FFDDC1]";
    const buttonStyle = "relative z-0 block w-[100px] border border-[#83AF9B] rounded-md shadow-sm shadow-[#83AF9B] bg-[#ECE5CE]"
    
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState("All");
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState(null);

    const columns = [
        { Header: "Id", accessor: "id" },
        { Header: "First Name", accessor: "firstName" },
        { Header: "Last Name", accessor: "lastName" },
        { Header: "Email", accessor: "email" },
        { Header: "Address", accessor: "address" },
        { Header: "Apt. Number", accessor: "aptNum" },
        { Header: "City", accessor: "city" },
        { Header: "Country", accessor: "country" },
        { Header: "State", accessor: "state" },
        { Header: "Zip Code", accessor: "zipCode" },
        { Header: "Phone", accessor: "phone" },
        { Header: "Status", accessor: "Status" },
        { Header: "Date Created", accessor: "dateCreated" },
    ];
    
    const mobileColumns = [
        { Header: "Id", accessor: "id" },
        { Header: "First Name", accessor: "firstName" },
        { Header: "Last Name", accessor: "lastName" },
        { Header: "Status", accessor: "Status" },
    ];

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

    function tab(tabName) {
        setActiveTab(tabName);
    }

    const fetchOrders = async () => {
        setIsLoading(true); // Start loading
        let url = "";

        if (activeTab === "New") {
            url = "http://localhost:3001//get-new-orders";
        } else if (activeTab === "In Transit") {
            url = "http://localhost:3001/get-orders-in-transit";
        } else if (activeTab === "Delivered") {
            url = "http://localhost:3001/get-orders-delivered";
        } else {
            url = "http://localhost:3001/get-orders";
        }

        try {
            const res = await fetch(url);
            const data = await res.json();

            if (!Array.isArray(data) || data.length === 0) {
                setOrders([]);
                setHasError(true);
                if (activeTab === "All") {
                    setError(`No orders found`);
                } else {
                    setError(`No ${activeTab} orders found`);
                }
                return;
            } else {
                setHasError(false);
                setError(null);
            }

            setOrders(data);
        } catch (err) {
            console.error(err);
            setOrders([]);
            setHasError(true);
            setError("Failed to fetch orders");
        } 
        finally {
            setIsLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [activeTab]); // Refetch events when activeTab changes



    return (
        <div className="absolute top-0 bg-white">
            <AdminNavbar />
            <h1 className="text-3xl font-bold mx-auto w-4/5 pl-10 pr-10 mb-5">Orders</h1>
            <div className="mx-auto w-4/5 mb-10 flex flex-wrap justify-between">
                <div id="tabs-container" className="flex flex-wrap pl-5 pr-5">
                    <Button name="All" style={activeTab === "All" ? activeTabStyle : tabsStyle} onClick={() => tab("All")} />
                    <Button name="New" style={activeTab === "New" ? activeTabStyle : tabsStyle} onClick={() => tab("New")} />
                    <Button name="In Transit" style={activeTab === "In Transit" ? activeTabStyle : tabsStyle} onClick={() => tab("In Transit")} />
                    <Button name="Delivered" style={activeTab === "Delivered" ? activeTabStyle : tabsStyle} onClick={() => tab("Delivered")} />
                </div>
                <div id="filter-container" className="flex flex-wrap pl-5 pr-5">
                    <span className="pr-2">Filter By: </span>
                    <select name="filter" className="border border-[#83AF9B] text-center">
                        <option value="Name">Name</option>
                        <option value="Phone">Phone</option>
                        <option value="Status">Status</option>
                        <option value="Date">Date</option>
                        <option value="Order Number">Order Number</option>
                    </select>
                    <input type="text" className="border border-[#83AF9B] pl-2 pr-2"/>
                </div>
                {isLoading ? <LoadingSpinner />: hasError ? <ErrorBox error={error} /> : isMobile ?
                    <Table columns={mobileColumns} data={orders} /> : <Table columns={columns} data={orders}/> 
                }
                <div className="flex flex-wrap gap-10 items-end justify-end pr-5">
                    <Button name="Add" style={buttonStyle}/>
                    <Button name="Delete" style={buttonStyle}/> 
                </div>
            </div> 
        </div>
    )
}
export default AdminOrders;