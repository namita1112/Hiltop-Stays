import React from 'react'
import { assets, cities } from '../assets/assets'
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { LuHotel } from "react-icons/lu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RiHotelLine } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";

const Hero = () => {
  return (
    <div className='felx flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white 
        bg-[url("/src/assets/hotel-view1.jpg")] bg-no-repeat bg-cover bg-center h-screen'>
        <p className='py-1 pt-50'>The Ultimate Hotel Experience</p>
        <h1 className='font-playfair text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>Discover Your Perfect Gateway Destination</h1>
        <p className='max-w-150 mt-2 text-sm md:text-base'>Discover and book the perfect stay with our hotel booking platform. Compare prices, explore amenities, and reserve rooms from top hotels worldwide – all in one place. Fast, secure, and hassle-free booking experience.</p>
    
        <form className='bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto mt-9'>
            
            <div>
                <div className='flex items-center gap-2'>
                    <RiHotelLine  className='h-4'/>
                    {/* <FontAwesomeIcon icon={faBed} className="h-4" /> */}
                    {/* <img src={assets.calenderIcon} alt="" className='h-4'></img> */}
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Where are you going?" required />
                <datalist id="destinations">
                    {cities.map((city,index) =>(
                        <option value={city} key={index} />
                    ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    {/* <FontAwesomeIcon icon={faCalendarDays} className="h-4" /> */}
                    <LuCalendarDays  className='h-4'/>
                    {/* <img src={assets.calenderIcon} alt="" className='h-4'></img> */}
                    {/* <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg> */}
                    <label htmlFor="checkIn">Check in</label>
                </div>
                <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    {/* <img src={assets.calenderIcon} alt="" className='h-4'></img> */}
                    <LuCalendarDays  className='h-4'/>
                    {/* <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg> */}
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                {/* <img src={assets.searchIcon} alt="searchIcon" className='h-7'></img> */}
                <span>Search</span>
            </button>
        </form>
    </div>
  )
}

export default Hero
