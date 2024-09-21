import React, { useState, useEffect, useContext } from "react";
import merch_bg from "../assets/shop_bg.jpg";
import { NavLink } from "react-router-dom";
import CartButton from "../components/CartButton";
import CartModal from "./CartModal";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartContext from "../components/CartContext";

const Shop = () => {
  const { isCartOpen, handleCartOpen, handleCartClose, cartItems } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);

  const updateQuantity = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
  };

  // useEffect(() => {
  //   // Fetch product data from the server using axios
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_BACKEND_URL}/store-items`
  //       );
  //       console.log(response.data);
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  useEffect(() => {
    // Fetch product data from the server using axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/store-items`
        );
        console.log("Fetched products:", response.data); // Check the data structure here
        setProducts(Array.isArray(response.data) ? response.data : []); // Ensure products is always an array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set products to an empty array in case of error
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <div className="h-screen flex items-center justify-center">
          <div className="relative flex flex-col justify-center items-center bg-neutral-950 h-full w-full p-16 mt-48 mb-48">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${merch_bg})`,
                opacity: 0.2,
              }}
            ></div>
            <h1 className="md:text-5xl font-bold mb-4 text-white aesthet-nova text-4xl text-center">
              NEW COLLECTION
            </h1>
            <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-white aesthet-nova-h2 text-center underline">
              Shop Now
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-24 mb-24">
          {products.map((product) => {
            console.log(`Image URL: ${product.image}`); // Log the image URL

            return (
              <NavLink
                to={`/product/${product.id}`}
                key={product.id}
                className="p-4 m-6 rounded-lg shadow-lg bg-ingrain-board-color"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-54 w-full object-contain mb-4 rounded transition-transform transform hover:scale-110"
                />
                <h2 className="text-xl font-bold mb-2 aesthet-nova-h1">
                  {product.name}
                </h2>
                <p className="text-lg font-semibold aesthet-nova-h2">
                  ${(product.priceInCents / 100).toFixed(2)}
                </p>
              </NavLink>
            );
          })}
        </div>
      </div>
      <CartButton
        onClick={() => {
          console.log("Cart button clicked from the shop component");
          handleCartOpen();
        }}
      />
      <CartModal
        isOpen={isCartOpen}
        onClose={handleCartClose}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
      <Footer />
    </div>
  );
};

export default Shop;
