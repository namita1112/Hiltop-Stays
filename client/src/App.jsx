import React from 'react'
import Navbar from './components/navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
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
        </Routes>
      </div>
    </div>
  )
}

export default App
