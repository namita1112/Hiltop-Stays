import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import StarRating from '../components/StarRating';

const HotelDetails = () => {
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);
    const [mainImage, setMainImage] = useState(null);
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

  return hotel && (
    <div className='py-28 md:py-30 px-4 md:px-15 lg:px-22 xl:px-30'>
        {/* Room Details */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>{hotel.hotelName}
                <span className='font-inner text-sm'> ({hotel.roomsType.join(', ')})</span>
            </h1> 
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>
        {/* Hotel Rating */}
        <div className='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className='ml-2'>200+ reviews</p>
        </div>
        {/* Hotel Address */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <IoLocationOutline />
            <span>{hotel.address}, {hotel.city}</span>
        </div>
        {/* Room Images */}
        <div className='flex flex-col lg:flex-row mt-6 gap-5'>
            <div className='lg:w-1/2 w-full'>
                <img src={mainImage} alt="hotel-image" className='w-full rounded-xl shadow-lg object-cover'/>
            </div>
            <div>
                {hotel?.images.length > 1 && hotel.images.map((image, index) => (
                    <img onClick={() => setMainImage(image)} key={index} src={image} alt='hotel-image' className={`w-full
                        rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default HotelDetails
