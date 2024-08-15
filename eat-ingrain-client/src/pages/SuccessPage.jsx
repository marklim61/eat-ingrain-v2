// SuccessPage.js
import React from "react";
import { NavLink } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-ingrain-color-green mb-4">
          Payment Successful!
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
  );
};

export default SuccessPage;
