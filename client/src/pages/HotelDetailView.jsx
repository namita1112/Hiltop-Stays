import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { IoLocationOutline } from "react-icons/io5";
import StarRating from '../components/StarRating';
// import MyModal from '../components/myModal';
import HotelLocationMap from '../components/HotelLocationMap';
import { facilityIcons } from '../assets/assets';
import ImageModal from '../components/ImageModal';
import GetUserInfo from '../components/GetUserInfo';
import SearchForm from '../components/SearchForm';
import ShowAmenities from '../components/ShowAmenities';
import { useSearch } from '../context/SearchContext';
import { IoClose } from "react-icons/io5";
import { FaAngleRight } from "react-icons/fa6";
const HotelDetailView = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [expanded, setExpanded] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState(null);
    const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
    const { searchData } = useSearch();
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const minSwipeDistance = 50;
    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        if (distance > minSwipeDistance) {
        // swipe left → next image
        setCurrentIndex((prev) =>
            prev < hotel.images.length - 1 ? prev + 1 : prev
        );
        }
        if (distance < -minSwipeDistance) {
        // swipe right → prev image
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        setTouchStart(0);
        setTouchEnd(0);
    };


    const handleOpenModal = (hotelId) => {
        setSelectedHotelId(hotelId);
        setShowContactModal(true);
    };
    const OpenModal = (hotelId) => {
        setSelectedHotelId(hotelId);
        setShowAmenitiesModal(true);
    };



    const handleContactClick = () => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

        if (!isMobile) {
            alert("Calling is only supported on mobile devices. Please use a phone to call.");
        } else {
            // Replace with your phone number
            window.location.href = "tel:+918097809705";
        }
    };

    useEffect(() => {
        const fetchHotelById = async () => {
            try {
                const API_URL =
                    import.meta.env.VITE_ENV_MODE === "local"
                        ? `http://localhost:5000/api/hotels/${id}`
                        : `https://api.hiltopstay.com/api/hotels/${id}` ;

                const hotel = await axios.get(API_URL);
                hotel && setHotel(hotel.data);
                hotel && setMainImage(hotel.data.images[0]);
                setHotel(hotel.data);
            } catch (err) {
                console.error("Error fetching hotels:", err);
            }
        };

        fetchHotelById();
    }, [id]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const totalBedrooms = hotel?.rooms?.reduce((sum, room) => sum + (room.count || 0), 0) || 0;
    const totalBathrooms = totalBedrooms;
    const totalBeds = totalBedrooms;
    const totalMattresses = totalBedrooms;


    if (!hotel) return <div>Loading...</div>;

  return (
    <>
        {/* Search Form just below navbar */}
        <div className='px-4 md:px-16 lg:px-24 xl:px-32 pt-10 bg-gray-100 shadow-sm '>
            <div className='p-6 border-gray-200'>
                <SearchForm initialData={searchData} />
            </div>
        </div>
        <div className='py-10 md:py-15 px-3 md:px-10 lg:px-20 xl:px-15'>
            {/* Hotel Name */}
            <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                <h1 className='text-3xl md:text-4xl font-playfair'>{hotel.hotelName}</h1> 
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-blue-700 rounded-full'>20% OFF</p>
            </div>

            {/* Address */}
            <div className='flex items-center gap-1 text-gray-500 mt-2'>
                <IoLocationOutline />
                <span>{hotel.address}, {hotel.city}</span>
            </div>

            {/* Hotel Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Image Section Start */}
                        <div className="md:hidden">
                            {/* Mobile swipeable preview */}
                            <div className="order-1 block md:hidden overflow-x-auto">
                                <div className="flex space-x-2 snap-x snap-mandatory">
                                {hotel.images.map((img, index) => (
                                    <img
                                    key={index}
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    className="w-full flex-shrink-0 snap-start h-[400px] object-cover rounded-xl cursor-pointer"
                                    onClick={() => setCurrentIndex(index)} // 👈 open modal with index
                                    />
                                ))}
                                </div>
                            </div>

                            {/* Fullscreen Modal with swipe */}
                            {currentIndex !== null && (
                                <div
                                className="fixed inset-0 bg-white/100 bg-opacity-95 flex items-center justify-center z-50"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                >
                                {/* Close Button */}
                                <button
                                    onClick={() => setCurrentIndex(null)}
                                    className="absolute top-4 right-4 text-black text-3xl"
                                >
                                    <IoClose />
                                </button>

                                {/* Fullscreen Image */}
                                <img
                                    src={hotel.images[currentIndex]}
                                    alt="Selected"
                                    className="max-h-[100%] max-w-[98%] object-contain rounded-lg transition-transform duration-300"
                                />
                                </div>
                            )}
                        </div>  




                    {/* Mobile View: Swipeable Carousel Start*/}
                    {/* <div className="order-1 block md:hidden overflow-x-auto">
                        <div className="flex space-x-2 snap-x snap-mandatory">
                        {hotel.images.map((img, index) => (
                            <img
                            key={index}
                            src={img}
                            alt={`Image ${index + 1}`}
                            className="w-full flex-shrink-0 snap-start h-[400px] object-cover rounded-s"
                            // style={{ minWidth: '100%' }}
                            />
                        ))}
                        </div>
                    </div> */}



                    {/* Mobile View: Swipeable Carousel End*/}
                    
                    {/* Mobile View - Room Info for Villa, Mansion, Palace Start */}
                    <div className="order-2 md:hidden overflow-x-auto">
                        {["villa", "mansion", "palace", "homestay"].includes(hotel.hotelType?.toLowerCase()) && (
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mt-3 mb-6 px-4">
                                {/* Bedrooms section */}
                                <div className="flex items-start gap-2">
                                <img
                                    src="https://res.cloudinary.com/dytbju4xg/image/upload/v1749905577/bedroom_pmgukt.png"
                                    alt="bedroom icon"
                                    className="w-12 h-12 mt-1"
                                />
                                <div>
                                    
                                    <p className="font-semibold">{totalBedrooms} Bedrooms</p>
                                    <p className="text-m text-gray-600">
                                    {totalBathrooms} Bathrooms · {totalBeds} King Beds, {totalMattresses} Mattresses
                                    </p>
                                </div>
                                </div>

                                {/* Sleeps section */}
                                <div className="flex items-start gap-2">
                                <img
                                    src="https://res.cloudinary.com/dytbju4xg/image/upload/v1749905577/cake_tdlcct.png"
                                    alt="guests icon"
                                    className="w-12 h-12 mt-1"
                                />
                                <div>
                                    <p className="font-semibold">Sleeps {hotel.maxAdults} guests</p>
                                    <p className="text-m text-gray-600">Free stay for the younger kid</p>
                                </div>
                                </div>
                            </div>
                        )} 
                    </div>
                    {/* Mobile View: Room Info for Villa, Mansion, Palace End */}

                    {/* Mobile View: Title Description Start */}
                    <div className="order-3 md:hidden overflow-x-auto">
                        {/* Title + Description */}
                        <div>
                            <div className="my-2 rounded-xl bg-white shadow-md px-1 py-1">
                                <p className='text-xl'>About This Property</p>
                                <p className='text-gray-700'>
                                    {hotel.title}
                                </p>
                                <div className='mt-2 flex items-center justify-between' onClick={() => setIsOpen(true)}>
                                    <p>Property Highlights</p>
                                    <FaAngleRight className='text-blue-700' />
                                </div>

                                <div className='mt-5 border-t border-gray-300'>
                                    <h1 className='text-xl md:text-xl font-playfair'>Amenities</h1>
                                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                                        {hotel.amenities.slice(0,4).map((item, index) => (
                                            <div key={index} className='flex items-center gap-1 px-3 py-2'>
                                                <img src={facilityIcons[item] || facilityIcons.Other_Amenities} alt={item} className='w-5 h-5'></img>
                                                <p className='text-s text-gray-600'>{item}</p>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => OpenModal(hotel)}
                                            className="text-blue-600 font-medium cursor-pointer"
                                        >
                                            +More Amenities
                                        </button>
                                    </div>
                                </div>



                                  {isOpen && (
                                        <div className="fixed inset-0 bg-white bg-opacity-95 flex flex-col z-50 p-6">
                                            {/* Header */}
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-xl font-bold">{hotel.hotelName}</h2>
                                                <button
                                                onClick={() => setIsOpen(false)}
                                                className="text-3xl text-gray-700 hover:text-black"
                                                >
                                                <IoClose />
                                                </button>
                                            </div>

                                            {/* Description */}
                                            <div className="overflow-y-auto">
                                                {Array.isArray(hotel.description) &&
                                                        hotel.description.map((item, index) => (
                                                            <div key={index} className="mb-4">
                                                            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                                                            {["Property Highlights", "Room details and Amenities"].includes(item.title) ? (
                                                                <ul className="list-disc list-inside text-gray-600">
                                                                {item.desc
                                                                    .split(". ")
                                                                    .filter(sentence => sentence.trim() !== "")
                                                                    .map((sentence, i) => (
                                                                    <li key={i}>{sentence.trim().replace(/\.$/, "")}.</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p className="text-gray-600">{item.desc}</p>
                                                            )}
                                                            </div>
                                                        ))
                                                    }
                                            
                                            </div>

                                        </div>
                                    )}

                                {/* <div

                                    className={`text-gray-500 text-xl relative overflow-hidden transition-all ${
                                        expanded ? "" : "line-clamp-5"
                                    }`}
                                > 
                                    {Array.isArray(hotel.description) &&
                                        hotel.description.map((item, index) => (
                                            <div key={index} className="mb-4">
                                            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                                            {["Property Highlights", "Room details and Amenities"].includes(item.title) ? (
                                                <ul className="list-disc list-inside text-gray-600">
                                                {item.desc
                                                    .split(". ")
                                                    .filter(sentence => sentence.trim() !== "")
                                                    .map((sentence, i) => (
                                                    <li key={i}>{sentence.trim().replace(/\.$/, "")}.</li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-gray-600">{item.desc}</p>
                                            )}
                                            </div>
                                        ))
                                    }
                                </div> */}
                                {/* <button
                                    onClick={() => setExpanded(!expanded)}
                                    className="text-blue-600 font-medium mt-2 cursor-pointer"
                                >
                                    {expanded ? "Show less" : "Show more..."}
                                </button> */}
                            </div>

                        </div>
                    </div>
                    {/* Mobile View: Title Description End */}



                    {/* Desktop View: Grid Layout */}
                    <div className="hidden md:block md:col-span-1">
                        <img
                        src={hotel.images[0]}
                        alt="Main"
                        className="w-full h-[400px] object-cover rounded-xl"
                        />
                    </div>

                    {/* 2 stacked images (only on desktop) */}
                    <div className="hidden md:flex flex-col gap-4 col-span-1">
                        <img
                        src={hotel.images[3]}
                        alt="Second"
                        className="w-full h-[190px] object-cover rounded-xl cursor-pointer"
                        />
                        <div className="relative cursor-pointer" onClick={() => setShowModal(true)}>
                        <img
                            src={hotel.images[2]}
                            alt="Third"
                            className="w-full h-[190px] object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                            +{hotel.images.length - 3} Photos
                        </div>
                        </div>
                    </div>
                {/* Image Section End */}

                {/* Gray box with hotel details for desktop Start */}
                    <div className="hidden md:flex flex-col justify-between bg-gray-100 p-4 rounded-xl h-full">
                        <div>
                            <h2 className="text-lg font-bold mb-1">{hotel.hotelName}</h2>
                            <p className="text-sm text-gray-600 mb-3">{hotel.city}</p>
                            <p className="text-m text-black-600 mb-3">Fits {searchData?.options?.adult || 0} {searchData?.options?.adult === 1 ? "Adult" : "Adults"} & {searchData?.options?.children || 0} {searchData?.options?.children === 1 ? "Child" : "Children"}</p>

                            <div className="flex items-center text-m text-gray-400 space-x-2">
                                <div className="line-through">₹  {hotel.hotelType === 'Hotel'
                                                    ? hotel.rooms[0]?.BasePrice
                                                    : hotel.entirePropertyBasePrice || 'N/A'}</div>
                                <p>Per night</p>
                            </div>
                            <div className="text-xl font-bold text-black mb-1">
                                ₹ {hotel.hotelType === 'Hotel' 
                                                ? hotel.rooms[0].pricePerNight
                                                : hotel.entirePropertyPrice || 'N/A'}{' '}
                            </div>
                            <div className="border-t border-gray-300 my-3"></div>
                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center space-x-2">
                                    <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1749902140/mapImg_vx7qa1.png" alt="map" className="w-15 h-15 cursor-pointer" />
                                    <div>
                                    <p className="font-semibold text-xl cursor-pointer">{hotel.city}</p>
                                    <p className="text-m text-gray-500 cursor-pointer">{hotel.distance} km from city centre</p>
                                    </div>
                                </div>
                                <span
                                    onClick={() => document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })}
                                    className="text-m text-blue-600 cursor-pointer"
                                    >
                                    See on Map
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const startDate = new Date(searchData?.date?.[0]?.startDate);
                                const endDate = new Date(searchData?.date?.[0]?.endDate);

                                // Convert both to YYYY-MM-DD for accurate comparison
                                const formatDate = (date) =>
                                date.toISOString().split("T")[0];

                                if (formatDate(startDate) === formatDate(endDate)) {
                                alert("Please select both Check-in and Check-out dates before proceeding.");
                                return;
                                }

                                navigate(`/hotels/booking/${hotel._id}`, { state: { searchData } });
                                scrollTo(0, 0);
                            }}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all cursor-pointer"
                            >
                            BOOK THIS NOW
                        </button>

                    </div>
                {/* Gray box with hotel details for desktop End */}
            </div>

            {/* Image Modal Start */}
                {<ImageModal images={hotel.images} selectedImage={mainImage}  onSelect={(img) => setMainImage(img)} show={showModal} onClose={closeModal} />}
            {/* Image Modal End */}

            {/* Room Info for Villa, Mansion, Palace Start */}
                <div className='hidden md:hidden lg:flex items-start'>
                    {["villa", "mansion", "palace", "homestay"].includes(hotel.hotelType?.toLowerCase()) && (
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-10 mt-3 mb-6 px-4">
                            {/* Bedrooms section */}
                            <div className="flex items-start gap-2">
                            <img
                                src="https://res.cloudinary.com/dytbju4xg/image/upload/v1749905577/bedroom_pmgukt.png"
                                alt="bedroom icon"
                                className="w-12 h-12 mt-1"
                            />
                            <div>
                                
                                <p className="font-semibold">{totalBedrooms} Bedrooms</p>
                                <p className="text-m text-gray-600">
                                {totalBathrooms} Bathrooms · {totalBeds} King Beds, {totalMattresses} Mattresses
                                </p>
                            </div>
                            </div>

                            {/* Sleeps section */}
                            <div className="flex items-start gap-2">
                            <img
                                src="https://res.cloudinary.com/dytbju4xg/image/upload/v1749905577/cake_tdlcct.png"
                                alt="guests icon"
                                className="w-12 h-12 mt-1"
                            />
                            <div>
                                <p className="font-semibold">Sleeps {hotel.maxAdults} guests</p>
                                <p className="text-m text-gray-600">Free stay for the younger kid</p>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
                
            {/* Room Info for Villa, Mansion, Palace End */}
            
            {/* Room Highlights Start */}
                <div className='flex flex-col md:flex-row md:justify-between mt-8'>
                    {/* Amenities Start */}
                    <div className='flex flex-col hidden md:block'>
                        <h1 className='text-3xl md:text-4xl font-playfair'>Property Highlights</h1>
                        <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                            {hotel.amenities.slice(0,6).map((item, index) => (
                                <div key={index} className='flex items-center gap-1 px-3 py-2'>
                                    <img src={facilityIcons[item] || facilityIcons.Other_Amenities} alt={item} className='w-5 h-5'></img>
                                    <p className='text-s text-gray-600'>{item}</p>
                                </div>
                            ))}
                            <button
                                onClick={() => OpenModal(hotel)}
                                className="text-blue-600 font-medium cursor-pointer"
                            >
                                +More Amenities
                            </button>
                        </div>
                    </div>
                     {/* Amenities End */}
                    
                    {/* Callback Button Start */}
                    <div className="pb-6 sm:pb-0">
                        <button onClick={() => handleOpenModal(hotel)} 
                        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 px-4 rounded-md shadow hover:opacity-90 transition-opacity w-full md:w-auto duration-200 cursor-pointer transition-all whitespace-nowrap" title="Want more info? Share your name and number to get a quick call from the property owner!">
                            Get Callback
                        </button>
                    </div>
                    {/* Callback Button End */}
                    
                    {/* Gray box for Mobile Start */}
                        <div className="block md:hidden overflow-x-auto bg-gray-100 p-4 rounded-xl">
                            <div className=''>
                            <p className="text-m text-black-600 mb-3">Fits {searchData?.options?.adult || 0} {searchData?.options?.adult === 1 ? "Adult" : "Adults"} & {searchData?.options?.children || 0} {searchData?.options?.children === 1 ? "Child" : "Children"}</p>
                                <div className="flex items-center text-m text-gray-400 space-x-2">
                                    <div className="line-through">₹  {hotel.hotelType === 'Hotel'
                                                        ? hotel.rooms[0]?.BasePrice
                                                        : hotel.entirePropertyBasePrice || 'N/A'} </div>
                                    <p>Per night</p>
                                </div>
                                <div className="text-xl font-bold text-black mb-1">
                                    ₹ {hotel.hotelType === 'Hotel' 
                                                    ? hotel.rooms[0].pricePerNight
                                                    : hotel.entirePropertyPrice || 'N/A'}{' '}
                                    {/* <span className="text-xs font-normal">+ ₹ {hotel.taxes} taxes & fees</span> */}
                                </div>
                                <div className="border-t border-gray-300 my-3"></div>
                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center space-x-2">
                                        <img src="https://res.cloudinary.com/dytbju4xg/image/upload/v1749902140/mapImg_vx7qa1.png" alt="map" className="w-15 h-15 cursor-pointer" />
                                        <div>
                                        <p className="font-semibold text-xl cursor-pointer">{hotel.city}</p>
                                        <p className="text-m text-gray-500 cursor-pointer">{hotel.distance}</p>
                                        </div>
                                    </div>
                                    <span
                                        onClick={() => document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })}
                                        className="text-m text-blue-600 cursor-pointer"
                                        >
                                        See on Map
                                    </span>
                                </div>
                            </div>
                            <button  
                                onClick={() => {
                                    const startDate = new Date(searchData?.date?.[0]?.startDate);
                                    const endDate = new Date(searchData?.date?.[0]?.endDate);

                                    // Convert both to YYYY-MM-DD for accurate comparison
                                    const formatDate = (date) =>
                                    date.toISOString().split("T")[0];

                                    if (formatDate(startDate) === formatDate(endDate)) {
                                    alert("Please select both Check-in and Check-out dates before proceeding.");
                                    return;
                                    }

                                    navigate(`/hotels/booking/${hotel._id}`, { state: { searchData } });
                                    scrollTo(0, 0);
                                }}  
                                className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md hover:bg-blue-700 transition-all cursor-pointer"
                                >
                                BOOK THIS NOW
                            </button>
                        </div>
                    {/* Gray box for Mobile Start */}
                </div>

                {/* Show Amenities Modal Start */}
                {showAmenitiesModal && (
                    <ShowAmenities
                    hotelId={selectedHotelId}
                    onClose={() => setShowAmenitiesModal(false)}
                    />
                )}
                {/* Show Amenities Modal End */}

                {/* Show Get User Info Modal Start */}
                {showContactModal && (
                    <GetUserInfo
                    hotelId={selectedHotelId}
                    onClose={() => setShowContactModal(false)}
                    />
                )}
                {/* Show Get User Info Modal End */}
            {/* Room Highlights End */}

            {/* Common specifications Start */}
                {/* Hotel Title And Description Start */}
                <div className='hidden md:hidden lg:flex items-start gap-2 order-4'>
                    <div>
                        <p className='text-2xl'>{hotel.title}</p>
                        <div className="my-5">
                            <div
                                className={`text-gray-500 text-xl relative overflow-hidden transition-all ${
                                    expanded ? "" : "line-clamp-5"
                                }`}
                            > 
                                {Array.isArray(hotel.description) &&
                                    hotel.description.map((item, index) => (
                                        <div key={index} className="mb-4">
                                        <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                                        {["Property Highlights", "Room details and Amenities"].includes(item.title) ? (
                                            <ul className="list-disc list-inside text-gray-600">
                                            {item.desc
                                                .split(". ")
                                                .filter(sentence => sentence.trim() !== "")
                                                .map((sentence, i) => (
                                                <li key={i}>{sentence.trim().replace(/\.$/, "")}.</li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-600">{item.desc}</p>
                                        )}
                                        </div>
                                    ))
                                }
                            </div>
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="text-blue-600 font-medium mt-2 cursor-pointer"
                            >
                                {expanded ? "Show less" : "Show more..."}
                            </button>
                        </div>

                    </div>
                </div>
                {/* Hotel Title And Description End */}

                {/* Hotel Location Start */}
                <div id="map-section" className='mb-5'>
                    <HotelLocationMap
                        hotelName={hotel.hotelName}
                        address={hotel.address}
                        latitude={hotel.latitude}
                        longitude={hotel.longitude}
                    />
                </div>
                {/* Hotel Location End */}
                
                {/* Contact Now Button Start */}
                <button onClick={handleContactClick} type="submit" className="bg-blue-700 hover:bg-blue-800 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer">
                        Contact Now
                </button>
                {/* Contact Now Button End */}
            {/* Common specifications End */}


        </div>

    </>
  )
}

export default HotelDetailView
