import React from "react";

// For Events
const EventsColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "Title", accessor: "title" },
    { Header: "Address", accessor: "address" },
    { Header: "Date", accessor: "date" },
    { Header: "Time", accessor: "time" },
    { Header: "Description", accessor: "description" },
    { Header: "Date Created", accessor: "dateCreated" },
    { Header: "Image", accessor: "image" },
];

const EventsMobileColumns = [
    { Header: "Title", accessor: "title" },
];

const EventsTabletColumns = [
    { Header: "Title", accessor: "title" },
    { Header: "Address", accessor: "address" },
    { Header: "Date", accessor: "date" },
    { Header: "Time", accessor: "time" },
];

// For Orders
const OrdersColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
    { Header: "Address", accessor: "address" },
    { Header: "Apt. Number", accessor: "appartmentNumber" },
    { Header: "City", accessor: "city" },
    { Header: "Country", accessor: "country" },
    { Header: "State", accessor: "state" },
    { Header: "Zip Code", accessor: "zipCode" },
    { Header: "Phone", accessor: "phoneNumber" },
    { Header: "Status", accessor: "status" },
    { Header: "Date Created", accessor: "dateCreated" },
];

const OrdersMobileColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Status", accessor: "status" },
];

const OrdersTabletColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Status", accessor: "status" },
];

const OrdersDesktopColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Email", accessor: "email" },
    { Header: "Phone", accessor: "phoneNumber" },
    { Header: "Status", accessor: "status" },
];


// For Inventory

export { 
    EventsColumns,
    EventsMobileColumns,
    EventsTabletColumns, 
    OrdersColumns, 
    OrdersMobileColumns,
    OrdersTabletColumns,
    OrdersDesktopColumns
};
