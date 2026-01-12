import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { useNavigate } from 'react-router-dom';

function CartTotal() {
  let { totalPrice,currency,shipping_fee } = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <div className='w-full py-4 flex flex-col gap-4 pt-24'>
      <div className='text-3xl border-b py-2'>
        <Title text1={'CART'} text2={'TOTAL'}/>
      </div>
      <div className='flex justify-between font-medium text-lg'>
        <h1>Sub Total</h1>
        <h1>{currency}{(totalPrice).toFixed(2)}</h1>
      </div>
      <hr />
      <div className='flex justify-between font-medium text-lg'>
        <h1>Shipping Fee</h1>
        <h1>{currency}{totalPrice ? shipping_fee.toFixed(2) : "0.00"}</h1>
      </div>
      <hr />
      <div className='flex justify-between text-2xl'>
        <b>Total</b>
        <h1 className='font-semibold'>{currency}{(totalPrice + (totalPrice > 0 ? shipping_fee : 0)).toFixed(2)}</h1>
      </div>
    </div>
  )
}

export default CartTotal
