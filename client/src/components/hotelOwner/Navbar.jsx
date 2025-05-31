import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {

    const {openSignIn} = useClerk()
    const {user} = useUser()
    // const { signOut } = useClerk();
    return (
        <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white 
            transition-all duration-300'>
            <Link to='/'>
                <img src={assets.logo} alt='logo' className='h-10'/>
            </Link>
            <div className="hidden md:flex items-center gap-4">
                {/* <img src={assets.searchIcon} alt="search" className={`${isScrolled && "invert"} h-7 transition-all duration-500`}></img> */}
                
                {user ? 
                    (<UserButton>
                        <UserButton.MenuItems>
                            <UserButton.Action label="My Bookings" />
                        </UserButton.MenuItems>
                    </UserButton>)
                    :
                    (<button onClick={openSignIn} className="bg-black text-white px-8 py-2.5 rounded-full cursor-pointer ml-4 transition-all duration-500">
                        Login
                    </button>)
                }
                
            </div>
            {/* <UserButton/> */}
        </div>
    )
}

export default Navbar
