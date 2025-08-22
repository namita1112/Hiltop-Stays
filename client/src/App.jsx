import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllHotels from './pages/AllHotels';
import HotelDetails from './pages/HotelDetails';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddHotel from './pages/hotelOwner/AddHotel';
import ListHotel from './pages/hotelOwner/ListHotel';
import BookingReview from './pages/BookingReview';
import PaymentPage from './pages/PaymentPage';
import SearchedHotels from './pages/SearchedHotels';
import AddRoom from './pages/hotelOwner/AddRoom';
import HotelDetailView from './pages/HotelDetailView';
import About from './pages/about';
// import HotelReg from './components/HotelReg';
const App = () => {
  const location = useLocation();
  const isOwnerPath = location.pathname.includes("owner");
  const isPaymentPage = location.pathname === "/payment";

  return (
    <div>
      { !isOwnerPath && !isPaymentPage && <Navbar /> }

      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/hotels' element={<AllHotels />} />
          <Route path='/hotelsSearch' element={<SearchedHotels />} />
          <Route path='/about' element={<About />} />
          {/* <Route path='/hotels/:id' element={<HotelDetails />} /> */}
          <Route path='/hotels/:id' element={<HotelDetailView />} />
          <Route path='/hotels/booking/:id' element={<BookingReview />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-hotel' element={<AddHotel />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='hotels' element={<ListHotel />} />
          </Route>
        </Routes>
      </div>

      { !isOwnerPath && !isPaymentPage && <Footer /> }
    </div>
  );
};


export default App
