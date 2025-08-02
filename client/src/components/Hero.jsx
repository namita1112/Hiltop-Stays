import React from 'react'
import { assets, cities } from '../assets/assets'
import { RiHotelLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import SearchForm from './SearchForm';

const Hero = () => {
  return (
    <div className='felx flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white 
        bg-[url("/src/assets/hotel-view1.jpg")] bg-no-repeat bg-cover bg-center min-h-screen'>
        <p className='py-1 pt-50'>The Ultimate Hotel Experience</p>
        <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>Discover Your Perfect Gateway Destination</h1>
        <p className='max-w-150 mt-2 text-sm md:text-base'>Discover and book the perfect stay with our hotel booking platform. Compare prices, explore amenities, and reserve rooms from top hotels worldwide – all in one place. Fast, secure, and hassle-free booking experience.</p>

        <SearchForm />
        
    </div>
  )
}

export default Hero
