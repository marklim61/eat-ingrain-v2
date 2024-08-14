import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const PaymentComponent = ({summary}) => {
  const { subtotal, shipping, tax, balance, itemCount } = summary;

  // Determine the correct word for "item"
  const itemsLabel = itemCount === 1 ? "item" : "items";

  return (
    <div className="flex items-start justify-center min-h-screen">
      <div className="flex flex-col p-8 shadow-lg rounded-lg w-[75%] max-w-full mt-64 mb-36 bg-ingrain-board-color">
        <ul className="steps mb-6">
          <li className="step step-primary">Cart</li>
          <li className="step step-primary">Shipping</li>
          <li className="step step-primary">Payment</li>
          <li className="step">Review</li>
        </ul>

        {/* Left Section: Payment Gateway */}
        <div className="flex justify-between space-x-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold aesthet-nova">
                Card Information
              </h2>
              <NavLink
                to="/shipping"
                className="text-lg aesthet-nova-h1 hover:underline hover:text-ingrain-color-orange"
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Back to Shipping Info
              </NavLink>
            </div>
          </div>

          {/* Right Section: Summary */}
          <div className="w-1/3 pt-8">
            <div className="p-8 bg-ingrain-color-orange shadow-lg rounded-lg sticky top-16">
              <h2 className="text-2xl font-semibold mb-6">Summary</h2>
              <div className="p-4 rounded-lg flex-grow">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Subtotal ({itemCount} {itemsLabel})
                  </span>
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
                    Pay
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

export default PaymentComponent;
