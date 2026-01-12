import React from 'react'
import { assets } from "../assets/admin_assets/assets.js"

function Navbar({ setToken }) {
  return (
    <div className='flex items-center justify-between py-2 border-b sm:px-5 px-2'>
      <img src={assets.admin_logo} alt=""  className='sm:w-40 w-28'/>
      <button onClick={ () => setToken('') } className='sm:px-6 px-4 py-2 bg-black text-white text-sm sm:text-base rounded-full'>Log Out</button>
    </div>
  )
}

export default Navbar 
