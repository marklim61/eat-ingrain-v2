// Libraries
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faArrowLeft,
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

// Components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Context
import CartContext from "../components/CartContext";

// Utility Functions
const calculateTotalItems = (cartItems) => cartItems.reduce((acc, item) => acc + item.quantity, 0);
const calculateShippingHandling = () => "5.00"; // Example flat rate
const calculateTax = () => "0.00";

const calculateBalance = (subtotal, shipping) => (parseFloat(subtotal) + parseFloat(shipping)).toFixed(2);

// Cart Item Component
const CartItem = ({ item, index, handleDecreaseQuantity, handleIncreaseQuantity, removeItem, formatPrice }) => (
  <li className="flex flex-col md:flex-row items-start mb-6 border-b pb-4">
    <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mr-4" />
    <div className="flex-1 md:mr-4">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p>Size: {item.size}</p>
      <p>Price: ${formatPrice(item.priceInCents)}</p>
      <div className="flex sm:hidden items-center">
        <button
          className="btn rounded-r-none bg-neutral-200 border-neutral-950 bg-opacity-60"
          onClick={() => handleDecreaseQuantity(index, item.quantity)}
        >
          <FontAwesomeIcon icon={item.quantity > 1 ? faMinus : faTrash} />
        </button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => handleIncreaseQuantity(index, parseInt(e.target.value))}
          className="badge w-16 p-6 rounded-none border-neutral-950 bg-white text-center"
          min="1"
        />
        <button
          className="btn rounded-l-none bg-neutral-200 border-neutral-950 bg-opacity-60"
          onClick={() => handleIncreaseQuantity(index, item.quantity)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="hidden sm:flex items-center mt-2">
        <label htmlFor={`quantity-${index}`} className="mr-2">Quantity:</label>
        <input
          type="number"
          id={`quantity-${index}`}
          value={item.quantity}
          onChange={(e) => handleIncreaseQuantity(index, parseInt(e.target.value))}
          className="w-16 p-2 border rounded"
          min="1"
        />
        <button onClick={() => removeItem(index)} className="ml-4 text-red-500">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  </li>
);

// Cart Summary Component
const CartSummary = ({ subtotal, totalItems, calculateShippingHandling, calculateTax, calculateBalance }) => (
  <div className="p-4 md:p-8 bg-ingrain-color-orange shadow-lg rounded-lg sticky top-16">
    <h2 className="text-2xl font-semibold mb-6">Summary</h2>
    <div className="p-4 rounded-lg flex-grow">
      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold">Subtotal ({totalItems} items)</span>
        <span className="text-lg font-semibold">${subtotal}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold">Shipping & Handling</span>
        <span className="text-lg font-semibold">${calculateShippingHandling()}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold">Tax (Calculated at Checkout)</span>
        <span className="text-lg font-semibold">${calculateTax()}</span>
      </div>
      <div className="flex justify-between border-t pt-4 mb-4">
        <span className="text-lg font-semibold">Balance:</span>
        <span className="text-lg font-semibold">${calculateBalance()}</span>
      </div>
      <div className="flex justify-center">
        <NavLink to="/checkout" className="w-full py-2 bg-neutral-950 text-ingrain-color-orange text-xl rounded mt-4 text-center max-w-xs">
          Proceed to Checkout
        </NavLink>
      </div>
    </div>
  </div>
);

const ShoppingCart = () => {
  const { cartItems, updateQuantity, removeItem, calculateSubtotal, formatPrice } = useContext(CartContext);
  const totalItems = calculateTotalItems(cartItems);
  const subtotal = calculateSubtotal();

  const handleDecreaseQuantity = (index, quantity) => {
    quantity === 1 ? removeItem(index) : updateQuantity(index, quantity - 1);
  };

  const handleIncreaseQuantity = (index, quantity) => updateQuantity(index, quantity + 1);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col p-4 md:p-8 shadow-lg rounded-lg w-full md:w-[65%] max-w-full mt-48 md:mt-64 mb-36 bg-ingrain-board-color">
          <ul className="steps mb-6">
            <li className="step step-primary">Cart</li>
            <li className="step">Payment</li>
            <li className="step">Review</li>
          </ul>

          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-2/3 pr-0 md:pr-8 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-4xl font-semibold">Your Cart</h2>
                <NavLink to="/shop" className="text-lg hover:underline hover:text-ingrain-color-orange">
                  <FontAwesomeIcon icon={faArrowLeft} /> Continue Shopping
                </NavLink>
              </div>
              <div className="flex-grow">
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul>
                    {cartItems.map((item, index) => (
                      <CartItem
                        key={index}
                        item={item}
                        index={index}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                        handleIncreaseQuantity={handleIncreaseQuantity}
                        removeItem={removeItem}
                        formatPrice={formatPrice}
                      />
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="w-full md:w-1/3 pt-8">
              <CartSummary
                subtotal={subtotal}
                totalItems={totalItems}
                calculateShippingHandling={calculateShippingHandling}
                calculateTax={calculateTax}
                calculateBalance={() => calculateBalance(subtotal, calculateShippingHandling())}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
