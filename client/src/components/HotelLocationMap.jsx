import React from "react";
import { IoLocationOutline } from "react-icons/io5";
const HotelLocationMap = ({ hotelName, address, latitude, longitude }) => {
  const label = `${hotelName}, ${address}`;
  const query = `(${label})`;

  return (
    <div className="shadow-md overflow-hidden">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-800 px-4 pt-4">
            <IoLocationOutline /> {hotelName} Location
        </h2>


      <div className="relative w-full h-[350px] mt-2">
        <iframe
          title="Hotel Location"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`}
          className="w-full h-full border-0 rounded-b-xl"
          loading="lazy"
          allowFullScreen
        ></iframe>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 left-4 px-4 py-2 bg-white text-blue-600 font-medium text-sm rounded shadow hover:bg-blue-50 transition"
        >
          Click to View Map
        </a>
      </div>
    </div>
  );
};

export default HotelLocationMap;
