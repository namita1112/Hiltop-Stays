import React, { useEffect, useState } from 'react';
import Title from './Title'
import { FaArrowRightLong } from "react-icons/fa6";
import { exclusiveOffers } from '../assets/assets';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ExclusiveOffers = () => {
  const [hotels, setHotels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        // const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels`);
          const res = await axios.get("https://api.hiltopstay.com/api/hotels");
          // const res = await axios.get("http://localhost:5000/api/hotels"); 
        setHotels(res.data);
      } catch (err) {
          console.error("Error fetching hotels:", err);
      }
      };

      fetchHotels();
    }, []
  );
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30'>
      <div className='flex flex-col md:flex-row items-center justify-between w-full'>
        <Title align='left' title='Looking for the perfect stay?' subTitle='Discover comfort, convenience, and great deals — all in one place.'/>
        <button  onClick={() => {navigate('/hotels'); scrollTo(0,0)}} className='group flex items-center gap-2 font-medium cursor-pointer max-md:mt-12'>
            View All Hotels
            <FaArrowRightLong className='group-hover:translate-x-2 transition-all'/>
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12'>
        {hotels.slice(-3).reverse().map((hotel,index) => (
            <div key={hotel._id} className='group relative flex flex-col item-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl text-white bg-no-reapeat
            bg-cover bg-center' style={{backgroundImage: `url(${hotel.images[0]})`}}>
                <p className='px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full'> 20% OFF</p>
                <div>
                    <p className='text-2xl font-medium font-playfair'>{hotel.hotelName}</p>
                    <p>{hotel.title}</p>
                    {/* <p className='text-xs text-white/70 mt-3'>Expires {hotel.expiryDate}</p> */}
                </div>
                <button  onClick={() => {navigate('/hotels/' + hotel._id); scrollTo(0,0)}} className='flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5'>
                    View Details <FaArrowRightLong style={{ color: '#FFFFFF' }} className='group-hover:translate-x-2 transition-all' />
                </button>
            </div>
        ))}
      </div>
    </div>
  )
}

export default ExclusiveOffers

