import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact_v2 = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ingrain",
          from_email: form.email,
          to_email: "mjlim0298@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_ID
      )
      .then(() => {
        setIsLoading(false);
        // TODO: Show success message
        // TODO: Hide an alert
        setForm({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        //TODO: Show error message
      });
  };
  const handleFocus = () => {};
  const handleBlur = () => {};

  return (
    <section className="flex lg:flex-row flex-col max-container items-center justify-center h-screen">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-xl p-6 bg-ingrain-board-color rounded-lg shadow-lg mt-32 pt-10 pb-10">
          <h1 className="text-4xl mb-8 text-center text-bold aesthet-nova">
            Get in Touch
          </h1>
          <form
            className="w-full flex flex-col gap-7 mt-14"
            onSubmit={handleSubmit}
          >
            <label className="font-semibold aesthet-nova-h1 text-md">
              Name
              <input
                type="text"
                name="name"
                className="input w-full shadow-md bg-neutral-100 mt-2 aesthet-nova-h2"
                placeholder="John"
                required
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="font-semibold aesthet-nova-h1 text-md">
              Email
              <input
                type="email"
                name="email"
                className="input w-full shadow-md bg-neutral-100 mt-2 aesthet-nova-h2"
                placeholder="john.doe@gmail.com"
                required
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <label className="font-semibold aesthet-nova-h1 text-md">
              Your Message
              <textarea
                name="message"
                rows={4}
                className="textarea w-full shadow-md bg-neutral-100 mt-2 aesthet-nova-h2"
                placeholder="Let us know how we can help you!"
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>
            <button
              type="submit"
              className="btn"
              disabled={isLoading}
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact_v2;
