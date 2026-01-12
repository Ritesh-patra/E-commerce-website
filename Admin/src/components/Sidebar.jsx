import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'

function Sidebar() {
  return (
    <div className='w-[18%] min-h-screen border-r text-base py-4 sm:pl-4 flex flex-col gap-6'>
      <NavLink to="/add" className="border-y  px-4 py-2 flex items-center md:justify-normal justify-center gap-4 transition">
        <img src={assets.add_icon} className='w-6 ' alt="" />
        <p className='md:block hidden'>Add Items</p>
      </NavLink>
      <NavLink to="/list" className="border-y  px-4 py-2 flex items-center md:justify-normal justify-center gap-4 transition">
        <img src={assets.order_icon} alt="" className='w-6'/>
        <p className='md:block hidden px-2'>List Items</p>
      </NavLink>
      <NavLink to="/order" className="border-y  px-4 py-2 flex items-center md:justify-normal justify-center gap-4 transition">
        <img src={assets.order_icon} alt="" className='w-6'/>
        <p className='md:block hidden'>Orders</p>
      </NavLink>
    </div>
  )
}

export default Sidebar
