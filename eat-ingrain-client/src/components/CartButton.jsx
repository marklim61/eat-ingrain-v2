import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-5 right-5 bg-neutral-950 text-ingrain-color-orange p-5 rounded-full shadow-lg hover:bg-neutral-800 flex items-center justify-center w-16 h-16"
    >
      <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
    </button>
  );
};

export default CartButton;
