import React, { useEffect, useState } from 'react';
import axios from "axios";
import Title from '../../components/Title';
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";

const ListHotel = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 10;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hotels`);
        // const res = await axios.get("http://localhost:5000/api/hotels"); 
        setHotels(res.data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      }
    };
    fetchHotels();
  }, []);

  // Pagination logic
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Title
        font='outfit'
        title='Hotels Listing'
        subTitle='View, Edit, or Manage all listed hotels. Keep the information up-to-date to provide the best experience for users.'
      />

      <p className="mt-2 font-medium text-lg">All Hotels</p>

      {/* Scrollable table with sticky header */}
      <div className="w-full max-w-full border border-gray-300 rounded-lg mt-3 overflow-y-auto max-h-80">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <td className="py-3 px-4 text-gray-800 font-medium">Hotel Name</td>
              <td className="py-3 px-4 text-gray-800 font-medium">City</td>
              <td className="py-3 px-4 text-gray-800 font-medium">Owner Name</td>
              <td className="py-3 px-4 text-gray-800 font-medium">Owner Contact</td>
              <td className="py-3 px-4 text-gray-800 font-medium text-center">Actions</td>
            </tr>
          </thead>
          <tbody className="text-sm">
            {currentHotels.map((item, index) => (
              <tr key={index}>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{item.hotelName}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{item.city}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{item.owner}</td>
                <td className="py-3 px-4 text-gray-700 border-t border-gray-300">{item.ownerContact}</td>
                <td className="py-3 px-4 border-t border-gray-300 text-center">
                  <div className="flex justify-center gap-4">
                    <MdOutlineEdit className="text-blue-500 cursor-pointer h-5 w-5" />
                    <MdDeleteOutline className="text-red-500 cursor-pointer h-5 w-5" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ListHotel;
