import React from 'react'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { MdDomainAdd } from "react-icons/md";
import { IoIosList } from "react-icons/io";
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    const sideBarIcons = [
        {name: "Dashboard", path: "/owner", icon:<MdOutlineDashboardCustomize />},
        {name: "Add Hotel", path: "/owner/add-hotel", icon:<MdDomainAdd />},
        {name: "All Hotels", path: "/owner/hotels", icon:<IoIosList />},
    ]
    return (
        <div className="md:w-64 w-16 border-r h-screen sticky top-0 text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
            {sideBarIcons.map((item, index)=>(
                <NavLink
                to={item.path}
                key={index}
                end="/owner"
                style={{ textDecoration: 'none' }}
                className={({ isActive }) =>
                    `flex items-center py-3 px-4 md:px-8 gap-3 ${
                    isActive
                        ? "border-r-4 md:border-r-[6px] bg-blue-600/10 border-blue-600 text-blue-600"
                        : "hover:bg-gray-100/90 border-white text-gray-700"
                    }`
                }
                >
                {item.icon}
                <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>


            ))}   
        </div>
    )
}

export default Sidebar
