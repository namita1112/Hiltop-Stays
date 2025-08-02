import axios from "axios";
// amount = 200;
import { useEffect } from "react";
const RazorpayComponent = ({ amount, validateBeforePay  }) => {
    const handlePayment = async () => {
        if (validateBeforePay && !validateBeforePay()) {
            return;
        }

        try {
            // Create order from backend
            const API_URL = import.meta.env.VITE_ENV_MODE === "local"
                ? "http://localhost:5000/api/payment/create-order"
                : "https://api.hiltopstay.com/api/payment/create-order";
            
            const { data: order } = await axios.post(API_URL, {
                amount: amount, // Amount in rupees
            });

            const options = {
                key: "rzp_live_zhoARdDxHXfGk7", // 🔑 Razorpay Key
                amount: order.amount,
                currency: order.currency,
                name: "Hiltop Stays",
                description: "Hotel Booking",
                order_id: order.id,
                handler: async function (response) {
                    // ✅ Payment successful
                    alert("Payment successful: " + response.razorpay_payment_id + 
                        ". Booking details will be sent to your mobile and email.");

                    // Now call backend to mark booking as paid

                    const ORDER_API_URL = import.meta.env.VITE_ENV_MODE === "local"
                        ? `http://localhost:5000/api/bookings/confirm/${order.receipt}`
                        : `https://api.hiltopstay.com/api/bookings/confirm/${order.receipt}`;

                    await axios.post(ORDER_API_URL, {
                        payment_id: response.razorpay_payment_id,
                        guestDetails: formData, // Ensure this is passed via props
                        bookingDetails: {
                            hotelId: order.receipt,
                            amountPaid: order.amount,
                            totalPrice:totalPrice,
                            basePrice:basePrice,
                            discountPrice:discountPrice,
                            // priceAfterDiscount: basePrice - discountPrice,
                            remainingPrice:totalPrice - order.amount,
                            nights: numberOfNights,
                            roomCount: rooms,
                            checkInDate: startDate,
                            checkOutDate: endDate,
                            hotelName: hotel.hotelName,
                            address: hotel.address,
                        }
                    });
                },
                prefill: {
                    name: "Namita",
                    email: "namita@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3A80E9",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Payment Error:", err?.response?.data || err.message);
        }
    };


    return (
        <div className="mt-6 flex justify-end">
            <button
                onClick={handlePayment}
                className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow hover:opacity-90 transition-opacity w-full sm:w-auto duration-200 cursor-pointer"
                >
                PAY ₹ {amount} NOW
            </button>
        </div>
      

    );
};

export default RazorpayComponent;
