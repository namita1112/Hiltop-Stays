import React, { useState, useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";

const ImageModal = ({ images, selectedImage, onSelect, show, onClose }) => {
  if (!show) return null;

  const [currentIndex, setCurrentIndex] = useState(images.indexOf(selectedImage));
  const [touchStartX, setTouchStartX] = useState(0);

  useEffect(() => {
    const index = images.indexOf(selectedImage);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [selectedImage, images]);

  const goNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    onSelect(images[nextIndex]);
  };

  const goPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(prevIndex);
    onSelect(images[prevIndex]);
  };

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) goPrev();
    else if (diff < -50) goNext();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="flex w-[70vw] h-[80vh] bg-white rounded-xl overflow-hidden max-md:mx-2 relative">
        
        {/* Left: Full-size Image */}
        <div
          className="flex-1 flex items-center justify-center bg-white p-3 relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Icon */}
          <IoCloseOutline
            className="absolute top-3 right-3 text-black z-10 w-8 h-8 cursor-pointer"
            onClick={onClose}
          />

          {/* Click zones */}
          <div
            className="absolute top-0 bottom-0 left-0 w-1/2 cursor-pointer"
            onClick={goPrev}
          ></div>
          <div
            className="absolute top-0 bottom-0 right-0 w-1/2 cursor-pointer"
            onClick={goNext}
          ></div>

          <img
            src={images[currentIndex]}
            alt="Selected"
            className="max-h-full max-w-full object-contain rounded-lg z-0"
          />
        </div>

        {/* Right: Thumbnail list */}
        <div className="w-[200px] bg-gray-100 p-2 overflow-y-auto hidden md:block">
          <div className="flex flex-col gap-2 mt-4">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => onSelect(img)}
                className={`w-full h-20 object-cover rounded-md cursor-pointer ${
                  img === images[currentIndex] ? 'border-2 border-orange-500' : 'border-2 border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ImageModal;
