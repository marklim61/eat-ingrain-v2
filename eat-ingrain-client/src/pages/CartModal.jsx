import React, { useContext, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faTimes,
  faTrash,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

// Context
import CartContext from "../components/CartContext";

const CartModal = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("CartModal must be used within a CartProvider");
  }

  const {
    isCartOpen,
    handleCartClose,
    cartItems,
    updateQuantity,
    removeItem,
    calculateSubtotal,
  } = context;

  // console.log("CartModal isCartOpen:", isCartOpen); // Debugging

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCartClose();
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, handleCartClose]);

  const handleQuantityChange = (index, quantity) => {
    // Ensure quantity is at least 1
    const newQuantity = isNaN(quantity) ? 1 : Math.max(1, quantity);
    updateQuantity(index, newQuantity);
  };

  const handleDecreaseQuantity = (index, quantity) => {
    if (quantity === 1) {
      removeItem(index);
    } else {
      updateQuantity(index, quantity - 1);
    }
  };

  const handleIncreaseQuantity = (index, quantity) => {
    updateQuantity(index, quantity + 1);
  };

  // Close Button Component
  const CloseButton = ({ onClick }) => (
    <div className="absolute left-3">
      <button
        onClick={onClick}
        className="text-gray-500 hover:text-gray-800 text-2xl font-extrabold"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );

  // Empty Cart Message Component
  const EmptyCartMessage = () => (
    <p className="aesthet-nova-h3 text-xl text-bold">Your cart is empty.</p>
  );

  // Cart Item List Component
  const CartItemList = ({
    cartItems,
    handleQuantityChange,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleRemoveItem,
  }) => (
    <ul>
      {cartItems.map((item, index) => (
        <li
          key={index}
          className="mb-4 flex items-center border-b last:border-b-0 pb-4 relative"
        >
          <RemoveItemButton onClick={() => handleRemoveItem(index)} />
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-contain mr-4"
          />
          <CartItemDetails
            item={item}
            index={index}
            handleQuantityChange={handleQuantityChange}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
          />
        </li>
      ))}
    </ul>
  );

  // Remove Item Button Component
  const RemoveItemButton = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-800"
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );

  // Cart Item Details Component
  const CartItemDetails = ({
    item,
    index,
    handleQuantityChange,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
  }) => (
    <div className="flex flex-col justify-between w-full">
      <div>
        <h3 className="text-lg font-semibold aesthet-nova-h1">{item.name}</h3>
        <p className="text-gray-500 aesthet-nova-h3">Size: {item.size}</p>

        <div className="flex items-center">
          {/* Desktop - Quantity Input */}
          <div className="hidden sm:flex items-center">
            <label
              htmlFor={`quantity-${index}`}
              className="mr-2 text-gray-500 aesthet-nova-h3"
            >
              Quantity:
            </label>
            <input
              type="number"
              id={`quantity-${index}`}
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(index, parseInt(e.target.value))
              }
              className="w-16 p-2 border rounded"
              min="1"
            />
          </div>

          {/* Mobile - Quantity Control Buttons */}
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
              onChange={(e) =>
                handleQuantityChange(index, parseInt(e.target.value))
              }
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
        </div>
      </div>
      <p className="font-semibold aesthet-nova-h2">
        ${(item.priceInCents / 100).toFixed(2)}
      </p>
    </div>
  );

  // Cart Footer Component
  const CartFooter = ({ subtotal, handleCartClose }) => (
    <div className="p-4 border-t border-gray-200">
      <div className="flex flex-col justify-between mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-semibold aesthet-nova-h1">
            Subtotal:
          </span>
          <span className="text-2xl font-semibold aesthet-nova-h1">
            ${subtotal}
          </span>
        </div>
        <NavLink
          to="/shopping-cart"
          className="w-full py-2 bg-neutral-950 text-ingrain-color-orange text-xl rounded text-center hover:bg-ingrain-color-orange hover:text-neutral-950"
          onClick={handleCartClose}
        >
          Shopping Cart
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Modal overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-neutral-900 bg-opacity-20 z-40"></div>
      )}

      {/* Modal content */}
      <div
        ref={modalRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-1/5 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-40 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        {/* Modal Header */}
        <div className="pt-8 pb-8 p-3 flex justify-center items-center bg-ingrain-color-orange">
          <CloseButton onClick={handleCartClose} />
          <h2 className="text-xl font-semibold text-center aesthet-nova-h1">
            Cart
          </h2>
        </div>

        {/* Cart Items */}
        <div
          className="flex-1 p-4 overflow-y-auto"
          style={{ maxHeight: "75vh" }}
        >
          {cartItems.length === 0 ? (
            <EmptyCartMessage />
          ) : (
            <CartItemList
              cartItems={cartItems}
              handleQuantityChange={handleQuantityChange}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleRemoveItem={removeItem}
            />
          )}
        </div>

        {/* Cart Footer */}
        <CartFooter
          subtotal={calculateSubtotal()}
          handleCartClose={handleCartClose}
        />
      </div>
    </>
  );
};

export default CartModal;
