// SuccessPage.js
import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SuccessPage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-ingrain-color-green mb-4">
            Order Successful!
          </h1>
          <p className="text-lg mb-6">
            Thank you for your purchase. Your order is being processed.
          </p>
          <NavLink
            to="/"
            className="text-lg font-semibold text-ingrain-color-orange hover:underline"
          >
            Back to Home
          </NavLink>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SuccessPage;
