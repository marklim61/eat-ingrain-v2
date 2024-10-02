import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen); // Toggle the dropdown's open state
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
          className="btn m-1 bg-[#ff723a] drop-shadow-lg"
          onClick={toggleDropdown}
        >
          Menu
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box z-[1] w-52 p-2 drop-shadow-lg bg-base-100"
        >
          <li>
            <NavLink to="/admin/inventory" onClick={() => setIsOpen(false)}>
              Inventory
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/events" onClick={() => setIsOpen(false)}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/orders" onClick={() => setIsOpen(false)}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/logout" onClick={() => setIsOpen(false)}>
              Logout
            </NavLink>
          </li>
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
