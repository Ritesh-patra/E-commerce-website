import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PlaceOrder from "./PlaceOrder";
import { assets } from "../assets/frontend_assets/assets";


const Cart = () => {
  const { cartItems, currency, increaseQty, decreaseQty, removeItem, totalPrice, updateCart,shipping_fee } = useContext(ShopContext);
  const _cartItems = Array.isArray(cartItems) ? cartItems : [];
  const navigate=useNavigate();

  
// {productId: {…}, quantity: 4, size: 'XXL', price: 2000, _id: '6912c2eb566ffdc9bf7b685d'}
// console.log(cartItems);
  return (
    <>
      {_cartItems.length > 0 ? (
        <div className="py-10">
          <div className="text-3xl">
            <Title text1={"YOUR"} text2={"CART"} />
          </div>
          <div className="flex flex-col  mt-6">
            {_cartItems.map((item, idx) => (
              <div
                key={item._id}
                className="border-t py-5  flex flex-col sm:flex-row gap-4 items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.image[0]}
                    alt={item.productId.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-medium text-lg">{item.productId.name}</h2>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="font-semibold mt-1">
                      {currency}
                      {(item.productId.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateCart(item._id, item.size,"decrease")}
                    className="bg-gray-200 px-3 py-1 rounded-md text-xl"
                  >
                    −
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateCart(item._id, item.size,"increase")}
                    className="bg-gray-200 px-3 py-1 rounded-md text-xl"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item._id,item.size)}
                    className="ml-4 text-red-600 font-medium"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/*  Total Summary */}
          <div className="border-t py-16 sm:text-right">
            <div className="inline-flex flex-col sm:w-[30%] w-full">
              <div className="text-2xl text-left my-4">
                <Title text1={'CART'} text2={'TOTALS'}/>
              </div>
              <div className="flex py-4 border-t justify-between items-center text-lg font-medium">
                <h1>SubTotal</h1>
                <h1>{currency}{totalPrice.toFixed(2)}</h1>
              </div>
              <div className="flex py-4 border-t justify-between items-center text-lg font-medium" >
                <h1>Shipping Fee</h1>
                <h1>{currency}{(shipping_fee).toFixed(2)}</h1>
              </div>
              <div className="flex py-6 border-t justify-between items-center text-lg font-medium">
                <h2 className="text-xl font-semibold"> Total </h2>
                <h2 className="text-xl font-semibold">{currency}{(totalPrice + shipping_fee).toFixed(2)}</h2>
              </div>
              <div>
                <button onClick={() => navigate('/placeorder')} className="bg-black text-white px-6 py-3 mt-8 rounded-md hover:bg-gray-800">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center  mt-5 py-6 flex flex-col items-center gap-6">
          <div>
            <img src={assets.empty_cart} alt="" className="w-60"/>
          </div>
          <div className="mt-10">
            <p className="text-5xl font-medium text-gray-800">Your Cart is <span className="text-[#FD392C]">Empty!</span></p>
            <p className="text-gray-700 text-lg mt-8">Must add items on the cart before you proceed to check out.</p>
            <button onClick={() => navigate('/collection')} className="px-16 py-3 text-lg bg-[#FD392C] text-white font-medium uppercase rounded-full mt-8 active:bg-gray-800">continue shopping</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
