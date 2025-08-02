import React, { useEffect, useState } from 'react'
import Title from '../../components/Title'
import axios from "axios";
import { RiHotelLine } from "react-icons/ri";

const Dashboard = () => {
    const [hotels, setHotels] = useState([]);
    useEffect(() => {
        const fetchHotels = async () => {
        try {
            const API_URL = import.meta.env.VITE_ENV_MODE === "local"
                    ? "http://localhost:5000/api/hotels"
                    : "https://api.hiltopstay.com/api/hotels";
            const res = await axios.get(API_URL);
            // const res = await axios.get("http://localhost:5000/api/hotels"); 
            setHotels(res.data);
        } catch (err) {
            console.error("Error fetching hotels:", err);
        }
        };

        fetchHotels();
    }, []);

    return (
        <div>
            <Title font='outfit' title='Dashboard' subTitle=''/>
            <div className='flex gap-4 my-8'>
                {/* Total Hotels */}
                <div className='bg-primary/3 border border-primary/10 rounded flex p-4 pr-8'>
                    {/* <RiHotelLine  className='max-sm:hidden h-20'/> */}
                    <div className='flex flex-col sm:ml-4 font-medium '>
                        <p className='text-blue-500 text-lg'>Total Hotels</p>
                        <h2 className="text-neutral-400 text-base font-bold">{hotels.length}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
