import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ShippingPage = ({ onContinueToPayment }) => {
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
    <div className="flex items-start justify-center min-h-screen p-8">
      <div className="flex flex-col p-8 shadow-lg rounded-lg w-[75%] max-w-full mt-64 mb-36 bg-ingrain-board-color">
        <ul className="steps mb-6">
          <li className="step step-primary">Cart</li>
          <li className="step step-primary">Shipping</li>
          <li className="step">Payment</li>
          <li className="step">Review</li>
        </ul>

        {/* Left Section: Cart Items */}
        <div className="flex justify-between">
          <div className="flex justify-center items-start min-h-screen space-x-6 p-8">
            <form 
              onSubmit={handleSubmit} 
              className="w-full max-w-lg p-8">
              <h2 className="text-3xl font-semibold mb-6">
                Shipping Information
              </h2>

              {/* Contact Information */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>

              {/* Name Fields */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium mb-2"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium mb-2"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Address Fields */}
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium mb-2"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="apartment"
                  className="block text-sm font-medium mb-2"
                >
                  Apartment, Suite, etc. (Optional)
                </label>
                <input
                  type="text"
                  id="apartment"
                  name="apartment"
                  value={shippingInfo.apartment}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                />
              </div>

              {/* City and Country Fields */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium mb-2"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium mb-2"
                  >
                    Country/Region
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
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
                    className="block text-sm font-medium mb-2"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium mb-2"
                  >
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleChange}
                    className="w-full p-3 border rounded"
                    required
                  />
                </div>
              </div>

              {/* Phone Number (Optional) */}
              <div className="mb-6">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium mb-2"
                >
                  Phone Number (Optional)
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={shippingInfo.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-3 border rounded"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-neutral-950 text-ingrain-color-orange text-xl rounded"
              >
                Continue to Payment
              </button>
            </form>
          </div>

          {/* Right Section: Summary */}
          <div className="w-1/3 pt-12">
            <div className="p-8 bg-ingrain-color-orange shadow-lg rounded-lg sticky top-16">
              <h2 className="text-2xl font-semibold mb-6">Summary</h2>
              <div className="p-4 rounded-lg flex-grow">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">Subtotal</span>
                  <span className="text-lg font-semibold">0.00</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Shipping & Handling
                  </span>
                  <span className="text-lg font-semibold">$5.00</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Tax (Calculated at Checkout)
                  </span>
                  <span className="text-lg font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between border-t pt-4 mb-4">
                  <span className="text-lg font-semibold">Balance:</span>
                  <span className="text-lg font-semibold">0.00</span>
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
