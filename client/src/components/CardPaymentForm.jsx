import React from 'react';
import { FaRegCreditCard, FaInfoCircle } from 'react-icons/fa';

const CardPaymentForm = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <h3 className="text-base font-semibold border-b border-gray-300 pb-2 mb-4">Credit & Debit Cards</h3>

      {/* Card Details Row */}
      <div className="flex items-start gap-3 mb-4">
        <div className="text-blue-500 text-3xl">
         <img className='h-10 w-10' src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750589564/atm-card_sczr19.png"/>
        </div>
        <div>
          <p className="font-semibold text-sm">Enter card details</p>
          <p className="text-xs text-gray-500">
            We support all major domestic & international cards
          </p>
        </div>
      </div>

      {/* Card Number */}
      <input
        type="text"
        placeholder="ENTER CARD NUMBER"
        className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
      />

      {/* Expiry + CVV */}
      <div className="flex gap-2 mb-4">
        <select className="w-1/3 px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option>MM</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i}>{String(i + 1).padStart(2, '0')}</option>
          ))}
        </select>
        <select className="w-1/3 px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option>YY</option>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i}>{new Date().getFullYear() + i}</option>
          ))}
        </select>
        <div className="w-1/3 flex items-center relative">
          <input
            type="text"
            placeholder="ENTER CVV"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400"
          />
          <FaInfoCircle className="absolute right-2 text-gray-400 text-sm" />
        </div>
      </div>

      {/* Disabled Pay Button */}
      <button
        className="w-full py-2 rounded-md bg-gray-200 text-gray-500 font-semibold cursor-not-allowed"
        disabled
      >
        Pay Now
      </button>
    </div>
  );
};

export default CardPaymentForm;
