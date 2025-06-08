import React, { useEffect, useState } from 'react'
import axios from "axios";
import Title from "../../components/Title";
import Select from 'react-select';
import { CiCircleRemove } from "react-icons/ci";
const AddHotel = () => {
    useEffect(() => {
        console.log("VITE_BACKEND_URL :", import.meta.env.VITE_BACKEND_URL);
    }, []);
    const [isLoading, setIsLoading] = useState(false);
    const [hotelData, setHotelData] = useState({
        hotelName: "",
        title: "",
        description: [],
        address: "",
        contact: "+91-8097809705",
        city: "",
        owner: "",
        ownerContact: "",
        rating: "",
        latitude: "",
        longitude: "",
        amenities: [], // array of strings
        roomsType: []  // array of objects like [{type: "Deluxe", price: 3000}]
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setHotelData({ ...hotelData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };
    const amenities = [
        { label: 'Room Services', value: 'Room Services' },
        { label: 'Mountain View', value: 'Mountain View' },
        { label: 'Pool Access', value: 'Pool Access' },
        { label: 'Free WiFi', value: 'Free WiFi' },
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("hotelName", hotelData.hotelName);
        formData.append("title", hotelData.title);
        formData.append("description", JSON.stringify(descriptionList));
        formData.append("address", hotelData.address);
        formData.append("contact", hotelData.contact);
        formData.append("city", hotelData.city);
        formData.append("owner", hotelData.owner);
        formData.append("ownerContact", hotelData.ownerContact);
        formData.append("rating", hotelData.rating);
        formData.append("latitude", hotelData.latitude);
        formData.append("longitude", hotelData.longitude);
        formData.append("roomsType", JSON.stringify(hotelData.roomsType));
        formData.append("amenities", JSON.stringify(hotelData.amenities));

        // Append images once
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }
        console.log(typeof descriptionList);

        for (let [key, val] of formData.entries()) {
            console.log( typeof val);
        }

        try {
            console.log("VITE_BACKEND_URL :",`${import.meta.env.VITE_BACKEND_URL}`);
            const BASE = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");
            // const res = await axios.post(`https://api.hiltopstay.com/api/hotels`, formData, {
            // const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}api/hotels`, formData, {
            const res = await axios.post(`${BASE}/api/hotels`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Hotel added successfully!");
            console.log(res.data);
            window.location.reload();
        } catch (err) {
            console.error("Error adding hotel:", err);
            alert("Failed to add hotel.");
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <form onSubmit={handleSubmit}>
            <Title font="outfit" title="Add Hotel" subTitle="Fill in the details carefully and room details, amenities to enhance the user booking experience"/>
            <div className="w-full flex flex-col sm:gap-4 mt-4">
                <div className="flex flex-col sm:flex-row sm:gap-4">
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
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    <div className="flex-1">
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
                    </div>

                    

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
                </div>
                
                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
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

                    

                    <div className="flex-1 sm:mt-0">
                       
                    </div>
                </div>

                
                
            </div>
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
