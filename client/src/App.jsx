import React from 'react'
import Navbar from './components/navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import AllHotels from './pages/AllHotels';
import HotelDetails from './pages/HotelDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Layout from './pages/hotelOwner/Layout';
import Dashboard from './pages/hotelOwner/Dashboard';
import AddHotel from './pages/hotelOwner/AddHotel';
import ListHotel from './pages/hotelOwner/ListHotel';
// import HotelReg from './components/HotelReg';
const App = () => {
  // this is added to get hotel owner path.
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div>
      {/* !isOwnerPath && is used for to get Navbar only for who is not owner of the hotel. */}
      { !isOwnerPath && <Navbar />} 
      {/* <HotelReg/> */}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/hotels' element={<AllHotels/>} />
          <Route path='/hotels/:id' element={<HotelDetails/>} />
          <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='add-hotel' element={<AddHotel/>}/>
            <Route path='hotels' element={<ListHotel/>}/>
          </Route>
        </Routes>
      </div>
      { !isOwnerPath && <Footer />} 
      
    </div>
  )
}

export default App
