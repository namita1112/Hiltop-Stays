import React, { useState } from "react";
import axios from "axios";
import Title from "../../components/Title";
import Select from 'react-select';

const AddHotel = () => {
    const [hotelData, setHotelData] = useState({
        hotelName: "",
        title: "",
        description: "",
        address: "",
        contact: "",
        city: "",
        owner: "",
        ownerContact: "",
        rating: "",
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

    const [selectedAmenity, setSelectedAmenities] = useState(null);
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


    const handleAddAmenity = (amenity) => {
        setHotelData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenity]
        }));
    };

    const handleAddRoomType = (room) => {
        setHotelData((prev) => ({
        ...prev,
        roomsType: [...prev.roomsType, room]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in hotelData) {
        if (key === "amenities" || key === "roomsType") {
            formData.append(key, JSON.stringify(hotelData[key]));
        } else {
            formData.append(key, hotelData[key]);
        }
        }

        images.forEach((img) => {
            formData.append("images", img);
        });

        try {
            const res = await axios.post("http://localhost:5000/api/hotels", formData, {
                headers: {
                "Content-Type": "multipart/form-data",
                },
            });
            alert("Hotel added successfully!");
            console.log(res.data);
            } catch (err) {
            console.error("Error adding hotel:", err);
            alert("Failed to add hotel.");
            }
        };

    return (
        <form>
            <Title font="outfit" title="Add Hotel" subTitle="Fill in the details carefully and room details, amenities to enhance the user booking experience"/>
            <div className="w-full flex flex-col sm:gap-4 mt-4">
                <div className="flex flex-col sm:flex-row sm:gap-4">
                    <div className="flex-1">
                        <label htmlFor="hotelName" className="text-gray-600">Hotel Name</label>
                        <input
                            className="form-control w-full"
                            type="text"
                            id="hotelName"
                            name="hotelName"
                            placeholder="Hotel Name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="hotelTitle" className="text-gray-600">Hotel Title</label>
                        <input
                            className="form-control w-full"
                            type="text"
                            id="hotelTitle"
                            name="hotelTitle"
                            placeholder="Hotel Title"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    <div className="flex-1">
                        <label htmlFor="hotelAddress" className="text-gray-600">Hotel Address</label>
                        <input
                            className="form-control w-full"
                            type="text"
                            id="hotelAddress"
                            name="hotelAddress"
                            placeholder="Hotel Address"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="hotelContact" className="text-gray-600">Contact</label>
                        <input
                            className="form-control w-full"
                            type="text"
                            id="hotelContact"
                            name="hotelContact"
                            placeholder="+91-8097809705"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    <div className="flex-1">
                        <label htmlFor="hotelOwner" className="text-gray-600">Hotel Owner Name</label>
                        <input
                            className="form-control w-full"
                            type="text"
                            id="hotelOwner"
                            name="hotelOwner"
                            placeholder="Hotel Owner"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="hotelOwnerContact" className="text-gray-600">Hotel Owner Contact</label>
                        <input
                            className="form-control w-full"
                            type="text"
                            id="hotelOwnerContact"
                            name="hotelOwnerContact"
                            placeholder="Hotel Owner Contact"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-4 mt-2">
                    <div className="flex-1">
                        <label htmlFor="hotelCity" className="text-gray-600">Hotel City</label>
                        <input
                            className="form-control w-full"
                            type="text"
                            id="hotelCity"
                            name="hotelCity"
                            placeholder="Eg. Mahabaleshwar"
                            onChange={handleChange}
                        />
                    </div>

                    

                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="hotelAmenities" className="text-gray-600">Hotel Amenities</label>
                        <Select
                            isMulti
                            name="hotelAmenities"
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
                        <label htmlFor="hotelRoomTypes" className="text-gray-600">Room Types</label>
                        <Select
                            isMulti
                            name="hotelRoomTypes"
                            options={room_types}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            closeMenuOnSelect={false}
                            onChange={(selected) => {
                            const selectedValues = selected.map(item => item.value);
                            setHotelData(prev => ({ ...prev, room_types: selectedValues }));
                            }}
                        />
                    </div>

                    

                    <div className="flex-1 sm:mt-0">
                        <label htmlFor="hotelOwnerContact" className="text-gray-600">Hotel Amenities</label>
                        {/* <MultiSelect value={selectedAmenity} onChange={(e) => setSelectedAmenities(e.value)} options={amenities} optionLabel="name" display="chip" 
                            placeholder="Select Amenities" className="form-control w-full md:w-40rem" /> */}
                    </div>
                </div>
                
            </div>
            {/* Upload area for images */}
            <label htmlFor="hotelImages" className="text-gray-600 mt-10">Add Hotel Images</label>
            <input className="form-control" id="hotelImages" type="file" multiple accept="image/*" onChange={handleFileChange} />

            <div className="grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap">
                {images.map((image, index) => (
                    <label htmlFor={index}>
                        <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index}`}
                        className="max-h-30 cursor-pointer opacity-80"
                    />
                    </label>
                    // <div key={index} className="relative w-32 h-32 overflow-hidden border rounded shadow">
                            
                    // </div>
                ))}
            </div>
        </form>
        // <div className="p-4">
        //   <h2 className="text-xl font-bold mb-4">Add New Hotel</h2>
        //   <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        //     <input type="text" name="hotelName" placeholder="Hotel Name" onChange={handleChange} />
        //     <input type="text" name="title" placeholder="Title" onChange={handleChange} />
        //     <textarea name="description" placeholder="Description" onChange={handleChange} />
        //     <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        //     <input type="text" name="contact" placeholder="Hotel Contact" onChange={handleChange} />
        //     <input type="text" name="city" placeholder="City" onChange={handleChange} />
        //     <input type="text" name="owner" placeholder="Owner Name" onChange={handleChange} />
        //     <input type="text" name="ownerContact" placeholder="Owner Contact" onChange={handleChange} />
        //     <input type="number" name="rating" placeholder="Rating (1-5)" onChange={handleChange} />

        //     <input type="file" multiple accept="image/*" onChange={handleFileChange} />

        //     {/* Example Static Amenity & RoomType Entry for Testing */}
        //     <button type="button" onClick={() => handleAddAmenity("Free WiFi")}>Add Amenity: Free WiFi</button>
        //     <button type="button" onClick={() => handleAddRoomType({ type: "Deluxe", price: 2000 })}>Add Room: Deluxe</button>

        //     <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Submit</button>
        //   </form>
        // </div>
    );
};

export default AddHotel;
