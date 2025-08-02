import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { IoLocationOutline } from "react-icons/io5";
import { facilityIcons } from '../assets/assets';
import GetUserInfo from '../components/GetUserInfo';
import SearchForm from '../components/SearchForm';
import { useSearch } from '../context/SearchContext';

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onChange(e.target.checked, label)}
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input
                type="radio"
                name="sortOption"
                checked={selected}
                onChange={() => onChange(label)}
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    );
};


const AllHotels = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();
    const [openFilters, setOpenFilters] = useState(false);
    const { searchData } = useSearch();
    const roomTypes = [
        "Single Bed",
        "Double Bed",
        "Luxury Room",
        "Family Suite",
    ];
    const priceRanges = [
        '0 to 500',
        '500 to 1000',
        '1000 to 2000',
        '2000 to 5000',
    ];
    const sortOption = [
        "Price Low to High",
        "Price High to Low",
        "Newest First",
    ]
    useEffect(() => {
            const fetchHotels = async () => {
            try {
                // const res = await axios.get("https://api.hiltopstay.com/api/hotels");
                // const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels`);
                const API_URL = import.meta.env.VITE_ENV_MODE === "local"
                    ? "http://localhost:5000/api/hotels"
                    : "https://api.hiltopstay.com/api/hotels";
                const res = await axios.get(API_URL); 
                setHotels(res.data);
            } catch (err) {
                console.error("Error fetching hotels:", err);
            }
            };

            fetchHotels();
        }, []
    );
    

    // useEffect(() => {
    //     const fetchHotels = async () => {
    //         try {
    //         const res = await axios.get("http://localhost:5000/api/hotels", {
    //             params: {
    //             destination: searchData.destination,
    //             startDate: searchData.date[0].startDate,
    //             endDate: searchData.date[0].endDate,
    //             guests: searchData.options.adult + searchData.options.children,
    //             },
    //         });
    //         setHotels(res.data);
    //         } catch (err) {
    //         console.error("Error fetching hotels:", err);
    //         }
    //     };

    //     fetchHotels();
    // }, [searchData]); // re-run when search data changes


    const [showModal, setShowModal] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState(null);

    const handleOpenModal = (hotelId) => {
        setSelectedHotelId(hotelId);
        setShowModal(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <>
            {/* Search Form just below navbar */}
            <div className='px-3 md:px-6 lg:px-10 xl:px-16 pt-10 bg-gray-100 shadow-sm'>
            {/* <div className='px-4 md:px-16 lg:px-24 xl:px-32 pt-10 bg-gray-100 shadow-sm '> */}
                <div className='p-6 border-gray-200'>
                    <SearchForm initialData={searchData} />
                </div>
            </div>

            {/* Hotel Listings & Filters */}
            <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-10 md:pt-15 px-3 md:px-6 lg:px-10 xl:px-16'>
                <div className="w-full"> 
                    {/* <div className='w-full mt-6'>
                        <SearchForm />
                    </div> */}
                    <div className='flex flex-col items-start text-left'>
                        <h1 className='font-playfair text-4xl md:text-[40px]'>Hotels</h1>
                        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable
                            memories.
                        </p>
                    </div>

                    {hotels.map((hotel) =>(
                        

                        <div key={hotel._id} className="w-full bg-white rounded-xl shadow-md px-4 py-5 mb-6 flex flex-col md:flex-row gap-6">
                            {/* Left: Hotel Image */}
                            <div className="md:w-1/4 w-full">
                                <img
                                onClick={() => { navigate(`/hotels/${hotel._id}`); scrollTo(0, 0); }}
                                src={hotel.images[0]}
                                alt="hotel-img"
                                className="w-full h-48 md:h-40 object-cover rounded-lg cursor-pointer"
                                />
                            </div>

                            {/* Middle: Hotel Info */}
                            <div className="md:w-2/4 w-full flex flex-col justify-between">
                                <div>
                                <p className="text-sm text-gray-500">{hotel.city} | {hotel.distance}</p>
                                <h2
                                    onClick={() => { navigate(`/hotels/${hotel._id}`); scrollTo(0, 0); }}
                                    className="text-xl md:text-2xl font-semibold font-playfair text-gray-800 cursor-pointer"
                                >
                                    {hotel.hotelName}
                                </h2>

                                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded mt-1 inline-block text-gray-600">
                                    Couple Friendly
                                </span>

                                {/* Description */}
                                {/* <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                    {hotel.description || 'Location near beach, beautiful wooden cottages, clean pool...'}
                                </p> */}

                                {/* Tags */}
                                    <div className="flex flex-wrap items-center mt-3 gap-2">
                                        {hotel.amenities.slice(0,4).map((item, index) => (
                                            <div key={index} className="flex text-s items-center gap-1 px-1 py-1 rounded-full">
                                            <img
                                                src={facilityIcons[item] || facilityIcons.Other_Amenities}
                                                alt={item}
                                                className="w-5 h-5"
                                            />
                                            <span className="text-s text-gray-600">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* <div className="flex flex-wrap items-center mt-3 gap-2">
                                        {hotel.amenities.map((item, index) => (
                                        <div key={index} className="flex items-center gap-1 px-1 py-1 rounded-full">
                                            <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />
                                            <span className="text-xs">{item}</span>
                                        </div>
                                        ))}
                                    </div> */}
                                    <div className='pt-2'>
                                        <button onClick={() => handleOpenModal(hotel)} className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md shadow hover:opacity-90 transition-opacity w-full md:w-auto duration-200 cursor-pointer transition-all whitespace-nowrap" title="Want more info? Share your name and number to get a quick call from the property owner!">
                                            Get Callback
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>

                            {/* Right: Ratings + Pricing */}
                            <div className="md:w-1/4 w-full text-right flex flex-col justify-between items-end">
                                <div>
                                <p className="text-blue-700 font-semibold text-sm">{hotel.rating && hotel.rating > 4.0 ? "Excellent" : "Very Good"} <span className="bg-blue-600 text-white px-1 rounded"> {hotel.rating?.toFixed(1) || "4.0"}</span></p>
                                {/* <p className="text-xs text-gray-500">(2244 Ratings)</p> */}
                                </div>

                                <div className="mt-4">
                                    <div className='relative inline-block text-black font-bold text-m'> 
                                        <span className="relative z-10">
                                            ₹ {hotel.hotelType === 'Hotel'
                                            ? hotel.rooms[0]?.BasePrice
                                            : hotel.entirePropertyBasePrice || 'N/A'}
                                        </span>
                                        <span className="absolute left-0 top-1/2 w-full h-[1.5px] bg-red-500 transform -rotate-[10deg] origin-center"></span>
                                    </div>
                                   
                                {/* <p className="text-sm line-through text-gray-400">
                                    ₹ {hotel.hotelType === 'Hotel'
                                            ? hotel.rooms[0]?.BasePrice
                                            : hotel.entirePropertyBasePrice || 'N/A'}
                                </p> */}
                                <p className="text-xl font-bold text-gray-900">
                                    ₹ {hotel.hotelType === 'Hotel' 
                                        ? hotel.rooms[0].pricePerNight
                                        : hotel.entirePropertyPrice || 'N/A'}
                                   
                                    {/* ₹ {hotel.hotelType === 'Hotel' ? hotel.rooms[0]?.pricePerNight : hotel.entirePropertyPrice || 'N/A'} */}
                                </p>
                                <p className="text-xs text-gray-500">+ ₹ 0 taxes & fees Per Night</p>
                                {/* <p className="text-xs text-blue-600 mt-1 cursor-pointer">Login to Book Now & Pay Later!</p> */}
                                </div>
                            </div>
                        </div>


                    ))}

                    {/* Modal */}
                    {showModal && (
                        <GetUserInfo
                        hotelId={selectedHotelId}
                        onClose={() => setShowModal(false)}
                        />
                    )}
                </div>
                {/* Filters */}
                {/* <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8'>
                    <div className={`flex items-center justify-between px-5 py-2.5 min-lg:border-b border-gray-300 ${openFilters && "border-b"}`}>
                        <p className='text-base font-medium text-gray-800'>FILTERS</p>
                        <div className='text-xs cursor-pointer'>
                            <span onClick={() => setOpenFilters(!openFilters)} className='lg:hidden'>{openFilters ? 'HIDE' : 'SHOW'}</span>
                            <span className='hidden lg:block'>CLEAR</span>
                        </div>
                    </div>
                    <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                        <div className='px-5 pt-5'>
                            <p className='font-medium text-gray-800 pb-2'>Popular Filters</p>
                            {roomTypes.map((room, index) => (
                                <CheckBox key={index} label={room}/>
                            ))}
                        </div>
                    </div>
                    <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                        <div className='px-5 pt-5'>
                            <p className='font-medium text-gray-800 pb-2'>Price Range</p>
                            {priceRanges.map((range, index) => (
                                <CheckBox key={index} label={`₹ ${range}`}/>
                            ))}
                        </div>
                    </div>
                    <div className={`${openFilters ? 'h-auto' : "h-0 lg:h-auto"} overflow-hidden transition-all duration-700`}>
                        <div className='px-5 pt-5 pb-5'>
                            <p className='font-medium text-gray-800 pb-2'>Sort By</p>
                            {sortOption.map((option, index) => (
                                <RadioButton key={index} label={option}/>
                            ))}
                        </div>
                    </div>
                </div> */}
            </div>
        </>
        
    )
}

export default AllHotels
