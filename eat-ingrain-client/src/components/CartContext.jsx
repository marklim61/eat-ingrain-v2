// CartContext.jsx
import React, { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, quantity, size) => {
    console.log("Adding to cart:", { product, quantity, size }); // Debugging
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.size === size
    );
    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += parseInt(quantity); // Increment existing item quantity
      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...product, quantity: parseInt(quantity), size };
      setCartItems([...cartItems, newItem]);
    }

    handleCartOpen();
  };

  const updateQuantity = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity; // Update the quantity
    setCartItems(updatedCartItems);
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const handleCartOpen = () => {
    console.log("Cart is opening...");
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    console.log("Closing cart modal...");
    setIsCartOpen(false);
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((acc, item) => {
        if (typeof item.priceInCents === "undefined") {
          console.warn("Item priceInCents is undefined:", item); // Log items with missing price
          return acc;
        }

        const itemPrice = parseFloat(formatPrice(item.priceInCents));
        return acc + itemPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const formatPrice = (priceInCents) => {
    // Convert cents to dollars and format as string
    return (priceInCents / 100).toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        isCartOpen,
        handleCartOpen,
        handleCartClose,
        updateQuantity,
        removeItem,
        calculateSubtotal,
        formatPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
