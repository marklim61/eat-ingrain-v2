import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartButton = ({ onClick }) => {
  return (
    <button
      onClick={ () => {
        console.log("Cart button clicked from cart button component"); // Log when the button is clicked
        onClick();
      }}
      className="fixed top-5 right-5 bg-neutral-950 text-ingrain-color-orange p-5 rounded-full shadow-lg hover:bg-neutral-800 flex items-center justify-center w-16 h-16 z-30"
    >
      <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
    </button>
  );
};

export default CartButton;
