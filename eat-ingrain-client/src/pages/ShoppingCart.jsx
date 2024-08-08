import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ShoppingCart = ({ cartItems, updateQuantity, removeItem, onCheckout }) => {
  const formatPrice = (priceInCents) => (priceInCents / 100).toFixed(2);

  const calculateSubtotal = () => {
    return cartItems
      .reduce((acc, item) => acc + (item.priceInCents / 100) * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex items-center mb-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain mr-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Price: ${formatPrice(item.priceInCents)}</p>
                  <div className="flex items-center mt-2">
                    <label htmlFor={`quantity-${index}`} className="mr-2">Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${index}`}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(index, parseInt(e.target.value, 10))
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
          <div className="flex justify-between mt-4">
            <span className="text-lg font-semibold">Subtotal:</span>
            <span className="text-lg font-semibold">${calculateSubtotal()}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full py-2 bg-blue-500 text-white text-xl rounded mt-4"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
