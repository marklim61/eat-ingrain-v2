import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  MobileHome,
  About,
  Events,
  Contact,
  Shop,
  ProductDetail,
  ShoppingCart,
  PaymentComponent,
  SuccessPage,
  AdminDashboard,
} from "./pages/index";
import { CartProvider } from "./components/CartContext";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Router>
          <div className="flex flex-col min-h-screen">
            <Routes>
              <Route path="/" element={isMobile ? <MobileHome /> : <Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/checkout" element={<PaymentComponent />} />
              <Route path="/success" element={<SuccessPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </CartProvider>
  );
};

export default App;
