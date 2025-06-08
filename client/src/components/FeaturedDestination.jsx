import React, { useEffect, useState } from 'react'
import axios from "axios";
import HotelCard from './HotelCard';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
const FeaturedDestination = () => {
    const [hotels, setHotels] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchHotels = async () => {
        try {
            const res = await axios.get("https://api.hiltopstay.com/api/hotels");
            // const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels`);
            // const res = await axios.get("http://localhost:5000/api/hotels"); 
            setHotels(res.data);
        } catch (err) {
            console.error("Error fetching hotels:", err);
        }
        };

        fetchHotels();
    }, []);
    
    return (
        <div className='items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-10'>
            <Title title='Featured Destination' subTitle='Discover our handpicked selection of exceptional properties around the world, offering
            unparalleled luxury and unforgettable experiences.'/>

            <div className='flex flex-wrap items-center justify-center gap-6 mt-10'>
                {hotels.slice(0,4).map((hotel, index) => (
                    <HotelCard key={hotel._id} hotel={hotel} index={index}/>
                ))}
            </div>

            <div className="flex justify-center">
                <button 
                    onClick={() => {navigate('/hotels'); scrollTo(0,0)}}
                    className='my-10 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'
                >
                    View All Hotels
                </button>
            </div>

            {/* <button onClick={() => {navigate('/hotels'); scrollTo(0,0)}} className='my-10 px-4 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 
            transition-all cursor-pointer'>View All Hotels</button> */}
        </div>
    )
}

export default FeaturedDestination
