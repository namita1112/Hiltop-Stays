import React, { useEffect, useState } from 'react'
import axios from "axios";
import HotelCard from "../components/HotelCard";
import Title from '../components/Title';
import { useNavigate , Link, useLocation} from 'react-router-dom';
import { FaRegHeart, FaRegStar } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { BsThreeDots, BsStars } from "react-icons/bs";
import { IoShareOutline } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import SearchForm from '../components/SearchForm';
// import {  } from "react-icons/bs";
const SearchedHotels = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate()
    const location = useLocation();
    const searchData = location.state;
    const [showShareOptions, setShowShareOptions] = useState(false);

    // useEffect(() => {
    //     console.log("Search data:", searchData);
    // }, [searchData]);

    useEffect(() => {
        if (!searchData) return;

        const fetchHotels = async () => {
            try {
                const API_URL =
                    import.meta.env.VITE_ENV_MODE === "local"
                        ? "http://localhost:5000/api/hotels/getAllHotels"
                        : "https://api.hiltopstay.com/api/hotels/getAllHotels";

                const res = await axios.get(API_URL, {
                    params: {
                        destination: searchData.destination,
                        startDate: searchData.date?.[0]?.startDate,
                        endDate: searchData.date?.[0]?.endDate,
                        adult: searchData.options?.adult,
                        room: searchData.options?.room,
                    }
                });
                // console.log("response: ", res);
                setHotels(res.data);
            } catch (err) {
                console.error("Error fetching hotels:", err);
            }
        };

        fetchHotels();
    }, [searchData]);

    console.log(searchData);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    
    return (
        
        <div className='items-center pt-20 md:px-3 lg:px-10 bg-slate-50 py-7'>
            <SearchForm initialData={searchData} />
            <h1 className='mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold font-playfair break-words w-full max-w-3xl'>
                Showing Properties in {searchData?.destination && searchData?.destination.trim() !== "" ? searchData.destination : "Mahabaleshwar"}
            </h1>


            <div className="flex flex-wrap items-stretch pt-20 px-2 md:px-2 bg-slate-50 py-7 gap-y-6 gap-x-4 justify-start">
            {/* <div className="flex flex-wrap items-center pt-20 px-4 md:px-10 bg-slate-50 py-7 gap-y-6 gap-x-4 justify-start"> */}
                {hotels.map((hotel) => (
                    <Link
                    key={hotel._id}
                    onClick={() => {navigate('/hotels'); scrollTo(0,0)}}
                    to={`/hotels/${hotel._id}`}
                    className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white rounded-2xl overflow-hidden shadow-md relative flex flex-col h-full'
                    // className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-md relative"
                    >
                    {/* Image + Heart + Menu */}
                    <div className="relative">
                        <img
                        src={hotel.images[0]}
                        alt={hotel.hotelName}
                        className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-2 right-2 flex items-center gap-2">
                        <BsThreeDots
                            className="text-gray-600 h-10 w-8 z-10"
                            onClick={(e) => {
                                e.preventDefault();      // Prevent <Link> navigation
                                e.stopPropagation();     // Prevent event bubbling
                                setShowShareOptions(true);
                            }}
                        />
                        </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-4 space-y-2 flex flex-col flex-grow">
                        {/* Rating */}
                        <div className="flex items-center gap-2 text-sm">
                            <span className="bg-blue-600 text-white font-semibold px-2 py-0.5 rounded">
                                {hotel.rating?.toFixed(1) || "4.0"}
                            </span>
                            <span className="text-gray-700 font-medium">
                                {hotel.rating && hotel.rating > 4.0 ? "Excellent" : "Very Good"}
                            </span>
                        </div>


                        {/* Name */}
                        <h2 className="text-lg font-bold text-gray-800">{hotel.hotelName}</h2>

                        {/* Location */}
                        <p className="text-sm text-gray-600 flex items-center gap-1 mb-0">
                        <IoLocationOutline />
                        {hotel.location || 'Mahabaleshwar'} | {hotel.distance}
                        </p>

                        {/* Price block */}
                    <div className="flex justify-between items-start gap-4">
                            {/* LEFT: Optional content (you can leave it empty or add a LOG IN button here) */}
                            <div></div>

                            {/* RIGHT: Price content aligned to the right */}
                            <div className="text-right ml-auto">
                                {/* <span className="text-xs text-yellow-600 font-medium border border-yellow-400 px-2 py-0.5 rounded">
                                Limited Time Sale
                                </span> */}
                                <div className="">
                                    {/* <p className="text-s line-through text-gray-500">₹ 8,000</p> */}
                                    <div className="relative inline-block text-black font-bold text-m">
                                        <span className="relative z-10">
                                            ₹ {hotel.hotelType === 'Hotel'
                                                ? hotel.rooms[0]?.BasePrice
                                                : hotel.entirePropertyBasePrice || 'N/A'}
                                        </span>
                                        <span className="absolute left-0 top-1/2 w-full h-[1.5px] bg-red-500 transform -rotate-[10deg] origin-center"></span>
                                    </div>
                                    <p className="text-lg font-bold text-gray-800">
                                        ₹ {hotel.hotelType === 'Hotel' 
                                            ? hotel.rooms[0].pricePerNight
                                            : hotel.entirePropertyPrice || 'N/A'}
                                    </p>
                                    {/* <p className="text-lg font-bold text-gray-800">₹ {hotel.price || '5,604'}</p> */}
                                    <p className="text-xs text-gray-500">+ ₹ 0 taxes & fees Per Night</p>
                                </div>
                            </div>
                        </div>


                        {/* Highlights */}
                    <div className="mt-3 text-sm bg-[#f7f7f7] text-[#6F708B] px-3 py-2 rounded-md flex items-center gap-2">
                            <BsStars className="h-5 w-5 text-blue-500" />
                            <span>
                            {hotel.title} , Breathtaking valley views, private sunrise trekking tours, infinity pool experience
                            </span>
                        </div>

                    </div>
                    </Link>
                ))}


                {showShareOptions && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
                        <div className="bg-white w-full max-w-sm rounded-2xl p-4 relative shadow-lg mb-12">
                            {/* Share Option */}
                            <div className="flex justify-center items-center gap-3 py-3 cursor-pointer">
                            <IoShareOutline className="text-lg text-gray-700" />
                            <span className="text-gray-800 font-semibold">Share</span>
                            </div>
                            {/* Close Button */}
                            <button
                            onClick={() => setShowShareOptions(false)}
                            className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 bg-white rounded-full p-2 shadow-md"
                            >
                            <IoCloseOutline className="text-2xl text-black cursor-pointer" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchedHotels

