import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import StarRating from '../components/StarRating';
import ImageGalleryModal from '../components/ImageGalleryModal'; 

const HotelDetails = () => {
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        const fetchHotelById = async () => {
            try {
                const hotel = await axios.get(`http://localhost:5000/api/hotels/${id}`);
                hotel && setHotel(hotel.data);
                hotel && setMainImage(hotel.data.images[0]);
            } catch (err) {
                console.error("Error fetching hotel details:", err);
            }
        };
        fetchHotelById();
    }, [id]);

    if (!hotel) return <div>Loading...</div>;

    return (
    <div className='py-28 md:py-30 px-4 md:px-15 lg:px-22 xl:px-30'>
        {/* Hotel Details */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>{hotel.hotelName}
                <span className='font-inner text-sm'> ({hotel.roomsType.join(', ')})</span>
            </h1> 
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>

        {/* Rating */}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className='ml-2'>200+ reviews</p>
        </div>

        {/* Address */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <IoLocationOutline />
            <span>{hotel.address}, {hotel.city}</span>
        </div>

        {/* Images Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
                <img
                    src={mainImage}
                    alt="Main hotel view"
                    className="w-full h-[400px] object-cover rounded-xl shadow-md"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                {hotel.images.slice(1, 5).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={() => setMainImage(img)}
                        className={`w-full h-[95px] md:h-[120px] object-cover rounded-xl cursor-pointer ${mainImage === img ? 'outline outline-2 outline-orange-500' : ''}`}
                        alt="Hotel thumbnail"
                    />
                ))}

                {hotel.images.length > 5 && (
                    <div
                        className="w-full h-[95px] md:h-[120px] flex items-center justify-center bg-gray-200 rounded-xl text-gray-700 font-semibold text-sm cursor-pointer"
                        onClick={() => setShowModal(true)}
                    >
                        +{hotel.images.length - 5} photos
                    </div>
                )}
            </div>
        </div>

        {/* Modal */}
        {showModal && (
            <ImageGalleryModal
                images={hotel.images}
                selectedImage={mainImage}
                onSelect={(img) => setMainImage(img)}
                onClose={() => setShowModal(false)}
            />
        )}
    </div>
  )
}

export default HotelDetails
