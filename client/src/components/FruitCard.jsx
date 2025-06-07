import React, { useEffect, useState } from 'react';

const FruitCard = ({ fruit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % fruit.images.length);
    }, 3000); // change every 3 sec

    return () => clearInterval(interval);
  }, [fruit.images.length]);

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-[250px] text-center">
      <img
        src={fruit.images[currentImageIndex]}
        alt={fruit.name}
        className="w-full h-40 object-cover rounded-md transition duration-500"
      />
      <h3 className="text-xl font-playfair mt-4">{fruit.name}</h3>
      <p className="text-gray-600 mt-1">{fruit.description}</p>
      <p className="text-green-600 font-medium mt-2">{fruit.price}</p>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Contact Now
      </button>
    </div>
  );
};

export default FruitCard;
