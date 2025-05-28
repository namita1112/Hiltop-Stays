import React from 'react';

const ImageGalleryModal = ({ images, selectedImage, onClose, onSelect }) => {
  return (
    <div className="fixed inset-0 z-50 bg-opacity-0.5 flex justify-center items-center">
      {/* Background overlay */}
      <div className="absolute cursor-pointer inset-0" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative bg-white rounded-lg w-full max-w-5xl h-[90vh] flex flex-col lg:flex-row overflow-hidden z-10 shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 text-3xl font-bold z-20 hover:text-black"
        >
          &times;
        </button>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center bg-white p-4">
          <img
            src={selectedImage}
            alt="Selected"
            className="object-contain max-h-full max-w-full rounded"
          />
        </div>

        {/* Thumbnails */}
        <div className="lg:w-[200px] overflow-y-auto p-3 bg-gray-50 border-l border-gray-200">
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => onSelect(img)}
                className={`w-full h-20 object-cover rounded cursor-pointer transition ring-offset-2 ${
                  img === selectedImage ? 'ring-2 ring-orange-500' : ''
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
