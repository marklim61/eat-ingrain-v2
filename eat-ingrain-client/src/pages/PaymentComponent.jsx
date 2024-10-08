import React, { useState, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import axios from "axios";
import CartContext from "../components/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PaymentComponent = () => {
  const { cartItems, calculateSubtotal, clearCart } = useContext(CartContext);
  const appId = import.meta.env.VITE_APP_SQUARE_APP_ID; // Use environment variable
  const locationId = import.meta.env.VITE_APP_SQUARE_LOCATION_ID;
  const navigate = useNavigate(); // Use the navigate hook for redirection

  const modalRef = useRef(null); // Create a ref for the modal

  const calculateShippingHandling = () => {
    // Example: flat rate shipping
    const flatRate = 5.0; // Flat shipping rate
    return flatRate;
  };

  const calculateTax = () => {
    // Example: 8% tax
    const taxRate = 0.08;
    const subtotal = calculateSubtotal();
    return (subtotal * taxRate).toFixed(2);
  };

  // Calculate summary values
  const subtotal = calculateSubtotal();
  const shipping = calculateShippingHandling();
  const tax = calculateTax();
  const balance = (parseFloat(subtotal) + parseFloat(shipping)).toFixed(2); // Assuming tax is calculated at checkout
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Determine the correct word for "item"
  const itemsLabel = itemCount === 1 ? "item" : "items";

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States", // Default value
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTokenization = async (token) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/submitPayment`,
        {
          sourceId: token.token,
          cardholderName: formData.cardholderName,
          billingAddress: formData.billingAddress,
          billingCity: formData.billingCity,
          billingState: formData.billingState,
          billingCountry: formData.billingCountry,
          billingPostalCode: formData.billingPostalCode,
          emailAddress: formData.emailAddress,
          shippingAddress: formData.shippingAddress,
          shippingCity: formData.shippingCity,
          shippingState: formData.shippingState,
          shippingCountry: formData.shippingCountry,
          shippingPostalCode: formData.shippingPostalCode,
          amount: balance,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (response.status === 200) {
        clearCart();
        setPaymentStatus({ success: true, result });
        modalRef.current.showModal(); // Show modal on success
      } else {
        setPaymentStatus({
          success: false,
          error: result.error || "Unknown error",
        });
      }
    } catch (error) {
      setPaymentStatus({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-start justify-center min-h-screen">
        {/* Main Card */}
        <div className="flex flex-col p-4 md:p-8 shadow-lg rounded-lg w-full md:w-[65%] max-w-full mt-48 md:mt-64 mb-36 bg-ingrain-board-color">
          <ul className="steps mb-6">
            <li className="step step-primary">Cart</li>
            <li className="step step-primary">Payment</li>
            <li className="step">Review</li>
            {/* <li className="step">Review</li> */}
          </ul>

          {/* Left Section: Shipping Info */}
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl md:text-4xl font-bold aesthet-nova">
                  Shipping Information
                </h2>
                <NavLink
                  to="/shopping-cart"
                  className="text-md md:text-lg aesthet-nova-h1 hover:underline hover:text-ingrain-color-orange"
                >
                  <FontAwesomeIcon icon={faArrowLeft} /> Back to Cart
                </NavLink>
              </div>
              {/* Contact Information */}
              <form className="flex-1 flex flex-col">
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                    required
                  />
                </div>

                {/* Name Fields */}
                <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
                  <div className="flex-1">
                    <label
                      htmlFor="firstName"
                      className="font-semibold aesthet-nova-h3 text-md"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                      required
                    />
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <label
                      htmlFor="lastName"
                      className="font-semibold aesthet-nova-h3 text-md"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                      required
                    />
                  </div>
                </div>

                {/* Address Fields */}
                <div className="mb-6">
                  <label
                    htmlFor="address"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="apartment"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    Apartment, Suite, etc. (Optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                  />
                </div>

                {/* City and Country Fields */}
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <label
                      htmlFor="city"
                      className="font-semibold aesthet-nova-h3 text-md"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="country"
                      className="font-semibold aesthet-nova-h3 text-md"
                    >
                      Country/Region
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>

                {/* State and Zip Code Fields */}
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <label
                      htmlFor="state"
                      className="font-semibold aesthet-nova-h3 text-md"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="zipCode"
                      className="font-semibold aesthet-nova-h3 text-md"
                    >
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number (Optional) */}
                <div className="mb-6">
                  <label
                    htmlFor="phoneNumber"
                    className="font-semibold aesthet-nova-h3 text-md"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="input w-full shadow-md bg-neutral-100 p-3 aesthet-nova-h2"
                  />
                </div>

                <h2 className="text-2xl font-bold aesthet-nova mb-6">
                  Payment Information
                </h2>
                <PaymentForm
                  applicationId={appId}
                  locationId={locationId}
                  cardTokenizeResponseReceived={handleTokenization}
                >
                  <CreditCard />
                </PaymentForm>
                {loading && (
                  <div className="mt-4 text-blue-600">
                    Processing payment...
                  </div>
                )}
                {paymentStatus && (
                  <div className="mt-4">
                    {paymentStatus.success ? (
                      // <div className="text-green-600">
                      //   Payment Successful! {JSON.stringify(paymentStatus.result)}
                      // </div>
                      <div className="text-ingrain-color-green">
                        Payment Successful!
                      </div>
                    ) : (
                      <div className="text-red-600">
                        Payment Failed: {paymentStatus.error}
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>

            {/* Right Section: Summary */}
            <div className="w-full md:w-1/3 flex flex-col bg-ingrain-color-orange shadow-lg rounded-lg">
              <div className="p-4 text-xl md:text-2xl font-semibold">
                Summary
              </div>
              <div className="flex-grow p-4 overflow-y-auto">
                <ul className="max-h-60">
                  {cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between mb-2 border-b last:border-b-0 pb-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 md:w-16 h-12 md:h-16 object-cover rounded-lg"
                      />
                      <div className="flex flex-col justify-between w-full ml-4">
                        <div>
                          <h3 className="text-sm md:text-lg font-semibold aesthet-nova-h1">
                            {item.name}
                          </h3>
                          <p className="text-gray-500 text-xs md:text-sm aesthet-nova-h3 ">
                            Size: {item.size}
                          </p>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              <p className="text-gray-500 aesthet-nova-h3 text-xs md:text-sm">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="font-semibold aesthet-nova-h2 ml-auto text-sm md:text-lg">
                        ${(item.priceInCents / 100).toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0 p-4">
                <div className="flex justify-between mb-4 text-sm md:text-lg">
                  <span className="text-lg font-semibold">
                    Subtotal ({itemCount} {itemsLabel})
                  </span>
                  <span className="text-lg font-semibold">${subtotal}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Shipping & Handling
                  </span>
                  <span className="text-lg font-semibold">${shipping}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-lg font-semibold">
                    Tax (Calculated at Checkout)
                  </span>
                  <span className="text-lg font-semibold">${tax}</span>
                </div>
                <div className="flex justify-between border-t pt-4 mb-4">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-lg font-semibold">${balance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Success Modal */}
      <dialog ref={modalRef} id="order_success_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Successful!</h3>
          <p className="py-4">
            Thank you for your purchase. Your order has been placed
            successfully!
          </p>
          <p className="py-4">
            A confirmation email has been sent to: {formData.email}. For any
            questions or concerns, please contact our customer support at
            support@ecommerce.com.
          </p>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            modalRef.current.close();
            navigate("/shop");
          }}
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default PaymentComponent;
