import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
const HotelCard = ({hotel, index}) => {
  return (
    <Link to={'/hotel-details/' + hotel._id} onClick={() => scrollTo(0,0)} key={hotel._id}>
      <img src={hotel.images[0]} alt="" className='relative max-w-70 w-full rounded-xl overflow-hidden bg-white 
      text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'/>

      {index % 2 === 0 && <p className='px-3 py-1 absolute top-3 left-3 text-xs bg-white text-gray-800 font-medium rounded-full'>Best Seller</p>}
      
      <div className='p-4 pt-5'>
        <div className='flex items-center justify-between'>
          <p className='font-playfair text-xl font-medium text-gray-800'>{hotel.hotelName}</p>
          <div className='flex items-center gap-1'>
            <FaRegStarHalfStroke /> {hotel.rating}
          </div>
        </div>
        <div>
          <IoLocationOutline /> <span>{hotel.city}</span>
        </div>
        <div>
          <p><span>${hotel.price}/night</span></p>
          <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>Book Now.</button>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard
