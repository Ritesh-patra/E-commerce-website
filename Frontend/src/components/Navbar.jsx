import React, { useContext, useState } from 'react'
import { assets } from '../assets/frontend_assets/assets.js'
import { Link, NavLink } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { BsCollection } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { LuContact } from "react-icons/lu";
import { BsInfoSquare } from "react-icons/bs";
import { ShopContext } from '../context/ShopContext.jsx';


function Navbar() {
    let [sidebar,setSidebar]=useState(false);


    let { showSearchBar, setShowSearchBar, cartItems, setToken, navigate } = useContext(ShopContext);
    // console.log(sidebar);
    return (
        <div className='flex justify-between items-center py-4 text-sm'> 
            <Link to='/'>
                <img src={assets.logo1} alt="" className='w-48 sm:w-56 hover:cursor-pointer'/>
            </Link>
            <div className='hidden sm:flex gap-6 items-center text-gray-700'>
                <NavLink to={"/"}  className="flex flex-col items-center gap-1">
                    <p>HOME</p>
                    <hr className='w-2/4 bg-gray-600 h-[1.5px] border-none hidden'/> 
                </NavLink>
                <NavLink to={"/collection"}  className="flex flex-col items-center gap-1">  
                    <p>COLLECCTION</p>
                    <hr className='w-2/4 bg-gray-600 h-[1.5px] border-none hidden'/>
                </NavLink>
                <NavLink to={"/about"}  className="flex flex-col items-center gap-1">
                    <p>ABOUT</p>
                    <hr className='w-2/4 bg-gray-600 h-[1.5px] border-none hidden'/>
                </NavLink>
                <NavLink to={"/contact"}  className="flex flex-col items-center gap-1">
                    <p>CONTACT</p>
                    <hr className='w-2/4 bg-gray-600 h-[1.5px] border-none hidden'/>
                </NavLink>
            </div>
            <div className='flex items-center gap-5'>
                <img src={assets.search_icon} alt="" className='w-5 cursor-pointer' onClick={() => setShowSearchBar(!showSearchBar)}/>
                <div className='group relative py-1' onClick={() =>{localStorage.getItem('token') ? "" : navigate('/login')} }>
                    <img src={assets.profile_icon} alt="" className='w-5 cursor-pointer'/>
                    {/* DROPDOWN */}
                    {localStorage.getItem('token') && 
                        <div className='group-hover:block dropdown-menu hidden absolute top-8 right-0 rounded'>
                            <div className='flex flex-col gap-2 w-36 px-3 py-3 bg-slate-100 text-gray-500 text-lg'>
                                <p className='cursor-pointer hover:text-black'>My Profile</p>
                                <p className='cursor-pointer  hover:text-black' onClick={() =>{ navigate('/orders')}}>Orders</p>
                                <p className='cursor-pointer hover:text-black' onClick={() =>{ setToken(""); navigate('/login')}}>Logout</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to={"/cart"} className='relative'>
                    <img src={assets.cart_icon} alt="" className='w-5 min-w-5'/>
                    <p className='absolute right-[-5px] bottom-[-5px] bg-black text-white w-4 text-center leading-4 aspect-square rounded-full text-[10px]'>{ cartItems.length }</p>
                </Link>
                {/* Sidebar menu for small size*/}
                <img src={assets.menu_icon} alt="" onClick={()=>setSidebar(true)} className='w-5 cursor-pointer sm:hidden'/>
            </div>
            <div className={`absolute z-50 top-0 right-0 bottom-0 bg-white transition-all overflow-hidden ${sidebar ? "w-full" : "w-0"}`}>
                <div className='flex flex-col'>
                    <div className='flex items-center gap-2 p-3 text-gray-600' onClick={() => setSidebar(false)}>
                        <img src={assets.dropdown_icon} alt="" className='w-3 rotate-180 cursor-pointer '/>
                        <p className='cursor-pointer'>Back</p>
                    </div>
                    <NavLink className={"flex items-center gap-2 border py-3 pl-8 font-medium hover:bg-gray-200 transition"} onClick={() => setSidebar(false)} to={"/"}><IoHomeOutline  className='size-4 '/>HOME</NavLink>
                    <NavLink className={"flex items-center gap-2 border py-3 pl-8 font-medium hover:bg-gray-200 transition"} onClick={() => setSidebar(false)} to={"/collection"}><BsCollection className='size-4'/>COLLECTIONS</NavLink>
                    <NavLink className={"flex items-center gap-2 border py-3 pl-8 font-medium hover:bg-gray-200 transition"} onClick={() => setSidebar(false)} to={"/orders"}><BsBoxSeam className='size-4'/>ORDERS</NavLink>
                    <NavLink className={"flex items-center gap-2 border py-3 pl-8 font-medium hover:bg-gray-200 transition"} onClick={() => setSidebar(false)} to={"/about"}><BsInfoSquare className='size-4 text-black'/>ABOUT</NavLink>
                    <NavLink className={"flex items-center gap-2 border py-3 pl-8 font-medium hover:bg-gray-200 transition"} onClick={() => setSidebar(false)} to={"/contact"}><LuContact className='size-4'/>CONTACT</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar
