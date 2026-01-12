import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { baseurl, ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProduct from '../components/RelatedProduct.jsx';

const Product = () => {
  let [productData, setProductData] = useState();
  let [mainImage, setMainImage] = useState();
  let [size,setSize] = useState("");
  // console.log("sizze",size);
  
  let { productId } = useParams();
  let { products, currency, setCartItems, cartItems, addToCart, token, navigate, fetchCartData, handleAddToCart  } = useContext(ShopContext);


  let fetchProduct = () => {
    const foundProduct=products.find((item) =>  item._id === productId )
    if(foundProduct) {
      setProductData(foundProduct);
      setMainImage(foundProduct.image[0]);
    }
  }

  useEffect(() => {
    fetchProduct();
    window.scrollTo({ top: 0, behavior: "smooth" });
  },[products,productId]);


  // ProductData Example

  // {
  //   _id: "aaaab",
  //   name: "Men Round Neck Pure Cotton T-shirt",
  //   description: "A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.",
  //   price: 200,
  //   image: [p_img2_1,p_img2_2,p_img2_3,p_img2_4],
  //   category: "Men",
  //   subCategory: "Topwear",
  //   sizes: ["M", "L", "XL"],
  //   date: 1716621345448,
  //   bestseller: false,
  // }


  const _images = Array.isArray(productData?.image) ? productData.image : [];
  const _sizes = Array.isArray(productData?.sizes) ? productData.sizes : [];

  return productData ?  (
    <div className='border-t pt-8'>
      {/* Product Data */}
      <div className='flex flex-col sm:flex-row gap-9'>
        {/* Product images part*/}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
          <div className='sm:w-[17%] px-1 w-full flex sm:flex-col justify-between sm:justify-normal overflow-x-auto sm:overflow-y-scroll py-1 gap-3 sm:gap-0'>
            {
              _images.map((item,idx) => (
                <img 
                  src={item} 
                  key={idx} 
                  className={`sm:w-full w-[20%] mb-4 object-cover cursor-pointer rounded-md border transition-all ${item === mainImage ? 'scale-105 border-black' : ''}`}
                  onClick={() => setMainImage(item)}
                  alt="" 
                />
                
              ))
            }
          </div>
          <div className='sm:w-[80%] w-full'>
            <img src={mainImage} alt="" className='w-full rounded-md'/>
          </div>
        </div>
        {/* Product Info part */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl pt-3'>{productData.name}</h1>
          <div className='flex gap-3 pt-2 items-center'>
            <img src={assets.star_icon} className='w-3' alt="" />
            <img src={assets.star_icon} className='w-3' alt="" />
            <img src={assets.star_icon} className='w-3' alt="" />
            <img src={assets.star_icon} className='w-3' alt="" />
            <img src={assets.star_dull_icon} className='w-3' alt="" />
            <p>(123)</p>  
          </div>
          <p className='text-3xl font-medium pt-4'>{currency}{productData.price.toLocaleString('en-IN')}</p>
          <div>
            <p className='pt-6 text-gray-500'>{productData.description}</p>
          </div>
          <div className='mt-10'>
            <h1 className='text-lg font-medium'>Select Size</h1>
            <div className='pt-4'>
              {
                _sizes.map((item,idx) => (
                  <button className={`px-4 py-1 bg-gray-100 mr-2 rounded border ${size === item ? 'border-black bg-gray-200' : ""}`} onClick={() => setSize(item)} key={idx}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className='bg-black text-white px-4 py-3 mt-10 rounded-md active:bg-gray-800' onClick = { () => handleAddToCart(productData,size,setSize) }>ADD TO CART</button>
          <hr className='my-10'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is availble on this product.</p>
            <p>Easy return add and exchange policy within 7 days.</p>
          </div>
        </div> 
      </div>
      {/* ----------------description & review section-------------- */}
      <div className='border-t my-5'>
        <div className='flex pt-4'>
          <b className='px-5 border py-2 text-sm'>Description</b>
          <p className='px-5 border py-2 text-sm'>Review</p>
        </div>
        <div className='border flex flex-col gap-4 p-6 text-sm text-gray-500'>
          <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero illo corrupti placeat adipisci obcaecati deleniti doloribus optio. Dignissimos hic et quos explicabo modi veritatis aliquid dolor numquam vitae. Officia, nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti eius pariatur perspiciatis maiores explicabo hic quod itaque soluta, modi sunt qui at quae. Consequatur nesciunt adipisci eum obcaecati incidunt molestiae!</p>

          <p >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos earum beatae iure fugit labore, voluptate amet quos mollitia blanditiis quis totam laborum explicabo voluptatibus architecto enim veritatis laboriosam ad rerum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, perferendis!</p>
        </div>
      </div>
      <RelatedProduct id={ productData._id } category={ productData.category } subCategory={ productData.subCategory}/>
    </div>
  ) : <div></div>
    
}

export default Product