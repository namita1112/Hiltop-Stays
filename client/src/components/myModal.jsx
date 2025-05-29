import React, { useState, useEffect } from 'react';

const MyModal = ({ images, selectedImage, onSelect, show, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(images.indexOf(selectedImage));
  const [touchStartX, setTouchStartX] = useState(0);

  // Keep currentIndex in sync with selectedImage
  useEffect(() => {
    setCurrentIndex(images.indexOf(selectedImage));
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

  // Swipe handling
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) goPrev();
    else if (diff < -50) goNext();
  };

  return (
    <div
      className={`modal fade ${show ? 'show d-block' : ''}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: show ? 'rgba(0,0,0,0.5)' : 'transparent' }}
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-body" style={{ height: '80vh', overflow: 'hidden' }}>
            <div className="d-flex h-100">
              
              {/* Image viewer */}
              <div
                className="flex-grow-1 d-flex align-items-center justify-content-center bg-white p-3 position-relative w-100"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Close Button - moved here */}
                <button
                  type="button"
                  className="btn-close position-absolute"
                  style={{ top: '10px', right: '10px', zIndex: 20 }}
                  onClick={onClose}
                ></button>

                {/* Tappable areas */}
                <div
                  className="position-absolute top-0 bottom-0 start-0 w-50"
                  onClick={goPrev}
                  style={{ cursor: 'pointer' }}
                ></div>
                <div
                  className="position-absolute top-0 bottom-0 end-0 w-50"
                  onClick={goNext}
                  style={{ cursor: 'pointer' }}
                ></div>

                <img
                  src={images[currentIndex]}
                  alt="Selected"
                  className="img-fluid"
                  style={{
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Sidebar thumbnails — shown only on md and up */}
              <div
                className="border-start bg-light p-2 d-none d-md-block position-relative"
                style={{ width: '200px', overflowY: 'auto' }}
              >
                <div className="d-flex flex-column gap-2 mt-4">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`thumb-${index}`}
                      onClick={() => onSelect(img)}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        border:
                          img === images[currentIndex]
                            ? '2px solid orange'
                            : '2px solid transparent',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>


          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
