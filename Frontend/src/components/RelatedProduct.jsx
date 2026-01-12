import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from "../components/ProductItem.jsx"
import Title from '../components/Title.jsx'

function RelatedProduct({ id, category, subCategory}) {
    // console.log(category,subCategory);
    let { products } = useContext(ShopContext);

    let [relatedProducts,setRelatedProducts] = useState([]);
    let [showCount, setShowCount] = useState(5);
    let [visibleProducts,setVisibleProducts] = useState([]);

    useEffect(() => {
        const _products = Array.isArray(products) ? products : [];
        setRelatedProducts(_products.filter((item)=> item.category === category && item.subCategory === subCategory && item._id !== id))
    },[products]);

    useEffect(() => {
        setVisibleProducts(relatedProducts.slice(0,showCount))
    },[relatedProducts,showCount])

    const handleShowMore = () => {
        setShowCount((prev) => prev + 5)
    }

    // let relatedProducts = products.filter((item)=> item.category === category && item.subCategory === subCategory && item._id !== id);
    // console.log(relatedProducts);
  return (
    <>
        {visibleProducts.length ?
            <div className='my-24'>
                <div className='text-center text-3xl py-9'>
                    <Title text1={"RELATED"} text2={"PRODUCTS"}/>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                    { 
                            (Array.isArray(visibleProducts) && visibleProducts.length > 0) ? 
                                (
                                    visibleProducts.map((item, idx) => (
                                    <ProductItem
                                        key={item._id}
                                        id={item._id}
                                        name={item.name}
                                        image={item.image}
                                        price={item.price}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">
                                    No related products found.
                                </p>
                            )
                    }
                </div>
                {
                    relatedProducts.length > visibleProducts.length ? 
                        <div className='text-center mt-8'>
                            <button onClick={handleShowMore} className='px-6 py-2 bg-black text-white uppercase font-medium rounded hover:bg-gray-800 transition duration-200'>Show more</button>
                        </div>
                    : <div></div>
                }
            </div> : <div className="text-center py-10 text-gray-500 animate-pulse">Loading...</div>
        }
    </>
  )
}

export default RelatedProduct
