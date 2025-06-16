import React, { useState } from "react";
import imgi from "../assets/images/ContactUs.png";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you shortly.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full p-6 md:p-10 flex flex-col md:flex-row items-center gap-8">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src={imgi} 
            alt="Contact Us Illustration"
            className="w-full h-auto rounded-2xl shadow"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 text-gray-800">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h1>
          <p className="mb-6 text-gray-600">
            Have questions, feedback, or need support? We'd love to hear from you.
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
