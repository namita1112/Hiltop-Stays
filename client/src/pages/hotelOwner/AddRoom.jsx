import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Title from "../../components/Title";
import Select from 'react-select';
const AddRoom = () => {
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchHotels = async () => {
            try {
            const API_URL =
                import.meta.env.VITE_ENV_MODE === 'local'
                ? 'http://localhost:5000/api/hotels/getAllHotels'
                : 'https://api.hiltopstay.com/api/hotels/getAllHotels';
            const res = await axios.get(API_URL);
            setHotels(res.data);
            } catch (err) {
            console.error('Error fetching hotels:', err);
            }
        };

        fetchHotels();
    }, []);

    const bed_types = [
        { label: 'Standard Room', value: 'Single Room' },
        { label: 'Deluxe Room', value: 'Deluxe Room' },
        { label: 'Superior Room', value: 'Superior Room' },
        { label: 'Executive Room', value: 'Executive Room' },
        { label: 'Studio Room', value: 'Studio Room' }, 
        { label: 'Suite', value: 'Suite' },
        { label: 'Balcony Room', value: 'Balcony Room' },
        { label: 'Single Bed Room', value: 'Single Bed Room' },
        { label: 'Double Bed Room', value: 'Double Bed Room' },
    ];

     const amenities = [
        { label: 'Air Conditioning', value: 'Air Conditioning' },
        { label: 'Air Conditioning (Centralized)', value: 'Air Conditioning (Centralized)' },
        { label: 'WiFi', value: 'WiFi' },
        { label: 'Free WiFi', value: 'Free WiFi' },
        { label: 'Free WiFi(Free - Speed Suitable for working)', value: 'Free WiFi(Free - Speed Suitable for working)' },
        { label: 'Bakery', value: 'Bakery' },
        { label: 'Balcony/Terrace', value: 'Balcony/Terrace' },
        { label: 'Balcony', value: 'Balcony' },
        { label: 'Terrace', value: 'Terrace' },
        { label: 'Banquet', value: 'Banquet' },
        { label: 'Bonfire', value: 'Bonfire' },
        { label: 'Bonfire (Paid)', value: 'Bonfire (Paid)' },
        { label: 'Coffee Shop (Limited Hours)', value: 'Coffee Shop (Limited Hours)' },
        { label: 'Cafe (Limited Hours)', value: 'Cafe (Limited Hours)' },
        { label: 'Cafe', value: 'Cafe' },
        { label: 'CCTV', value: 'CCTV' },
        { label: 'Private Pool', value: 'Private Pool' },
        { label: 'Private Swimming Pool', value: 'Private Swimming Pool' },
        { label: 'Swimming Pool', value: 'Swimming Pool' },
        { label: 'Swimming Pool (Infinity Pool)', value: 'Swimming Pool (Infinity Pool)' },
        { label: 'Private Dining Area', value: 'Private Dining Area' },
        { label: 'Dining Area', value: 'Dining Area' },
        { label: 'Private Living Room', value: 'Private Living Room' },
        { label: 'Living Room', value: 'Living Room' },
        { label: 'Free Parking (Free - Valet)', value: 'Free Parking (Free - Valet)' },
        { label: 'Onsite Parking is available', value: 'Onsite Parking is available' },
        { label: 'Parking available for free', value: 'Parking available for free' },
        { label: 'Wheelchair (Paid)', value: 'Wheelchair (Paid)' },
        { label: 'Wheelchair accessible', value: 'Wheelchair accessible' },
        { label: 'Wheelchair (Free)', value: 'Wheelchair (Free)' },
        { label: 'Hot & Cold Water', value: 'Hot & Cold Water' },
        { label: 'TV', value: 'TV' },
        { label: 'Toiletries', value: 'Toiletries' },
        { label: 'Telephone', value: 'Telephone' },
        { label: 'Smoking Rooms', value: 'Smoking Rooms' },
        { label: 'Spa', value: 'Spa' },
        { label: 'Room Service', value: 'Room Service' },
        { label: 'Restaurant', value: 'Restaurant' },
        { label: 'Reception', value: 'Reception' },
        { label: 'Printer', value: 'Printer' },
        { label: 'Outdoor Sports', value: 'Outdoor Sports' },
        { label: 'Mineral Water', value: 'Mineral Water' },
        { label: 'Luggage Storage', value: 'Luggage Storage' },
        { label: 'Luggage Assistance', value: 'Luggage Assistance' },
        { label: 'Lounge', value: 'Lounge' },
        { label: 'Library', value: 'Library' },
        { label: 'Laundry', value: 'Laundry' },
        { label: 'LAN', value: 'LAN' },
        { label: 'Kitchenette', value: 'Kitchenette' },
        { label: 'Kids Play Area', value: 'Kids Play Area' },
        { label: 'Kids Club', value: 'Kids Club' },
        { label: 'Jacuzzi', value: 'Jacuzzi' },
        { label: 'Indoor Games', value: 'Indoor Games' },
        { label: 'Housekeeping', value: 'Housekeeping' },
        { label: 'Gym', value: 'Gym' },
        { label: 'Geyser/Water Heater', value: 'Geyser/Water Heater' },
        { label: 'Geyser', value: 'Geyser' },
        { label: 'Water Heater', value: 'Water Heater' },
        { label: 'First-aid Services', value: 'First-aid Services' },
        { label: 'Fire Extinguishers', value: 'Fire Extinguishers' },
        { label: 'Fax Serviceire', value: 'Fax Service' },
        { label: 'EV Charging Station', value: 'EV Charging Station' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Conference Room', value: 'Conference Room' },
        { label: 'Closet', value: 'Closet' },
        { label: 'Dental Kit', value: 'Dental Kit' },
        { label: 'Iron/Ironing Board', value: 'Iron/Ironing Board' },
        { label: 'Mini Fridge', value: 'Mini Fridge' },
        { label: 'Other_Amenities', value: 'Other_Amenities' },
        { label: 'Mountain View', value: 'Mountain View' },
        { label: 'Pool Access', value: 'Pool Access' },
        { label: 'Spa Treatments', value: 'Spa Treatments' }, 
        { label: 'Food & Beverage', value: 'Food & Beverage' },
        { label: 'Concierge services', value: 'Concierge services' },
        { label: 'Transport & Parking', value: 'Transport & Parking' },
        { label: 'In-Room Amenities', value: 'In-Room Amenities' },
        { label: 'Recreational Services', value: 'Recreational Services' },
    ];


    const [roomData, setRoomData] = useState({
        hotel: "",
        bedType: "",
        BasePrice: "",
        pricePerNight: "",
        maxOccupancy: "",
        amenities: [],
        count: "",
    });

    // const [images, setImages] = useState([]);
    
    const handleChange = (e) => {
        setRoomData({ ...roomData, [e.target.name]: e.target.value });
    };

    // const handleFileChange = (e) => {
    //     setImages([...e.target.files]);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("hotel", roomData.hotel);
        formData.append("bedType", roomData.bedType);
        formData.append("BasePrice", roomData.BasePrice);
        formData.append("pricePerNight", roomData.pricePerNight);
        formData.append("maxOccupancy", roomData.maxOccupancy);
        formData.append("count", roomData.count);
        // formData.append("roomsType", JSON.stringify(hotelData.roomsType));
        formData.append("amenities", JSON.stringify(roomData.amenities));
        

        // // Append images once
        // for (let i = 0; i < images.length; i++) {
        //     formData.append("images", images[i]);
        // }
        // // console.log(typeof descriptionList);

        // for (let [key, val] of formData.entries()) {
        //     console.log(key,":", val);
        // }

        // try {
        console.log("VITE_BACKEND_URL :",`${import.meta.env.VITE_API_URL}`);
        // const BASE = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const API_URL = import.meta.env.VITE_ENV_MODE === "local"
                    ? "http://localhost:5000/api/rooms"
                    : "https://api.hiltopstay.com/api/rooms";
        // const res = await axios.post(`https://api.hiltopstay.com/api/hotels`, formData, {
        // const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/hotels`, formData, {
        const res = await axios.post(API_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Room added successfully!");
        console.log(res.data);
        window.location.reload();
        // } catch (err) {
        //     console.error("Error adding hotel:", err);
        //     alert("Failed to add hotel.");
        // } finally {
        //     setIsLoading(false);
        // }
    };
    


    return (
        <form onSubmit={handleSubmit}>
            <Title font="outfit" title="Add Room" subTitle="Fill in the details carefully and room details, amenities to enhance the user booking experience"/>
            <div className="w-full flex flex-col sm:gap-4 mt-4">
                
                <div className="flex flex-col sm:flex-row sm:gap-4">
                    {/* Hotel */}
                    <div className="flex-1">
                        <label htmlFor="hotel" className="text-gray-600">
                            Hotel Name
                        </label>
                        <select
                            id="hotel"
                            name="hotel"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a hotel</option>
                            {hotels.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>
                                {hotel.hotelName}
                            </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Bed Type/ Room Type */}
                    <div className="flex-1">
                        <label htmlFor="bedType" className="text-gray-600">Room Type</label>
                            <select
                            id="bedType"
                            name="bedType"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a room type</option>
                            {bed_types.map((bed) => (
                            <option key={bed.value} value={bed.value}>
                                {bed.label}
                            </option>
                            ))}
                        </select>
                    </div>

                    {/* Base Price */}
                    <div className="flex-1">
                        <label htmlFor="BasePrice" className="text-gray-600">Base Price</label>
                        <input
                            type="text" 
                            id="BasePrice" 
                            name="BasePrice"
                            placeholder="Enter Base Price"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Price Per Night */}
                    <div className="flex-1">
                        <label htmlFor="pricePerNight" className="text-gray-600">Price Per Night</label>
                        <input
                            type="text" 
                            id="pricePerNight" 
                            name="pricePerNight"
                            placeholder="Enter Price Per Night"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    
                    
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4">
                    {/* Max Occupacy */}
                    <div className="flex-1">
                        <label htmlFor="maxOccupancy" className="text-gray-600">Max Occupacy</label>
                        <input
                            type="text" 
                            id="maxOccupancy" 
                            name="maxOccupancy"
                            placeholder="Enter Max Guest Count"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* amenities */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="amenities" className="text-gray-600">Hotel Amenities</label>
                        <Select
                            isMulti
                            name="amenities"
                            options={amenities}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            onChange={(selected) => {
                            const selectedValues = selected.map(item => item.value);
                            setRoomData(prev => ({ ...prev, amenities: selectedValues }));
                            }}
                        />
                    </div>

                    {/* count */}
                    <div className="flex-1">
                        <label htmlFor="count" className="text-gray-600">Similar No. of Room </label>
                        <input
                            type="text" 
                            id="count" 
                            name="count"
                            placeholder="Enter Count"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

             <div className="flex justify-end mt-4">
                {isLoading ? (
                    <button
                        type="button"
                        className="bg-gray-400 text-white py-2 px-4 mb-20 rounded cursor-not-allowed"
                        disabled
                    >
                        Submitting...
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 mb-20 rounded hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                )}
            </div>
        </form>
    )
}

export default AddRoom
