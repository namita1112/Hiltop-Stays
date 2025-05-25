import React, { useEffect, useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import StarRating from '../components/StarRating';
import { IoLocationOutline } from "react-icons/io5";
import { facilityIcons } from '../assets/assets';

// const CheckBox = (label, selected = false, onChange = () => {}) => {
//     return(
//         <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//             <input type="checkbox" checked={selected} onChange={(e) => onChange(e.target.checked, label)}/>
//             <span className='font-light select-none'>{label}</span>
//         </label>
//     )
// }
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



// const RadioButton = (label, selected = false, onChange = () => {}) => {
//     return(
//         <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
//             <input type="radio" name="sortOption" checked={selected} onChange={() => onChange(label)}/>
//             <span className='font-light select-none'>{label}</span>
//         </label>
//     )
// }

const AllHotels = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate();
    const [openFilters, setOpenFilters] = useState(false);
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
            const res = await axios.get("http://localhost:5000/api/hotels"); 
            setHotels(res.data);
        } catch (err) {
            console.error("Error fetching hotels:", err);
        }
        };

        fetchHotels();
    }, []);

    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-20 md:pt-25 px-4 md:px-16 lg:px-24 xl:px-32'>
            <div>
                <div className='flex flex-col items-start text-left'>
                    <h1 className='font-playfair text-4xl md:text-[40px]'>Hotels</h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>Take advantage of our limited-time offers and special packages to enhance your stay and create unforgettable
                        memories.
                    </p>
                </div>

                {hotels.map((hotel) =>(
                    <div key={hotel._id} className='flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 last:pb-30 last-border-0'>
                        <img onClick={() => {navigate(`/hotels/${hotel._id}`); scrollTo(0,0)}} src={hotel.images[0]} alt="hotel-img" title="View Hotel Details" className='max-h-65 md:w-1/2 rounded-xl
                        shadow-lg object-cover cursor-pointer'/>
                        <div className='md:w-1/2 flex flex-col gap-2'>
                            <p className='text-gray-500'>{hotel.city}</p>
                            <p onClick={() => {navigate(`/hotels/${hotel._id}`); scrollTo(0,0)}} 
                                className='text-gray-800 text-3xl font-playfair cursor-pointer'>{hotel.hotelName}
                            </p>
                            <div className='flex items-center'>
                                <StarRating/>
                                <p className='ml-2'>200+ reviews</p>
                            </div>
                            <div className='flex items-center gap-1 text-gray-500 mt-2 text-sm'>
                            <IoLocationOutline /> <span>{hotel.address}</span>
                            </div>
                            {/* Hotel Amenities */}
                            <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                                {hotel.amenities.map((item, index) => (
                                    <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F5F5FF]/70'>
                                        <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                                        <p className='text-xs'>{item}</p>
                                    </div>
                                ))}
                            </div>
                            {/* Hotel Price */} 
                            {/* <p className='text-xl font-medium text-gray-700'>₹ 2000/night</p> */}
                            <button className="w-fit px-3 py-1.5 text-sm font-medium border border-gray-300 
                                rounded hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap">
                                Get Callback
                            </button>


                        </div>
                    </div>
                ))}
            </div>
            {/* Filters */}
            <div className='bg-white w-80 border border-gray-300 text-gray-600 max-lg:mb-8 min-lg:mt-16'>
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
            </div>
        </div>
    )
}

export default AllHotels
