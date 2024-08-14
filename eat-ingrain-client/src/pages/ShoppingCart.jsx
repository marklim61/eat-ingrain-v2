import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const ShoppingCart = ({ cartItems, updateQuantity, removeItem }) => {
  const formatPrice = (priceInCents) => (priceInCents / 100).toFixed(2);

  const calculateSubtotal = () => {
    return cartItems
      .reduce((acc, item) => acc + (item.priceInCents / 100) * item.quantity, 0)
      .toFixed(2);
  };

  // Calculate total quantity of items
  const calculateTotalItems = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  };

  // Determine singular or plural for "item(s)"
  const itemsLabel = calculateTotalItems() === 1 ? "item" : "items";

  const calculateShippingHandling = () => {
    return "5.99"; // Example flat rate for shipping and handling
  };

  const calculateTax = () => {
    return "0.00";
  };

  const calculateBalance = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = parseFloat(calculateShippingHandling());
    // Tax will be calculated at checkout, so we just add subtotal + shipping
    return (subtotal + shipping).toFixed(2);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col p-8 shadow-lg rounded-lg w-[75%] max-w-full mt-64 mb-36 bg-ingrain-board-color">
        <ul className="steps mb-6">
          <li className="step step-primary">Cart</li>
          <li className="step">Shipping</li>
          <li className="step">Payment</li>
          <li className="step">Review</li>
        </ul>

        {/* Left Section: Cart Items */}
        <div className="flex flex-grow">
          <div className="w-2/3 pr-8 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-semibold aesthet-nova">
                Your Cart
              </h2>
              <NavLink
                to="/shop"
                className="text-lg aesthet-nova-h1 hover:underline hover:text-ingrain-color-orange"
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Continue Shopping
              </NavLink>
            </div>
            <div className="flex-grow">
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul>
                  {cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center mb-6 border-b pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-contain mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{item.name}</h3>
                        <p>Size: {item.size}</p>
                        <p>Price: ${formatPrice(item.priceInCents)}</p>
                        <div className="flex items-center mt-2">
                          <label htmlFor={`quantity-${index}`} className="mr-2">
                            Quantity:
                          </label>
                          <input
                            type="number"
                            id={`quantity-${index}`}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                index,
                                parseInt(e.target.value, 10)
                              )
                            }
                            className="w-16 p-2 border rounded"
                            min="1"
                          />
                          <button
                            onClick={() => removeItem(index)}
                            className="ml-4 text-red-500"
                          >
                            <FontAwesomeIcon icon={faTimes} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Right Section: Summary */}
          <div className="w-1/3 pt-8">
            <div className="p-8 bg-ingrain-color-orange shadow-lg rounded-lg sticky top-16">
              <h2 className="text-2xl font-semibold mb-6">Summary</h2>
              <div className="p-4 rounded-lg flex-grow">
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Subtotal ({calculateTotalItems()} {itemsLabel})
                  </span>
                  <span className="text-lg font-semibold">
                    ${calculateSubtotal()}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Shipping & Handling
                  </span>
                  <span className="text-lg font-semibold">
                    ${calculateShippingHandling()}
                  </span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Tax (Calculated at Checkout)
                  </span>
                  <span className="text-lg font-semibold">
                    ${calculateTax()}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-4 mb-4">
                  <span className="text-lg font-semibold">Balance:</span>
                  <span className="text-lg font-semibold">
                    ${calculateBalance()}
                  </span>
                </div>
                <div className="flex justify-center">
                  <NavLink
                    to="/shipping"
                    className="w-full py-2 bg-neutral-950 text-ingrain-color-orange text-xl rounded mt-4 text-center max-w-xs"
                  >
                    Proceed to Checkout
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

export default ShoppingCart;
