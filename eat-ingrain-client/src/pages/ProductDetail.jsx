import React, { useState, useEffect, useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import CartContext from "../components/CartContext";
import CartModal from "./CartModal";
import CartButton from "../components/CartButton";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  const { addToCart, isCartOpen, handleCartOpen, handleCartClose } =
    useContext(CartContext);

  useEffect(() => {
    // Fetch the product details based on the ID
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/store-items/${id}`
        );
        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: [
              {
                id: product.id,
                quantity: quantity,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <CartButton 
        onClick={() => {
          console.log("handleCartOpen triggered from product detail"); // Log when handleCartOpen is called
          handleCartOpen();
        }}
        className="absolute top-4 right-4" 
      />
      <div className="bg-ingrain-board-color p-8 rounded-lg drop-shadow-xl max-w-4xl w-full m-8 mt-[200px]">
        <div className="flex items-center mb-4">
          <NavLink
            to="/shop"
            className="text-blue-500 hover:underline aesthet-nova-h3 text-xl"
          >
            Shop
          </NavLink>
          <span className="mx-2 aesthet-nova-h3 text-xl">/</span>
          <span className="text-gray-600 aesthet-nova-h3 text-xl opacity-50">
            {product.name}
          </span>
        </div>
        <div className="flex flex-col md:flex-row">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 object-contain mb-4 rounded md:mb-0 md:mr-8 bg-ingrain-board-color border-ingrain-color-orange border-2"
          />
          <div className="flex flex-col w-full">
            <h1 className="text-3xl font-bold mb-2 aesthet-nova">
              {product.name}
            </h1>
            <p className="text-xl font-semibold mb-2 aesthet-nova-h1">
              ${(product.priceInCents / 100).toFixed(2)}
            </p>
            <div className="flex items-center mb-4">
              <label htmlFor="size" className="mr-2 aesthet-nova-h2">
                Size:
              </label>
              <select
                id="size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="" disabled>
                  Select
                </option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2 aesthet-nova-h2">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-16 p-2 border rounded"
                min="1"
              />
            </div>
            <div className="flex flex-col mb-8">
              <button
                onClick={handleAddToCart}
                className={`addToCartTooltip w-full py-2 rounded mb-1 text-lg ${
                  selectedSize
                    ? "bg-neutral-950 text-ingrain-color-orange"
                    : "bg-neutral-950 text-ingrain-color-orange cursor-not-allowed"
                }`}
                disabled={!selectedSize}
              >
                Add to Cart
              </button>
              {!selectedSize && (
                <Tooltip anchorSelect=".addToCartTooltip" place="right">
                  Select a size to add to Shopping Cart!
                </Tooltip>
              )}
              <button
                onClick={handleBuyNow}
                className={`buyNowTooltip w-full py-2 rounded mt-1 text-lg ${
                  selectedSize
                    ? "bg-ingrain-color-orange"
                    : "bg-ingrain-color-orange cursor-not-allowed"
                }`}
                disabled={!selectedSize}
              >
                Buy Now
              </button>
              {!selectedSize && (
                <Tooltip anchorSelect=".buyNowTooltip" place="right">
                  Select a size to buy!
                </Tooltip>
              )}
            </div>
            <div className="collapse collapse-plus">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-semibold aesthet-nova-h1">
                PRODUCT INFO
              </div>
              <div className="collapse-content text-lg aesthet-nova-h2">
                <p>{product.description}</p>
              </div>
            </div>
            <div className="collapse collapse-plus">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-semibold aesthet-nova-h1">
                Return and Refund Policy
              </div>
              <div className="collapse-content aesthet-nova-h2">
                <p>Details about the return and refund policy...</p>
              </div>
            </div>
            <div className="collapse collapse-plus">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-semibold aesthet-nova-h1">
                Shipping Information
              </div>
              <div className="collapse-content aesthet-nova-h2">
                <p>Details about shipping information...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={handleCartClose} />
      <Footer />
    </div>
  );
};

export default ProductDetail;
