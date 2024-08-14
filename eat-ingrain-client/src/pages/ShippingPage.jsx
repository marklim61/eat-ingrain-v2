import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const ShippingPage = ({ onContinueToPayment, summary }) => {
  const { subtotal, shipping, tax, balance, itemCount } = summary;

  // Determine the correct word for "item"
  const itemsLabel = itemCount === 1 ? "item" : "items";

  const [shippingInfo, setShippingInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States", // Default value
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add validation here if needed
    onContinueToPayment(shippingInfo);
  };

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="flex flex-col p-8 shadow-lg rounded-lg w-[75%] max-w-full mt-64 mb-36 bg-ingrain-board-color">
        <ul className="steps mb-6">
          <li className="step step-primary">Cart</li>
          <li className="step step-primary">Shipping</li>
          <li className="step">Payment</li>
          <li className="step">Review</li>
        </ul>

        {/* Left Section: Shipping Info */}
        <div className="flex justify-between space-x-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold aesthet-nova">
                Shipping Information
              </h2>
              <NavLink
                to="/shopping-cart"
                className="text-lg aesthet-nova-h1 hover:underline hover:text-ingrain-color-orange"
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Cart
              </NavLink>
            </div>
            {/* Contact Information */}
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="font-semibold aesthet-nova-h3 text-md"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleChange}
                  className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                  required
                />
              </div>

              {/* Name Fields */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                    required
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="font-semibold aesthet-nova-h3 text-md"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleChange}
                  className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="apartment"
                  className="font-semibold aesthet-nova-h3 text-md"
                >
                  Apartment, Suite, etc. (Optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  value={shippingInfo.apartment}
                  onChange={handleChange}
                  className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                />
              </div>

              {/* City and Country Fields */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="country"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    Country/Region
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                    required
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>
              </div>

              {/* State and Zip Code Fields */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="state"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="zipCode"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                    required
                  />
                </div>
              </div>

              {/* Phone Number (Optional) */}
              <div className="mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="font-semibold aesthet-nova-h3 text-md"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={shippingInfo.phoneNumber}
                  onChange={handleChange}
                  className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                />
              </div>
            </form>
          </div>

          {/* Right Section: Summary */}
          <div className="w-1/3 pt-8">
            <div className="p-8 bg-ingrain-color-orange shadow-lg rounded-lg sticky top-16">
              <h2 className="text-2xl font-semibold mb-6">Summary</h2>
              <div className="p-4 rounded-lg flex-grow">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">Subtotal ({itemCount} {itemsLabel})</span>
                  <span className="text-lg font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Shipping & Handling
                  </span>
                  <span className="text-lg font-semibold">${shipping}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Tax (Calculated at Checkout)
                  </span>
                  <span className="text-lg font-semibold">${tax}</span>
                </div>
                <div className="flex justify-between border-t pt-4 mb-4">
                  <span className="text-lg font-semibold">Balance:</span>
                  <span className="text-lg font-semibold">${balance}</span>
                </div>
                <div className="flex justify-center">
                  <NavLink
                    to="/payment"
                    className="w-full py-2 bg-neutral-950 text-ingrain-color-orange text-xl rounded mt-4 text-center max-w-xs"
                  >
                    Proceed to Payment
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
