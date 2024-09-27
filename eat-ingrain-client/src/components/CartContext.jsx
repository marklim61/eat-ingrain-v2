import React, { createContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart items from localStorage if they exist, otherwise start with an empty array
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    let initialCart = [];
    try {
      initialCart = savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cartItems from localStorage:", error);
    }
    return initialCart;
  });


  const [isCartOpen, setIsCartOpen] = useState(false);

  // Effect to sync cart items with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback(
    (product, quantity, size) => {
      console.log("Adding to cart:", { product, quantity, size }); // Debugging
      if (quantity <= 0) {
        console.warn("Quantity must be greater than zero.");
        return;
      }

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
    },
    [cartItems]
  );

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeItem(index);
    } else {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity = quantity; // Update the quantity
      setCartItems(updatedCartItems);
    }
  };

  const removeItem = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]); // Clear cart items
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
        clearCart,
        calculateSubtotal,
        formatPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
