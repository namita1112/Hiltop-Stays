import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const upiID = "8779861687@ybl";
const name = "Namita";
const amount = "250";
const upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

const QRCodeComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewQR = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsVisible(true);
      setIsLoading(false);
    }, 1000); // 1.5 seconds delay
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between gap-4">
      {/* Left side: Text + icons */}
      <div>
        <h4 className="font-semibold text-lg">Scan to Pay</h4>
        <p className="text-sm text-gray-600 mb-3">Instant Refund & High Success Rate</p>

        <div className="flex items-center gap-3 mt-2">
          <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750589564/icons8-bhim-64_vzwmjv.png" alt="UPI" className="h-6" />
          <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750590862/icons8-google-pay-48_o1d3ik.png" alt="GPay" className="h-8" />
          <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750590862/icons8-paytm-48_bn9zkk.png" alt="Paytm" className="h-8" />
          <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750590862/icons8-phone-pe-48_fgp44h.png" alt="PhonePe" className="h-8" />
        </div>
      </div>

      {/* Right side: QR with overlay */}
      <div className="relative w-[160px] h-[160px] flex items-center justify-center bg-white rounded">
        {/* Show QR or loader */}
        {isVisible ? (
          <QRCode value={upiLink} size={150} />
        ) : isLoading ? (
          <img
            src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750597801/loader_ptroc4.png" // Replace with correct public path if needed
            alt="Loading..."
            className="w-10 h-10 animate-spin"
          />
        ) : (
          <>
            <div className="blur-[2px]">
              <QRCode value={upiLink} size={150} />
            </div>
            <button
              onClick={handleViewQR}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-blue-500 text-blue-600 text-xs px-3 py-1 rounded hover:bg-blue-100 cursor-pointer"
            >
              VIEW QR
            </button>
          </>
          
        )}
      </div>
    </div>
  );
};

export default QRCodeComponent;
