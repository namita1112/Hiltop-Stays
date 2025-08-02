import React, { useState } from 'react';
import { useMemo } from "react";

const PaymentOptions = ({ totalPrice, selectedPaymentType, setSelectedPaymentType }) => {
  const totalRemainingPrice = useMemo(() => {
    return totalPrice - Math.ceil((totalPrice * 20) / 100);
  }, [totalPrice]);

  const [selectedOption, setSelectedOption] = useState('full');
  const handleChange = (event) => {
    setSelectedPaymentType(event.target.value);
  };
  return (
    <div className="text-sm mb-4 rounded-md shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-4 bg-white">
      <h1 className="font-semibold text-xl mb-4">Payment Options</h1>

      {/* Option 1 */}
      <div
        className={`flex justify-between items-start border-b border-gray-300 py-4 cursor-pointer ${
          selectedOption === 'full' ? 'text-black' : 'text-gray-500'
        }`}
        onClick={() => {
          setSelectedOption('full');
          setSelectedPaymentType('full');
        }}
      >
        <div className="flex gap-3 items-start">
          <input
            type="radio"
            name="payment"
            checked={selectedPaymentType === "full"}
            onChange={handleChange}
            className="mt-1 accent-blue-600"
          />
          <div>
            <p className="font-semibold">
              Pay Full Amount Now
            </p>
            <p className="text-xs mt-1">Cancel for free any time before 20 Aug</p>
          </div>
        </div>
        <p className="font-semibold">₹ {totalPrice.toLocaleString("en-IN")}</p>
      </div>

      {/* Option 2 */}
      <div
        className={`flex justify-between items-start pt-4 cursor-pointer ${
          selectedOption === 'half' ? 'text-black' : 'text-gray-500'
        }`}
        onClick={() => {
          setSelectedOption('half');
          setSelectedPaymentType('half');
        }}
      >
        <div className="flex gap-3 items-start">
          <input
            type="radio"
            name="payment"
            checked={selectedPaymentType === "half"}
            onChange={handleChange}
            className="mt-1 accent-blue-600"
          />
          <div>
            <p className="font-semibold">Pay 20% now and the rest at the hotel</p>
            <p className="text-xs mt-1">
              Pay the remaining amount of ₹{totalRemainingPrice.toLocaleString("en-IN")} using any payment options at the hotel.
            </p>
          </div>
        </div>
        <p className="font-semibold">₹{Math.ceil((totalPrice * 20) / 100).toLocaleString("en-IN")}</p>
      </div>
    </div>
  );
};

export default PaymentOptions;
