import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const CartButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-5 right-5 bg-neutral-950 text-ingrain-color-orange p-5 rounded-full shadow-lg hover:bg-neutral-800 flex items-center justify-center lg:w-32 md:w-8 sm:w-4 lg:h-32 md:h-8 sm:h-4"
    >
      <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
    </button>
  );
};

export default CartButton;
