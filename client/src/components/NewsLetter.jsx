import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Title from './Title';
const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center max-w-5xl lg:w-full rounded-2xl px-4 py-12 md:py-16 mx-2 lg:mx-auto my-10 bg-gray-900 text-white">
       <Title title="Stay Inspired" subTitle="Join our newsletter and be the first to discover new hotels, exclusive offers, and travel inspiration."/>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <input type="text" className="bg-white/10 px-4 py-2.5 border border-white/20 rounded outline-none max-w-66 w-full" placeholder="Enter your email" />
            <button className="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded active:scale-95 transition-all">Subscribe
                 <FaArrowRightLong className='w-3.5 group-hover:translate-x-2 transition-all'/>
                {/* <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" /></svg> */}
            </button>
        </div>
        <p className="text-gray-500 mt-6 text-xs text-center">By subscribing, you agree to our Privacy Policy and consent to receive updates.</p>
    </div>
  )
}

export default NewsLetter
