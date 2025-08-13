import React, { useEffect, useRef, useState } from 'react';
import axios from "axios";
import Title from "../../components/Title";
import Select from 'react-select';
import { CiCircleRemove } from "react-icons/ci";
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';


const AddHotel = () => {
    // const url = "https://api.hiltopstay.com/api/hotels";
    // console.log(url);
    // useEffect(() => {
    //     const apiURL = import.meta.env.VITE_API_URL;
    //     console.log("VITE_BACKEND_URL :", apiURL);
    // }, []);
    const [isLoading, setIsLoading] = useState(false);
    const [hotelData, setHotelData] = useState({
        hotelName: "",
        title: "",
        description: [],
        hotelRule: [],
        address: "",
        contact: "+91-8097809705",
        owner: "",
        ownerContact: "",
        city: "",
        location: "",
        distance: "",
        rating: "",
        latitude: "",
        longitude: "",
        hotelType: "",
        amenities: [], // array of strings
        isEntireProperty: "",
        availableDates: [],
        checkIn: "",
        checkOut: "",
        maxAdults: "",
        entirePropertyBasePrice: "",
        entirePropertyPrice: ""
        // roomsType: []  // array of objects like [{type: "Deluxe", price: 3000}]
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };
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

    const room_types = [
        { label: 'Standard Room', value: 'Standard Room' },
        { label: 'Deluxe Room', value: 'Deluxe Room' },
        { label: 'Superior Room', value: 'Superior Room' },
        { label: 'Executive Room', value: 'Executive Room' },
        { label: 'Studio Room', value: 'Studio Room' }, 
        { label: 'Suite', value: 'Suite' },
        { label: 'Balcony Room', value: 'Balcony Room' },
        { label: 'Single Bed Room', value: 'Single Bed Room' },
        { label: 'Double Bed Room', value: 'Double Bed Room' },
        { label: 'Recreational Services', value: 'Recreational Services' },
    ];

    const hotel_type = [
        { label: 'Villa', value: 'Villa' },
        { label: 'Hotel', value: 'Hotel' },
        { label: 'Homestay', value: 'Homestay' },
    ]

    const [descriptionList, setDescriptionList] = useState([{ title: '', desc: '' }]);
    const handleDescriptionChange = (index, field, value) => {
    const updatedList = [...descriptionList];
        updatedList[index][field] = value;
        setDescriptionList(updatedList);
    };

    const addDescriptionField = () => {
        setDescriptionList([...descriptionList, { title: '', desc: '' }]);
    };

    const removeDescription = (index) => {
        const updatedList = [...descriptionList];
        updatedList.splice(index, 1);
        setDescriptionList(updatedList);
    };

    const [ruleList, setRuleList] = useState([{ title: '', desc: '' }]);
    const handleRuleChange = (index, field, value) => {
    const updatedList = [...ruleList];
        updatedList[index][field] = value;
        setRuleList(updatedList);
    };

    const addRuleField = () => {
        setRuleList([...ruleList, { title: '', desc: '' }]);
    };

    const removeRule = (index) => {
        const updatedList = [...ruleList];
        updatedList.splice(index, 1);
        setRuleList(updatedList);
    };


    const [state, setState] = useState([
        {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
        }
    ]);

    const [open, setOpen] = useState(false);
    const calendarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setOpen(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("hotelName", hotelData.hotelName);
        formData.append("title", hotelData.title);
        formData.append("description", JSON.stringify(descriptionList));
        formData.append("hotelRule", JSON.stringify(ruleList));
        formData.append("address", hotelData.address);
        formData.append("contact", hotelData.contact);
        formData.append("owner", hotelData.owner);
        formData.append("ownerContact", hotelData.ownerContact);
        formData.append("city", hotelData.city);
        formData.append("location", hotelData.location);
        formData.append("distance", hotelData.distance);
        formData.append("rating", hotelData.rating);
        formData.append("latitude", hotelData.latitude);
        formData.append("longitude", hotelData.longitude);
        formData.append("hotelType", hotelData.hotelType);
        // formData.append("roomsType", JSON.stringify(hotelData.roomsType));
        formData.append("amenities", JSON.stringify(hotelData.amenities));
        formData.append("isEntireProperty", hotelData.isEntireProperty);
        // formData.append("isEntireProperty", hotelData.isEntireProperty);
        formData.append("availableDates", JSON.stringify(hotelData.availableDates));
        formData.append("checkIn", hotelData.checkIn);
        formData.append("checkOut", hotelData.checkOut);
        formData.append("maxAdults", hotelData.maxAdults);
        formData.append("entirePropertyBasePrice", Number(hotelData.entirePropertyBasePrice));
        formData.append("entirePropertyPrice", Number(hotelData.entirePropertyPrice));
        // formData.append("entirePropertyBasePrice", hotelData.entirePropertyBasePrice);
        // formData.append("entirePropertyPrice", hotelData.entirePropertyPrice);

        // Append images once
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        // console.log(typeof descriptionList);

        // for (let [key, val] of formData.entries()) {
        //     console.log(key,":", val);
        // }

        // try {
        // console.log("VITE_BACKEND_URL :",`${import.meta.env.VITE_API_URL}`);
        // const BASE = import.meta.env.VITE_API_URL.replace(/\/$/, "");
        const API_URL = import.meta.env.VITE_ENV_MODE === "local"
                    ? "http://localhost:5000/api/hotels"
                    : "https://api.hiltopstay.com/api/hotels";
        // const res = await axios.post(`https://api.hiltopstay.com/api/hotels`, formData, {
        // const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/hotels`, formData, {
        const res = await axios.post(API_URL, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Hotel added successfully!");
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
            <Title font="outfit" title="Add Hotel" subTitle="Fill in the details carefully and room details, amenities to enhance the user booking experience"/>
            <div className="w-full flex flex-col sm:gap-4 mt-4">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                    {/* Hotel Name */}
                    <div className="flex-1">
                        <label htmlFor="hotelName" className="text-gray-600">Hotel Name</label>
                        <input
                            type="text" 
                            id="hotelName" 
                            name="hotelName"
                            placeholder="Enter Hotel Name"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Hotel Title */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="title" className="text-gray-600">Hotel Title</label>
                        <input
                            type="text" 
                            id="title" 
                            name="title"
                            placeholder="Enter Hotel Title"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    {/* Hotel Address */}
                    <div className="flex-1">
                        <label htmlFor="address" className="text-gray-600">Hotel Address</label>
                        <input
                            type="text" 
                            id="address" 
                            name="address"
                            placeholder="Enter Hotel Address"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* Contact */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="contact" className="text-gray-600">Contact</label>
                        <input
                            type="text" 
                            id="contact" 
                            name="contact"
                            readOnly
                            value={hotelData.contact}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    {/* Hotel Owner Name */}
                    <div className="flex-1">
                        <label htmlFor="owner" className="text-gray-600">Hotel Owner Name</label>
                        <input
                            type="text" 
                            id="owner" 
                            name="owner"
                            placeholder="Enter Hotel Owner Name"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {/* Hotel Owner Contact */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="ownerContact" className="text-gray-600">Hotel Owner Contact</label>
                        <input
                            type="text" 
                            id="ownerContact" 
                            name="ownerContact"
                            placeholder="Enter Hotel Owner Contact"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    {/* Hotel City */}
                    <div className="flex-1">
                        <label htmlFor="city" className="text-gray-600">Hotel City</label>
                        <input
                            type="text" 
                            id="city" 
                            name="city"
                            placeholder="Enter Hotel City"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Hotel Location */}
                    <div className="flex-1">
                        <label htmlFor="location" className="text-gray-600">Hotel Location</label>
                        <input
                            type="text" 
                            id="location" 
                            name="location"
                            placeholder="Enter Hotel Location (E.g. Panchgani Road)"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    
                  
                </div>


               
                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    {/* Hotel Distance */}
                    <div className="flex-1">
                        <label htmlFor="distance" className="text-gray-600">Hotel Distance</label>
                        <input
                            type="text" 
                            id="distance" 
                            name="distance"
                            placeholder="Enter Hotel Distance (e.g. 2 km from market)"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>


                    {/* Hotel Ratings */}
                    <div className="flex-1">
                        <label htmlFor="rating" className="text-gray-600">Hotel Rating</label>
                        <input
                            type="text" 
                            id="rating" 
                            name="rating"
                            placeholder="Enter Hotel Rating"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                     {/* Hotel latitude */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="latitude" className="text-gray-600">Latitude</label>
                        <input
                            type="text" 
                            id="latitude" 
                            name="latitude"
                            placeholder="Enter Latitude"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Longitude */}
                    <div className="flex-1">
                         <label htmlFor="longitude" className="text-gray-600">Longitude</label>
                        <input
                            type="text" 
                            id="longitude" 
                            name="longitude"
                            placeholder="Enter Longitude"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                </div>


                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    {/* Hotel Type */}
                    <div className="flex-1">
                        <label htmlFor="hotelType" className="text-gray-600">Hotel Type</label>
                        <Select
                        name="hotelType"
                        options={hotel_type}
                        className="basic-select"
                        classNamePrefix="select"
                        closeMenuOnSelect={true}
                        onChange={(selected) => {
                            const selectedType = selected?.value;
                            setHotelData(prev => ({
                            ...prev,
                            hotelType: selectedType,
                            isEntireProperty: selectedType === 'Villa' || selectedType === 'Homestay'
                            }));
                        }}
                        value={hotel_type.find(option => option.value === hotelData.hotelType)}
                        />
                    </div>

                    {/* isEntireProperty */}
                    <div className="flex-1 flex items-center mt-4 sm:mt-0">
                        <input
                        type="checkbox"
                        id="isEntireProperty"
                        name="isEntireProperty"
                        checked={hotelData.isEntireProperty || false}
                        onChange={(e) => {
                            setHotelData(prev => ({
                            ...prev,
                            isEntireProperty: e.target.checked
                            }));
                        }}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="isEntireProperty" className="text-gray-600">
                        Is Entire Property
                        </label>
                    </div>
                </div>


                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                     {/* Hotel Check-In */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="checkIn" className="text-gray-600">Check-In</label>
                        <input
                            type="text" 
                            id="checkIn" 
                            name="checkIn"
                            placeholder="Enter Check-In"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                
                    {/* Hotel Check-Out */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="checkOut" className="text-gray-600">Check-Out</label>
                        <input
                            type="text" 
                            id="checkOut" 
                            name="checkOut"
                            placeholder="Enter Check-Out"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                   
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    {/* Hotel available dates */}
                    <div className="flex-1 sm:mt-0" ref={calendarRef}>
                        <div className="flex gap-2">
                           <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="border border-gray-300 px-4 py-2 rounded-md"
                            >
                            {`${format(state[0].startDate, 'MMM d, yyyy')} - ${format(state[0].endDate, 'MMM d, yyyy')}`}
                            </button>
                        </div>

                        {/* Calendar dropdown */}
                        {open && (
                            <div className="absolute z-10  max-w-sm w-[95vw]">
                            <DateRange
                                editableDateInputs={true}
                                // onChange={item => setState([item.selection])}
                                onChange={(item) => {
                                    const selection = item.selection;
                                    setState([selection]);
                                    setHotelData((prev) => ({
                                        ...prev,
                                        availableDates: [
                                        {
                                            from: selection.startDate,
                                            to: selection.endDate,
                                        },
                                        ],
                                    }));
                                }}
                                moveRangeOnFirstSelection={false}
                                ranges={state}
                                months={2}
                                direction="horizontal"
                            />
                            </div>
                        )}
                    </div>

                     {/* Hotel maxAdults */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="maxAdults" className="text-gray-600">Max Adult</label>
                        <input
                            type="text" 
                            id="maxAdults" 
                            name="maxAdults"
                            placeholder="Enter Max Adult Count"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                     {/* Hotel BasePrice */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="entirePropertyBasePrice" className="text-gray-600">Base Price</label>
                        <input
                            type="text" 
                            id="entirePropertyBasePrice" 
                            name="entirePropertyBasePrice"
                            placeholder="Enter Base Price"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                
                    {/* Hotel Price */}
                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="entirePropertyPrice" className="text-gray-600">Price</label>
                        <input
                            type="text" 
                            id="entirePropertyPrice" 
                            name="entirePropertyPrice"
                            placeholder="Enter price"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                   
                </div>


                
                
            </div>

            {/* Hotel Description */}
            <div className='mt-4'>
                <label className="text-gray-600">Hotel Description (Title + Detail)</label>
                {descriptionList.map((item, index) => (
                <div key={index} className="flex gap-4 mb-3">
                    <input
                    type="text"
                    placeholder="Title (e.g. Room Service)"
                    value={item.title}
                    onChange={(e) => handleDescriptionChange(index, 'title', e.target.value)}
                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                    type="text"
                    placeholder="Description (e.g. Available 24/7)"
                    value={item.desc}
                    onChange={(e) => handleDescriptionChange(index, 'desc', e.target.value)}
                    className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {descriptionList.length > 1 && <CiCircleRemove onClick={() => removeDescription(index)}
                    className=" h-10 w-10 text-red-500 hover:underline cursor-pointer"/>}
                    
                </div>
                ))}

                <button
                type="button"
                onClick={addDescriptionField}
                className="mt-2 mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                >
                Add Description
                </button>
            </div>

            {/* Hotel Rule */}
            <div className='mt-4'>
                <label className="text-gray-600">Hotel Rules (Title + Detail)</label>
                {ruleList.map((item, index) => (
                <div key={index} className="flex gap-4 mb-3">
                    <input
                    type="text"
                    placeholder="Title (e.g. Non-Refundable)"
                    value={item.title}
                    onChange={(e) => handleRuleChange(index, 'title', e.target.value)}
                    className="w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                    type="text"
                    placeholder="Description (e.g. Refund is not applicable for this booking)"
                    value={item.desc}
                    onChange={(e) => handleRuleChange(index, 'desc', e.target.value)}
                    className="w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {ruleList.length > 1 && <CiCircleRemove onClick={() => removeRule(index)}
                    className=" h-10 w-10 text-red-500 hover:underline cursor-pointer"/>}
                    
                </div>
                ))}

                <button
                type="button"
                onClick={addRuleField}
                className="mt-2 mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
                >
                Add Rule
                </button>
            </div>



            {/* Hotel Amenities */}
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
                    setHotelData(prev => ({ ...prev, amenities: selectedValues }));
                    }}
                />
            </div>

              {/* Room Type - remove from here and add in rooms page */}
                    {/* <div className="flex-1">
                        <label htmlFor="roomsType" className="text-gray-600">Room Types</label>
                        <Select
                            isMulti
                            name="roomsType"
                            options={room_types}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            onChange={(selected) => {
                                const selectedValues = selected.map(item => item.value);
                                setHotelData(prev => ({ ...prev, roomsType: selectedValues })); 
                            }}
                        />
                    </div> */}
            

            {/* Upload area for images */}
            <label htmlFor="images" className="text-gray-600 mt-10">Add Hotel Images</label>
            <input className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" id="images" name="images" type="file" multiple accept="image/*" onChange={handleFileChange} />

            <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
                {images.map((image, index) => (
                        <label key={index} htmlFor={index}>
                            <img
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index}`}
                            className="max-h-30 cursor-pointer opacity-80"
                            />
                        </label>
                    ))
                }

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
        
    );
};

export default AddHotel;
