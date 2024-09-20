import React from "react";

// For Events
const EventsData = [
    { id: 1, title: "Test", nameOfPlace: "Test", address: "Test", date: "Test", time: "Test", description: "Test", dateCreated: "Test", image: "Test" },
    { id: 2, title: "Test", nameOfPlace: "Test", address: "Test", date: "Test", time: "Test", description: "Test", dateCreated: "Test", image: "Test" },
    { id: 3, title: "Test", nameOfPlace: "Test", address: "Test", date: "Test", time: "Test", description: "laskdjflkasdlfjlasdjflasdjdsalkjflkasdjlkasdflasdldkfalk;sdjflasdjflk;sadlfasdlk;fjaslkdjflkasdjlkdasjfldajflk", dateCreated: "Test", image: "Test" },
];

const EventsColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "Title", accessor: "title" },
    { Header: "Place", accessor: "nameOfPlace" },
    { Header: "Address", accessor: "address" },
    { Header: "Date", accessor: "date" },
    { Header: "Time", accessor: "time" },
    { Header: "Description", accessor: "description" },
    { Header: "Date Created", accessor: "dateCreated" },
    { Header: "Image", accessor: "image" },
];

const EventsMobileData = [
    { id: 1, title: "Test", description: "Test" },
    { id: 2, title: "Test", description: "alsdjflsajfjaksdljfklasjdlkfjasjflkasdjflk;kasddjflkdsa" },
];

const EventsMobileColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "Title", accessor: "title" },
    { Header: "Address", accessor: "address" },
    { Header: "Date", accessor: "date" },
    { Header: "Time", accessor: "time" },
    { Header: "Description", accessor: "description" },
];

// For Orders
const OrdersData = [
    { id: 1, firstName: "Test", lastName: "Test", email: "Test", address: "Test", aptNum: "Test", city: "Test", country: "Test", state: "Test", zipCode: "Test", phone: "Test", Status: "Test", dateCreated: "Test" },
    { id: 2, firstName: "Test", lastName: "Test", email: "Test", address: "Test", aptNum: "Test", city: "Test", country: "Test", state: "Test", zipCode: "Test", phone: "Test", Status: "Test", dateCreated: "Test" },
    { id: 3, firstName: "Test", lastName: "Test", email: "Test", address: "Test", aptNum: "Test", city: "Test", country: "Test", state: "Test", zipCode: "Test", phone: "Test", Status: "Test", dateCreated: "Test" },
];

const OrdersColumns = [
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

const OrdersMobileData = [
    { id: 1, firstName: "Test", lastName: "Test", Status: "Test" },
    { id: 2, firstName: "Test", lastName: "Test", Status: "alsdjflsajfjaksdljfklasjdlkfjasjflkasdjflk;kasddjflkdsa" },
];

const OrdersMobileColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "First Name", accessor: "firstName" },
    { Header: "Last Name", accessor: "lastName" },
    { Header: "Status", accessor: "Status" },
];

// For Inventory
const InventoryData = [
    { id: 1, productName: "Test", description: "Test", price: "Test", size: "Test", quantity: 10, dateCreated: "Test" },
    { id: 2, productName: "Test", description: "Test", price: "Test", size: "Test", quantity: 10, dateCreated: "Test" },
    { id: 3, productName: "Test", description: "Test", price: "Test", size: "Test", quantity: 10, dateCreated: "Test" },
];

const InventoryColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "Product Name", accessor: "productName" },
    { Header: "Description", accessor: "description" },
    { Header: "Price", accessor: "price" },
    { Header: "Size", accessor: "size" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Date Created", accessor: "dateCreated" },
];

const InventoryMobileData = [
    { id: 1, productName: "Test", description: "Test" },
    { id: 2, productName: "Test", description: "alsdjflsajfjaksdljfklasjdlkfjasjflkasdjflk;kasddjflkdsa" },
];

const InventoryMobileColumns = [
    { Header: "Id", accessor: "id" },
    { Header: "Product Name", accessor: "productName" },
    { Header: "Description", accessor: "description" },
];

export { EventsData, EventsColumns, EventsMobileData, EventsMobileColumns, OrdersData, OrdersColumns, OrdersMobileData, OrdersMobileColumns, InventoryData, InventoryColumns, InventoryMobileData, InventoryMobileColumns };
