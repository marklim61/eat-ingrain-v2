import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import {
  Home,
  About,
  Events,
  Contact,
  Shop,
  ProductDetail,
  ShoppingCart,
  PaymentComponent,
  SuccessPage,
  AdminDashboard,
  AdminEvents,
  AdminOrders,
  AdminInventory,
} from "./pages/index";
import { CartProvider } from "./components/CartContext";

const App = () => {

  const CartLayout = () => (
    <CartProvider>
      <Outlet />
    </CartProvider>
  );

  return (
    <div className="min-h-screen bg-white">
      <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />

            {/* Routes that need CartProvider */}
            <Route element={<CartLayout />}>
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/shopping-cart" element={<ShoppingCart />} />
              <Route path="/checkout" element={<PaymentComponent />} />
            </Route>

            <Route path="/success" element={<SuccessPage />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/inventory" element={<AdminInventory />} />
          </Routes>
      </Router>
    </div>
  );
};

export default App;
