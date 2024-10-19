import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import IngrainLogo from "../assets/transparentINGRAIN.png";

// Reusable button component for navigation
const NavButton = ({ to, children }) => (
  <NavLink to={to}>
    <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-[#ff723a] hover:bg-ingrain-board-color hover:text-neutral-950 border-[#ff723a] drop-shadow-lg text-lg font-normal">
      {children}
    </button>
  </NavLink>
);

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen); // Toggle the dropdown's open state
  };

  const closeDropdown = () => {
    setIsOpen(false); // Close the dropdown
  };

  const renderNavLink = (to, label) => {
    const isActive = location.pathname === to;
    console.log(`Render link to: ${to}, Active: ${isActive}`); // Log link and its active state

    return (
      <li key={to}>
        <NavLink
          to={to}
          onClick={() => {
            if (isActive) closeDropdown(); // Close dropdown if already on that page
          }}
        >
          {label}
        </NavLink>
      </li>
    );
  };

  return (
    <div className="mx-auto w-full flex flex-wrap justify-between items-center p-12 z-10">
      {/* Logo Section */}
      <div className="flex-1 flex justify-center sm:justify-start">
        <NavLink to="/admin">
          <img src={IngrainLogo} alt="Logo" className="h-16" />
        </NavLink>
      </div>

      {/* Dropdown Menu for Mobile */}
      <div
        className={`dropdown dropdown-end sm:hidden absolute right-0 ${
          isOpen ? "dropdown-open" : ""
        }`}
      >
        <div
          role="button"
          aria-expanded={isOpen}
          className="btn mr-4 ml-4 bg-[#ff723a] shadow-lg"
          onClick={toggleDropdown}
        >
          Menu
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box z-[1] w-52 p-1 shadow-lg bg-base-100 mr-4 ml-4 rounded-tr-none"
        >
          {renderNavLink("/admin/inventory", "Inventory")}
          {renderNavLink("/admin/events", "Events")}
          {renderNavLink("/admin/orders", "Orders")}
          {renderNavLink("/logout", "Logout")}
        </ul>
      </div>

      {/* Standard Nav for larger screens */}
      <div className="hidden sm:flex sm:flex-row flex-col gap-10">
        <NavButton to="/admin/inventory">Inventory</NavButton>
        <NavButton to="/admin/events">Events</NavButton>
        <NavButton to="/admin/orders">Orders</NavButton>
        <NavButton to="/logout">Logout</NavButton>
      </div>
    </div>
  );
};

export default AdminNavbar;
