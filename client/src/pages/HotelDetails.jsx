import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import { IoLocationOutline } from "react-icons/io5";
import StarRating from '../components/StarRating';
// import MyModal from '../components/myModal';
import HotelLocationMap from '../components/HotelLocationMap';
import { facilityIcons } from '../assets/assets';
import ImageModal from '../components/ImageModal';
import GetUserInfo from '../components/GetUserInfo';

const HotelDetails = () => {
    const {id} = useParams();
    const [hotel, setHotel] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [showModal, setShowModal] = useState(false); 
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const [expanded, setExpanded] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [selectedHotelId, setSelectedHotelId] = useState(null);

    const handleOpenModal = (hotelId) => {
        setSelectedHotelId(hotelId);
        setShowContactModal(true);
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
                const hotel = await axios.get("https://api.hiltopstay.com/api/hotels");
                // const hotel = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels/${id}`);
                hotel && setHotel(hotel.data);
                hotel && setMainImage(hotel.data.images[0]);
                console.log(typeof hotel.description);
            } catch (err) {
                console.error("Error fetching hotel details:", err);
            }
        };
        fetchHotelById();
    }, [id]);

    // let parsedDescription = [];
    // try {
    //     if (Array.isArray(hotel.description) && typeof hotel.description[0] === 'string') {
    //         parsedDescription = JSON.parse(hotel.description[0]); // parse the first string item
    //     } else if (Array.isArray(hotel.description)) {
    //         parsedDescription = hotel.description;
    //     }
    // } catch (err) {
    //     console.error("Invalid description format", err);
    // }

    if (!hotel) return <div>Loading...</div>;

    return (
    <div className='py-28 md:py-30 px-4 md:px-15 lg:px-22 xl:px-30'>
        {/* Hotel Details */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>{hotel.hotelName}
                <span className='font-inner text-sm'> ({hotel.roomsType.join(', ')})</span>
            </h1> 
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
        </div>

        {/* Rating */}
        {/* <div className='flex items-center gap-1 mt-2'>
            <StarRating />
            <p className='ml-2'>200+ reviews</p>
        </div> */}

        {/* Address */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <IoLocationOutline />
            <span>{hotel.address}, {hotel.city}</span>
        </div>

        {/* Images Grid */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
                <img
                    src={mainImage}
                    alt="Main hotel view"
                    className="w-full h-[400px] object-cover rounded-xl shadow-md"
                />
            </div>

            <div className="grid grid-cols-2 gap-3">
                {hotel.images.slice(1, 5).map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        onClick={() => setMainImage(img)}
                        className={`w-full h-[95px] md:h-[120px] object-cover rounded-xl cursor-pointer ${mainImage === img ? 'outline outline-2 outline-orange-500' : ''}`}
                        alt="Hotel thumbnail"
                    />
                ))}

                {hotel.images.length > 5 && (
                    <div
                        className="w-full h-[95px] md:h-[120px] flex items-center justify-center bg-gray-200 rounded-xl text-gray-700 font-semibold text-sm cursor-pointer"
                        onClick={() => setShowModal(true)}
                    >
                        +{hotel.images.length - 5} photos
                    </div>
                )}
            </div>
         

      
        </div>

        {/* Modal */}
        {<ImageModal images={hotel.images} selectedImage={mainImage}  onSelect={(img) => setMainImage(img)} show={showModal} onClose={closeModal} />}
        {/* <MyModal images={hotel.images} selectedImage={mainImage}  onSelect={(img) => setMainImage(img)} show={showModal} onClose={closeModal} />           */}

        {/* Room Highlights */}
        <div className='flex flex-col md:flex-row md:justify-between mt-8'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>Property Highlights</h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                    {hotel.amenities.map((item, index) => (
                        <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                            <img src={facilityIcons[item]} alt={item} className='w-5 h-5'></img>
                            <p className='text-xs'>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
            {/* hotel price */}
            {/* <p className='text-2xl font-medium'>₹ 2000/night</p> */}
            <div className="pb-6 sm:pb-0">
                <button onClick={() => handleOpenModal(hotel)} className="w-fit px-3 py-1.5 text-sm font-medium border border-gray-300 
                    rounded hover:bg-gray-200 transition-all cursor-pointer whitespace-nowrap">
                    Get Callback
                </button>
            </div>
            
        </div>
        {showContactModal && (
            <GetUserInfo
            hotelId={selectedHotelId}
            onClose={() => setShowContactModal(false)}
            />
        )}

        {/* CheckIn CheckOut Form */}
        {/* <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white 
            shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl' >
            
            <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                
                <div className='flex flex-col'>
                    <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                    <input type='date' id="checkInDate" placeholder='Check-In' className='w-full rounded border border-gray-300
                    px-3 py-2 mt-1.5 outline-none' required></input>
                </div>
                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>
                <div className='flex flex-col'>
                    <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                    <input type='date' id="checkOutDate" placeholder='Check-Out' className='w-full rounded border border-gray-300
                    px-3 py-2 mt-1.5 outline-none' required></input>
                </div>
                <div className='w-px h-15 bg-gray-300/70 max-md:hidden'></div>        
                <div className='flex flex-col'>
                    <label htmlFor="guests" className='font-medium'>Guests</label>
                    <input type='number' id="guests" placeholder='0' className='max-w-20 rounded border border-gray-300 px-3 py-2 
                    mt-1.5 outline-none ' required></input>
                </div>

            </div>
            <button type="submit" className='bg-primary hover:bg-primary-dull active:scale-95 transition-all
            text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>Check Availability</button>
        </form> */}

        {/* Common specifications */}
        <div>
            <div className='flex items-start gap-2'>
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


                            {/* {Array.isArray(hotel.description) &&
                                hotel.description.map((item, index) => (
                                    <div key={index} className="mb-4">
                                        <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                ))
                            } */}
                            {/* {hotel.description} */}

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
            <div className='mb-5'>
                <HotelLocationMap
                    hotelName={hotel.hotelName}
                    address={hotel.address}
                    latitude={17.8941226}
                    longitude={73.6516607}
                />
            </div>
           <button onClick={handleContactClick} type="submit" className="bg-blue-700 hover:bg-blue-800 active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer">
                Contact Now
            </button>
        </div>
                
       
    </div>
  )
}

export default HotelDetails
