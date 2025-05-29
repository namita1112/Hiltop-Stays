import React from 'react'
import Navbar from './components/navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllHotels from './pages/AllHotels';
import HotelDetails from './pages/HotelDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const App = () => {
  // this is added to get hotel owner path.
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {/* !isOwnerPath && is used for to get Navbar only for who is not owner of the hotel. */}
      { !isOwnerPath && <Navbar />} 
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/hotels' element={<AllHotels/>} />
          <Route path='/hotels/:id' element={<HotelDetails/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
