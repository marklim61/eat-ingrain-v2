import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Home,
  MobileHome,
  About,
  Events,
  Contact,
  Shop,
  ProductDetail,
  CartModal,
  ShoppingCart,
  ShippingPage,
  PaymentComponent,
} from "./pages/index";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartButton from "./components/CartButton";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1366);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCartOpen = () => setIsCartOpen(true);
  const handleCartClose = () => setIsCartOpen(false);

  const addToCart = (product, quantity, size) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id && item.size === size
    );

    if (existingItemIndex >= 0) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += parseInt(quantity);
      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...product, quantity: parseInt(quantity), size };
      setCartItems([...cartItems, newItem]);
    }

    handleCartOpen();
  };

  const updateQuantity = (index, quantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = quantity;
    setCartItems(updatedCartItems);
  };

  const removeItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  const handleCheckout = () => {
    // Placeholder for checkout logic
    console.log("Checkout initiated");
    // Redirect to checkout page or handle checkout process here
  };

  const calculateSummary = () => {
    const subtotal = cartItems
      .reduce((acc, item) => acc + (item.priceInCents / 100) * item.quantity, 0)
      .toFixed(2);
    const shipping = "5.99";
    const tax = "0.00";
    const balance = (parseFloat(subtotal) + parseFloat(shipping)).toFixed(2);
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return { subtotal, shipping, tax, balance, itemCount };
  };

  const summary = calculateSummary();

  return (
    <div className="min-h-screen bg-white">
      <Router>
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={isMobile ? <MobileHome /> : <Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/shop" element={<Shop />} />
            <Route
              path="/product/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route
              path="/shopping-cart"
              element={
                <ShoppingCart
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeItem={removeItem}
                  onCheckout={handleCheckout}
                />
              }
            />
            <Route
              path="/shipping"
              element={<ShippingPage summary={summary} />}
            />
            <Route
              path="/payment"
              element={<PaymentComponent summary={summary} />}
            />
          </Routes>
          <ConditionalFooter />
        </div>
        <CartButtonSection handleCartOpen={handleCartOpen} />
        <CartModal
          isOpen={isCartOpen}
          onClose={handleCartClose}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </Router>
    </div>
  );
};

const ConditionalFooter = () => {
  const location = useLocation();

  // Don't render footer on the home page
  if (location.pathname === "/") {
    return null;
  }

  return <Footer />;
};

const CartButtonSection = ({ handleCartOpen }) => {
  const location = useLocation();
  const shouldShowCartButton =
    location.pathname === "/shop" || location.pathname.startsWith("/product");

  return shouldShowCartButton && <CartButton onClick={handleCartOpen} />;
};

export default App;
