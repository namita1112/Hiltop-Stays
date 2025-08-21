import React, { useEffect, useState, useRef } from 'react';
import GuestDetails from '../components/GuestDetails';
import PaymentOptions from '../components/PaymentOptions';
import { useNavigate } from 'react-router-dom';
import RazorpayComponent from '../components/RazorpayComponent';
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { useMemo } from "react";

const BookingReview = () => {
  const guestDetailsRef = useRef(null);
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const priceRef = useRef(null);
  const handleScrollToPrice = () => {
    priceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const searchData = location.state?.searchData;
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const startDate = new Date(searchData?.date?.[0]?.startDate || today);
  const prevDate = new Date();
  prevDate.setDate(startDate.getDate() - 2);
  const endDate = new Date(searchData?.date?.[0]?.endDate || tomorrow);

  const adults = searchData?.options?.adult > 0 ? searchData.options.adult : 1;
  const children = searchData?.options?.children || 0;
  const rooms = searchData?.options?.room || 1;

  const numberOfNights = Math.ceil(
    (endDate - startDate) / (1000 * 60 * 60 * 24)
  );
  const basePrice = useMemo(() => {
    if (!hotel) return 0;

    if (hotel.hotelType === 'Hotel') {
      if (hotel.rooms?.[0]?.BasePrice) {
        return rooms * hotel.rooms[0].BasePrice * numberOfNights;
      }
      return 0;
    } else {
      return hotel.entirePropertyBasePrice ? hotel.entirePropertyBasePrice * numberOfNights : 0;
    }
  }, [hotel, rooms, numberOfNights]);


  const totalPrice = useMemo(() => {
    if (!hotel) return 0;

    if (hotel.hotelType === "Hotel") {
      if (hotel.rooms?.[0]?.pricePerNight) {
        return rooms * hotel.rooms[0].pricePerNight * numberOfNights;
      }
      return 0;
    } else {
      return hotel.entirePropertyPrice ? hotel.entirePropertyPrice * numberOfNights : 0;
    }
  }, [hotel, rooms, numberOfNights]);
  const [selectedPaymentType, setSelectedPaymentType] = useState("full");
  const [payableAmount, setPayableAmount] = useState(totalPrice);

  const [guestFormData, setGuestFormData] = useState({
    title: 'Mr',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gstEnabled: false
  });
  const [guestFormErrors, setGuestFormErrors] = useState({});

  const validateGuestForm = () => {
    let errors = {};
    if (!guestFormData.firstName.trim()) errors.firstName = "This field is required.";
    if (!guestFormData.lastName.trim()) errors.lastName = "This field is required.";
    if (!guestFormData.email.trim()) errors.email = "This field is required.";
    if (!guestFormData.phone.trim()) errors.phone = "This field is required.";

    setGuestFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      guestDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
      return false;
    }

    return true;
    // return Object.keys(errors).length === 0;
  };

  
  // console.log(searchData);
  
  // console.log(startDate, endDate);

  const formatDate = (date) =>
  date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const discountPrice = useMemo(() => {
    if (!hotel) return 0;
    return basePrice - totalPrice;
  }, [basePrice, totalPrice]);

  useEffect(() => {
    if (selectedPaymentType === "full") {
      setPayableAmount(totalPrice);
    } else {
      setPayableAmount(Math.ceil((totalPrice * 20)/100));
    }
  }, [totalPrice, selectedPaymentType]);

  

  useEffect(() => {
    const fetchHotelById = async () => {
        try {
            const API_URL =
                import.meta.env.VITE_ENV_MODE === "local"
                    ? `http://localhost:5000/api/hotels/${id}`
                    : `https://api.hiltopstay.com/api/hotels/${id}` ;
            
            const res = await axios.get(API_URL);
            if (res?.data) {
              setHotel(res.data);
            }
            // const hotel = await axios.get(API_URL);
            // hotel && setHotel(hotel.data);
            // setHotel(hotel.data);
        } catch (err) {
            console.error("Error fetching hotels:", err);
        }
    };

    fetchHotelById();
  }, [id]);

  if (!hotel) return <div>Loading...</div>;

  return (
    <div className="pt-25 pr-2 pl-2 bg-gray-100 min-h-screen">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-4">Review your Booking</h2>
      {/* Mobile Total Price Header */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t px-4 py-3 flex items-center justify-between shadow-md">
        <p className="font-semibold text-sm">
          Total Price: <span className="text-black font-bold">₹ {totalPrice.toLocaleString("en-IN")}</span>
        </p>
        <button
          onClick={handleScrollToPrice}
          className="text-blue-600 text-sm font-semibold underline"
        >
          View Details
        </button>
      </div>
      {/* Card */}
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row justify-between">
        {/* Left section */}
        <div className="w-full lg:w-[65%]">
          {/* Hotel Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold">{hotel.hotelName}</h3>
            <span className="text-sm text-gray-600">★ ★ ★ ☆ Couple Friendly</span>
            <p className="text-sm text-gray-500">
              {hotel.address}
            </p>
          </div>

          {/* Check-in/out Info */}
          <div className="grid grid-cols-2 sm:grid-cols-4 text-sm border-gray-300 border-t border-b py-3 mb-4">
            <div>
              <p className="text-gray-500">CHECK IN</p>
              <p className="font-medium">   {formatDate(startDate)}</p>
              <p>{hotel?.checkIn || "11"}</p>
            </div>
            <div>
              <p className="text-gray-500">CHECK OUT</p>
              <p className="font-medium">{formatDate(endDate)}</p>
              <p>{hotel?.checkOut || "1"}</p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-500">{numberOfNights} {numberOfNights === 1 ? "Night" : "Nights"} | {" "}   {adults} {adults === 1 ? "Adult" : "Adults"} | {" "}  {rooms} {rooms === 1 ? "Room" : "Rooms"}</p>
            </div>
          </div>

          {/* Room Details */}
          <div className="text-sm mb-8">
            {/* <h4 className="font-semibold">Standard Non Ac Room</h4>
            <p>2 Adults</p> */}
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              <li>Room With Free Cancellation</li>
              <li>No meals included</li>
            </ul>

            <div className="mt-3 bg-green-50 border-l-4 border-green-400 p-3 text-green-700 text-sm">
              <div>
                  {hotel?.hotelRule?.map((rule) => (
                    <div key={rule._id} className="mb-2">
                      {/* <p className="font-semibold">{rule.title}</p> */}
                      <p className="text-gray-600">{rule.desc}</p>
                    </div>
                  ))}
                {/* <p className="font-semibold">{hotel?.hotelRule?.title}</p> */}
                {/* <p>{hotel?.hotelRule?.desc}</p> */}
              </div>
              {/* <p>
                ✅ Free Cancellation before <strong>{formatDate(prevDate)}</strong>. <a href="#" className="text-blue-600 underline">Cancellation policy details</a>
              </p>
              <p>Book with ₹0 Payment. Pay before 18 Aug, 11:59 PM IST to avoid auto-cancellation.</p> */}
            </div>
          </div>
          {/* Important Info */}
          <div className="text-sm mb-4 border border-gray-300 rounded-md shadow p-3">
            <h3 className="font-semibold">Important information</h3>
            <ul className="list-disc ml-5 mt-2 text-gray-600">
              {hotel?.hotelRule?.map((rule) => (
                <li key={rule._id}>{rule.title}</li>
              ))}
            </ul>
          </div>
           {/* Guest Details */}
            <GuestDetails
                ref={guestDetailsRef}
                formData={guestFormData}
                setFormData={setGuestFormData}
                errors={guestFormErrors}
            
            />

           {/* Payment Options */}
            <PaymentOptions 
              totalPrice={totalPrice}
              selectedPaymentType={selectedPaymentType}
              setSelectedPaymentType={setSelectedPaymentType}
            />

           {/* <PaymentOptions/> */}

            {/* Pay Now Button */}
            <RazorpayComponent
              amount={payableAmount}
              validateBeforePay={validateGuestForm}
              formData={guestFormData}
              numberOfNights={numberOfNights}
              rooms={rooms}
              startDate={startDate}
              endDate={endDate}
              hotel={hotel}
              totalPrice={totalPrice}
              basePrice={basePrice}
              discountPrice={discountPrice}

            />
           {/* <RazorpayComponent amount={payableAmount} validateBeforePay={validateGuestForm} /> */}
            {/* <div className="mt-6 flex justify-end">
              <button
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow hover:opacity-90 transition-opacity w-full sm:w-auto duration-200 cursor-pointer"
                // className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold py-3 px-6 rounded-md shadow hover:opacity-90 transition-opacity sm:w-auto duration-200"
               onClick={() => navigate("/payment")}
              >
                PAY NOW
              </button>
            </div> */}

          
        </div>

        {/* Right section - Price Breakup */}
        <div className="w-full lg:w-[30%] mt-6 lg:mt-0">
          <div ref={priceRef} className="bg-white border border-gray-300 rounded-md shadow p-4">
            <h4 className="font-semibold text-lg mb-2">Price Breakup</h4>
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Base Price</span>
                <span>₹ {basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-green-600 font-medium">
                <span>Total Discount</span>
                <span>- ₹ {discountPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Price after Discount</span>
                <span>₹ {totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Service Fees</span>
                <span>₹ 0</span>
              </div>
              <hr className='border-gray-400' />
              <div className="flex justify-between font-semibold text-black">
                <span>Total Amount to be paid</span>
                <span>₹ {totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Coupon Code Section */}
          {/* <div className="mt-4 bg-white border border-gray-300 rounded-md shadow p-4">
            <h4 className="font-semibold mb-2">Coupon Codes</h4>
            <div className="text-sm space-y-2">
              <div className="flex justify-between items-center border p-2 rounded-md border-blue-400 bg-blue-50">
                <span className="text-blue-700 font-medium">MMTDEAL</span>
                <span className="text-green-600 font-semibold">₹ 1,796</span>
              </div>
              <p className="text-xs text-gray-500">Congratulations! Discount of INR1796 Applied</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BookingReview;
