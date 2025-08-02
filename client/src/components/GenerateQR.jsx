import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const upiID = "8779861687@ybl";
const name = "Namita";
const amount = "250";
const upiLink = `upi://pay?pa=${upiID}&pn=${name}&am=${amount}&cu=INR`;

const GenerateQR = () => {
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
                <QRCode value={upiLink} size={200} />
                </div>
               <button
                    onClick={handleViewQR}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold px-4 py-1 rounded-md shadow hover:opacity-100 transition-opacity duration-200 cursor-pointer whitespace-nowrap"
                >
                    Generate New QR
                </button>

            </>
            )}
        </div>
    )
}

export default GenerateQR




