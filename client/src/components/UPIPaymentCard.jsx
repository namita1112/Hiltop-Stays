import React from 'react';
import GenerateQR from './GenerateQR';

const UPIPaymentCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Title */}
      <h2 className="text-lg font-bold mb-4">UPI Options</h2>

      {/* Divider */}
      <hr className="border-gray-300 mb-4" />

      {/* Scan QR to Pay Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-md mb-3">Scan QR to Pay</h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-25 mb-4">
          {/* Step Images */}
            <div className="flex flex-row gap-4">
                {/* Step 1 */}
                <div className="flex flex-col items-center border-2 border-gray-300 rounded-lg pt-2">
                    <img
                    src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750599734/upi_collect_step2_ggjhtt.png"
                    alt="Open"
                    className="w-20 h-28 object-contain"
                    />
                    <span className="mt-2 text-sm font-medium">Open</span>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center border-2 border-gray-300 rounded-lg pt-2">
                    <img
                    src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750599734/upi_collect_step1_acigxb.png"
                    alt="Scan QR"
                    className="w-20 h-28 object-contain"
                    />
                    <span className="mt-2 text-sm font-medium">Scan QR</span>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center border-2 border-gray-300 rounded-lg pt-2">
                    <img
                    src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750599734/upi_collect_step3_aul1qa.png"
                    alt="Approve"
                    className="w-20 h-28 object-contain"
                    />
                    <span className="mt-2 text-sm font-medium">Approve</span>
                </div>
            </div>


          {/* QR Code */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <GenerateQR />
            </div>
          </div>
        </div>
      </div>

      {/* OR Separator */}
      <div className="flex items-center gap-4 mb-6">
        <hr className="flex-grow border-gray-300" />
        <span className="text-blue-600 font-semibold">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* UPI ID Form */}
      <div className="mb-6">
        <label className="block font-medium text-sm mb-1">Enter your UPI ID</label>
        <input
          type="text"
          placeholder="UPI ID"
          className="w-full border border-gray-300 rounded-md p-2 mb-3"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
          Send Payment Request
        </button>
      </div>

      {/* Bottom Divider */}
      <hr className="border-gray-300 mb-4" />

      {/* UPI Apps + Logo */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="text-gray-600">All UPI apps supported</span>
          <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750589564/icons8-bhim-64_vzwmjv.png" alt="BHIM" className="h-7" />
          <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750590862/icons8-google-pay-48_o1d3ik.png" alt="GPay" className="h-7" />
          <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750590862/icons8-paytm-48_bn9zkk.png" alt="Paytm" className="h-7" />
          <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750590862/icons8-phone-pe-48_fgp44h.png" alt="PhonePe" className="h-7" />
        </div>
        <img
          src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750674949/UPI_qfwb32.png"
          alt="Powered by UPI"
          className="h-7"
        />
      </div>
    </div>
  );
};

export default UPIPaymentCard;
