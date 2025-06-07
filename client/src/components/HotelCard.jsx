import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const HotelCard = ({hotel, index}) => {
  return (
    <Link
      to={'/hotels/' + hotel._id}
      onClick={() => scrollTo(0, 0)}
      key={hotel._id}
      className='relative w-full max-w-70 h-full rounded-xl overflow-hidden bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)] flex flex-col'
    >
      {/* Image container with fixed height */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={hotel.images[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Best seller badge */}
      {index % 2 === 0 && (
        <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>
          Best Seller
        </p>
      )}

      {/* Content section */}
      <div className='p-4 flex flex-col justify-between flex-grow'>
        <div>
          <div className='flex items-center justify-between mb-1'>
            <p className='font-playfair text-xl font-medium text-gray-800'>
              {hotel.hotelName}
            </p>
            <div className='flex items-center gap-1'>
              <FaRegStarHalfStroke /> {hotel.rating}
            </div>
          </div>
          <div className='flex items-center gap-1 text-sm mb-4'>
            <IoLocationOutline /> <span>{hotel.city}</span>
          </div>
        </div>
        <div className='flex items-center justify-between mt-auto'>
          <p>
            {/* <span className='text-xl text-gray-800'>₹ 2000/night</span> */}
          </p>
          <button onClick={() => {navigate('/hotels/' + hotel._id); scrollTo(0,0)}} className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-100 transition-all cursor-pointer'>
            View Details
          </button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
