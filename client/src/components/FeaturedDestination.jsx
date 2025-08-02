import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoLocationOutline } from 'react-icons/io5';
import { BsStars } from 'react-icons/bs';
import Title from './Title';
// import { Pagination } from '@/components/ui/pagination'; // ShadCN pagination

const ITEMS_PER_PAGE = 10;

const FeaturedDestination = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

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

  const totalPages = Math.ceil(hotels.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHotels = hotels.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <div className="bg-slate-50 py-10 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-12">
      <Title
        title="Looking for the perfect stay?"
        subTitle="Discover comfort, convenience, and great deals — all in one place."
      />

      <div className="grid grid-cols-1 px-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        {paginatedHotels.map((hotel) => (
          <Link
            key={hotel._id}
            to={`/hotels/${hotel._id}`}
            className="bg-white rounded-2xl overflow-hidden shadow-md relative flex flex-col"
          >
            <div className="relative">
              <img
                src={hotel.images[0]}
                alt={hotel.hotelName}
                className="w-full h-48 object-cover"
              />
            </div>

            <div className="p-4 space-y-2 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-sm">
                <span className="bg-blue-600 text-white font-semibold px-2 py-0.5 rounded">
                  {hotel.rating?.toFixed(1) || '4.0'}
                </span>
                <span className="text-gray-700 font-medium">
                  {hotel.rating && hotel.rating > 4.0 ? 'Excellent' : 'Very Good'}
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-800">{hotel.hotelName}</h2>

              <p className="text-sm text-gray-600 flex items-center gap-1 mb-0">
                <IoLocationOutline />
                {hotel.location || 'Mahabaleshwar'} | {hotel.distance}
              </p>

              <div className="text-right ml-auto">
                <div className="relative inline-block text-black font-bold text-m">
                  <span className="relative z-10">
                    ₹
                    {hotel.hotelType === 'Hotel'
                      ? hotel.rooms[0]?.BasePrice
                      : hotel.entirePropertyBasePrice || 'N/A'}
                  </span>
                  <span className="absolute left-0 top-1/2 w-full h-[1.5px] bg-red-500 transform -rotate-[10deg] origin-center"></span>
                </div>
                <p className="text-lg font-bold text-gray-800">
                  ₹
                  {hotel.hotelType === 'Hotel'
                    ? hotel.rooms[0]?.pricePerNight
                    : hotel.entirePropertyPrice || 'N/A'}
                </p>
                <p className="text-xs text-gray-500">+ ₹ 0 taxes & fees Per Night</p>
              </div>

              <div className="mt-3 text-sm bg-[#f7f7f7] text-[#6F708B] px-3 py-2 rounded-md flex items-center gap-2">
                <BsStars className="h-5 w-5 text-blue-500" />
                <span>
                  {hotel.title} , Breathtaking valley views, private sunrise trekking tours,
                  infinity pool experience
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

        {/* Pagination */}
        <div className="flex justify-center mt-10">
            <nav className="flex items-center gap-2" aria-label="Pagination">
                <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                ←
                </button>

                {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                    <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-9 w-9 flex items-center justify-center rounded-md border text-sm font-medium ${
                        currentPage === pageNum
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                    }`}
                    >
                    {pageNum}
                    </button>
                );
                })}

                <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-9 w-9 flex items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                →
                </button>
            </nav>
        </div>

    </div>
  );
};

export default FeaturedDestination;
