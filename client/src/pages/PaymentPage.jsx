import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCalendarDays, faHotel, faAngleUp, faAngleDown, faArrowLeft,
  faCreditCard,
  faLandmark,
  faWallet,
  faArrowRight,
  faClockRotateLeft,
  faMoneyBillWave, } from '@fortawesome/free-solid-svg-icons';
import QRCodeComponent from '../components/QRCodeComponent';
import UPIPaymentCard from '../components/UPIPaymentCard';
import CardPaymentForm from '../components/CardPaymentForm';
import RazorpayComponent from '../components/RazorpayComponent';

const PaymentPage = () => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const handleBack = () => setSelectedMethod('');
    return (

        <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                
                {/* Left - Payment Methods */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Hotel Details Card */}
                   <div className="bg-white rounded-lg shadow p-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                        {/* Left - Hotel Basic Info */}
                        <div>
                        <h2 className="text-lg font-bold text-blue-700">Shivanya Palace - A Purple Mansion</h2>
                        <p className="text-sm text-gray-600 mt-1 pb-2">
                            <FontAwesomeIcon icon={faCalendarDays} className="text-gray-400" /> Thu, 21 Aug ’25 → Fri, 22 Aug ’25 |
                            <FontAwesomeIcon icon={faBed} className="text-gray-400 ml-2" /> 1 Room | 2 Adults | 1 Night
                        </p>
                        <p className="text-xs text-green-600">
                            ✅ Free cancellation till 12:59 PM, 06 Aug 2025
                        </p>

                        <div className="mt-2 text-sm text-gray-700 border-t border-gray-300 pt-2">
                            <p className="font-medium">Namita Tare (Primary)</p>
                            <p className="text-xs text-gray-500">tare.namita27@gmail.com, +91-8779861687</p>
                        </div>
                        </div>

                        {/* Right - Toggle Button */}
                        <div className="mt-4 sm:mt-0">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-blue-600 font-medium focus:outline-none cursor-pointer flex items-center gap-1"
                            >
                                {isExpanded ? (
                                    <>
                                    Hide Details <FontAwesomeIcon icon={faAngleUp} />
                                    </>
                                ) : (
                                    <>
                                    View Details <FontAwesomeIcon icon={faAngleDown} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Expandable Section */}
                    {isExpanded && (
                        <div className="mt-4 border-t border-gray-200 pt-4 text-sm text-gray-700 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                            <p className="font-semibold">Thu, 21 Aug ’25</p>
                            <p className="text-xs text-gray-500">Check-In</p>
                            </div>
                            <div>
                            <p className="font-semibold">Fri, 22 Aug ’25</p>
                            <p className="text-xs text-gray-500">Check-Out</p>
                            </div>
                        </div>

                        <div className="border border-gray-400 rounded-lg p-3 bg-gray-50">
                            <p className="font-semibold mb-1">
                            <FontAwesomeIcon icon={faHotel} className="text-gray-400 mr-2" />
                            1x Shivanya Palace - A Purple Mansion
                            </p>
                            <p className="text-xs text-gray-500">Meals available at extra charges</p>
                        </div>

                        <div className="border border-gray-400 rounded-lg p-3 bg-gray-50">
                            <p className="font-semibold">Booking details will be sent to:</p>
                            <p className="text-xs mt-1">
                            Namita Tare (Primary) <br />
                            tare.namita27@gmail.com, +91-8779861687
                            </p>
                        </div>
                        </div>
                    )}
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <h2 className="text-xl mb-4 flex items-center gap-2">
                            {selectedMethod ? (
                                <span className="text-blue-400 cursor-pointer flex items-center gap-2" onClick={handleBack}>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    All Payment Options
                                </span>
                            ) : (
                               <span className="text-xl font-bold">Payment Options</span> 
                            )}
                        </h2>

                        <div className="divide-y border border-gray-300 rounded-lg overflow-hidden">
                            {/* UPI */}
                            {!selectedMethod && (
                                <>
                                    <div onClick={() => setSelectedMethod('upi')}
                                        className={`flex items-center justify-between border-gray-300 p-4 hover:bg-gray-50 cursor-pointer`}>
                                        <div className="flex items-center gap-3">
                                            <img className='h-10 w-10' src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750589564/icons8-bhim-64_vzwmjv.png"/>
                                            {/* <FontAwesomeIcon icon={faMoneyCheckAlt} className="text-orange-600 text-xl" /> */}
                                            <div >
                                            <p className="font-semibold">UPI Options</p>
                                            <p className="text-xs text-gray-500">Pay Directly From Your Bank Account</p>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon icon={faArrowRight} className="text-gray-400" />
                                    </div>

                                    {/* Credit & Debit Cards */}
                                    <div onClick={() => setSelectedMethod('card')} className="flex items-center justify-between border-gray-300 p-4 hover:bg-gray-50 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <img className='h-10 w-10' src="https://res.cloudinary.com/dytbju4xg/image/upload/v1750589564/atm-card_sczr19.png"/>
                                            {/* <FontAwesomeIcon icon={faCreditCard} className="text-blue-600 text-xl" /> */}
                                            <div>
                                            <p className="font-semibold">Credit & Debit Cards</p>
                                            <p className="text-xs text-gray-500">Visa, Mastercard, Amex, Rupay and more</p>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon icon={faArrowRight} className="text-gray-400" />
                                    </div>
                                </>
                            )}
                            {selectedMethod === 'upi' && <UPIPaymentCard />}
                            {selectedMethod === 'card' && <CardPaymentForm />}
                          
                        </div>
                    </div>
                </div>

                {/* Right - Summary & QR Code */}
                <div className="space-y-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <h4 className="font-semibold text-lg mb-2">Total Due</h4>
                    <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                        <span>Hotel Fare</span><span>₹ 5,600</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Taxes</span><span>₹ 1,013</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Discount</span><span className="text-green-600">- ₹ 2,356</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold">
                        <span>Total</span><span>₹ 4,257</span>
                    </div>
                    </div>
                </div>
                {!selectedMethod && (
                    <>
                    <RazorpayComponent amount={200} />
                    {/* <RazorpayComponent amount={totalAmount} /> */}
                    <QRCodeComponent/>
                    </>
                )} 

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
