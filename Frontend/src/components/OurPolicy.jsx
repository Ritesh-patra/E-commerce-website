import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

export default function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around items-center py-20 text-center gap-y-16'>
      <div className='flex flex-col items-center gap-1'>
        <img src={assets.exchange_icon} alt="" className='w-16 sm:w-16'/>
        <p className='text-xs sm:text-sm text-black font-medium'>Easy Exchange Policy</p>
        <p className='text-xs sm:text-sm text-gray-700'>We offer hassle free exchange policy</p>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <img src={assets.quality_icon} alt="" className='w-16 sm:w-16'/>
        <p className='text-xs sm:text-sm text-black font-medium'>7 Days Return Policy</p>
        <p className='text-xs sm:text-sm text-gray-700'>We provide 7 days free return policy</p>
      </div>
      <div className='flex flex-col items-center gap-1'>
        <img src={assets.support_img} alt="" className='w-14 sm:w-16'/>
        <p className='text-xs sm:text-sm text-black font-medium'>Best customer support</p>
        <p className='text-xs sm:text-sm text-gray-700'>we provide 24/7 customer support</p>
      </div>
    </div>
  )
}
