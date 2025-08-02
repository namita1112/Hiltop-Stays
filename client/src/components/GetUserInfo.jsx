import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
const GetUserInfo = ({ hotelId, onClose }) => {
  const [form, setForm] = useState({ name: '', mobile: '' });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

//   Hello, you have a new callback request for your hotel.

// Name: Sanket  
// Contact Number: +91-2344566642  

// Sanket is interested in your hotel: The Paradise Inn.  
// Please reach out to them as soon as possible to assist with their booking.


    const handleSubmit = async (e) => {
        e.preventDefault();

        const message = `Hello, you have a new callback request for hotel - ${hotelId.hotelName}.

        Name: ${form.name}
        Contact Number: ${form.mobile}

        ${form.name} is interested in ${hotelId.hotelName} hotel. Please reach out to them as soon as possible to assist with their booking.
        
        Please Find the Hotel Owner Details for pricing:
        Hotel Name:  ${hotelId.hotelName} 
        Hotel Owner Name: ${hotelId.owner} 
        Hotel Owner Contact: ${hotelId.ownerContact}
        `;

        const ownerPhoneNumber = "918097809705"; // hotel owner's WhatsApp number (with country code, no +)
        const hotelName = hotelId.hotelName;
        try {
          const API_URL = import.meta.env.VITE_ENV_MODE === "local"
                    ? "http://localhost:5000/api/send-message"
                    : "https://api.hiltopstay.com/api/send-message";
            const response = await fetch(API_URL, {
            // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/send-message`, {  // Adjust URL as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    hotelName: hotelName,
                    message: message,
                }),
            });

            const data = await response.json();

            if (response.ok) {
            alert("Message sent successfully!");
            onClose();
            } else {
            alert(`Failed to send message: ${data.error}`);
            }
        } catch (error) {
            alert("Error sending message: " + error.message);
        }
    };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="flex w-[90vw] max-w-md bg-white rounded-xl overflow-hidden p-6 shadow-lg relative">
        <button className="absolute top-2 right-3 text-xl cursor-pointer" onClick={onClose}> <IoCloseOutline/></button>
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4">Request a Callback</h2>
          <p className='text-sm pb-2'>Want more info? Share your name and number to get a quick call from the property owner!</p>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm text-gray-700 mb-1">Your Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm text-gray-700 mb-1">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={form.mobile}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter mobile number"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GetUserInfo;
