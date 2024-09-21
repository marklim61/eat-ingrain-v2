import React, { useState } from "react";
import emailjs from "emailjs-com/browser";
import grainy from "../assets/transparentGrainy2.png";
import { NavLink } from "react-router-dom";
import "./Style.css";
import "./speechbubble.css";
import Navbar from "../components/Navbar";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // State to track button click
  const [formError, setFormError] = useState(""); // State to track form errors

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isSubmitting) return;

    // Form validation to check to see if all fields are filled out correctly
    if (!formData.name || !formData.email || !formData.message) {
      setFormError("All fields are required");
      return;
    } else {
      setFormError("");
    }

    setIsSubmitting(true);
    setIsClicked(true);

    // Hide the image after 3 seconds
    setTimeout(() => {
      setIsClicked(false);
    }, 3000);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setIsSubmitting(false);
          setFormData({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          console.error("Failed to send email:", error);
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div>
      <Navbar />
      <div className="contact-container flex items-center justify-center bg-white h-screen">
        <form style={{ width: "20%" }}>
          <div className="forum-section font-bold text-4xl flex items-center justify-center mb-4 center aesthet-nova-h3 text-ingrain-color-orange">
            Contact Us
          </div>
          <div className="forum-section mb-4">
            <label
              className="block text-ingrain-color-green text-lg font-bold mb-2 aesthet-nova-h3"
              htmlFor="name"
            >
              Name
            </label>
            <label className="input input-bordered flex items-center gap-2 aesthet-nova-h3 bg-neutral-100">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="grow"
                placeholder="John Doe"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-ingrain-color-green text-lg font-bold mb-2 aesthet-nova-h3"
              htmlFor="email"
            >
              Email
            </label>
            <label className="input input-bordered flex items-center gap-2 aesthet-nova-h3 bg-neutral-100">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="grow"
                placeholder="john.doe@gmail.com"
                required
              />
            </label>
          </div>
          <div className="mb-6">
            <label
              className="block text-ingrain-color-green text-lg font-bold mb-2 aesthet-nova-h3"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="textarea textarea-bordered w-full bg-neutral-100"
              placeholder="Message"
              rows="5"
              required
            />
          </div>
          {formError && <div className="text-red-500 mb-4">{formError}</div>}
          <div className="flex items-center justify-center aesthet-nova-h3">
            <button
              type="button"
              onClick={handleSubmit}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-ingrain-color-orange hover:bg-ingrain-color-green text-white font-bold rounded focus:outline-none focus:shadow-outline"
            >
              Send Message
            </button>
            {isClicked && ( // Conditional rendering of image when button is clicked
              <div className="right-area absolute">
                <img src={grainy} alt="Character" width="400" />
                <div
                  className="background-container absolute"
                  style={{ top: "5%", right: "75%" }}
                >
                  <NavLink to="/confirmation">
                    <p className="speech-popup top-left-tail aesthet_nova">
                      Message Sent!
                    </p>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
