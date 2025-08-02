import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { facilityIcons } from '../assets/assets';
const ShowAmenities = ({ hotelId, onClose }) => {
    const [form, setForm] = useState({ name: '', mobile: '' });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

        const handleSubmit = async (e) => {
            e.preventDefault();
        };


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="flex flex-col w-[90vw] max-w-3xl bg-white rounded-xl overflow-hidden p-6 shadow-lg relative">
                <button className="absolute top-2 right-3 text-xl cursor-pointer" onClick={onClose}>
                <IoCloseOutline />
                </button>

                <h2 className="text-lg font-semibold">Amenities at {hotelId.hotelName}</h2>
                <hr className="my-3 border-t border-gray-300" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {hotelId.amenities.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-2">
                    <img src={facilityIcons[item] || facilityIcons.Other_Amenities} alt={item} className="w-5 h-5" />
                    <p className="text-s text-gray-600">{item}</p>
                    </div>
                ))}
                </div>
            </div>
        </div>

    );
};

export default ShowAmenities;
