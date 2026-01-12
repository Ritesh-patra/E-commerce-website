import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import SkeletonCard from "../components/SkeletonCard";

const Collection = () => {
  const { products, showSearchBar, searchQuerry, loading } =useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortFilter, setSortFilter] = useState("");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((item) => item != e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item != e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // useEffect(() => {
  //   let filterd=products;
  //   console.log("filterered");
  //   if(category.length > 0){
  //     filterd=filterd.filter((item) => category.includes(item.category));
  //   }

  //   if(subCategory.length > 0){
  //     filterd=filterd.filter((item) => subCategory.includes(item.subCategory));
  //   }

  //   if(sortFilter) {
  //     if(sortFilter === 'low-high'){
  //       filterd=[...filterd].sort((a,b) => a.price - b.price);
  //     } else if(sortFilter === 'high-low') {
  //       filterd=[...filterd].sort((a,b) => b.price - a.price);
  //     } else {
  //       console.log("relavent");
  //     }
  //   }

  //   setFilterProducts(filterd);
  // },[category, subCategory,sortFilter])

  // ensure products is an array before using array methods
  const _productsArray = Array.isArray(products) ? products : [];

  function applyFilter() {
    let productCopy = _productsArray.slice();

    if (searchQuerry && showSearchBar) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(searchQuerry.toLowerCase())
      );
    }

    // console.log("applyFilter");
    if (category.length > 0) {
      productCopy = productCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    if (sortFilter) {
      if (sortFilter === "low-high") {
        productCopy = [...productCopy].sort((a, b) => a.price - b.price);
      } else if (sortFilter === "high-low") {
        productCopy = [...productCopy].sort((a, b) => b.price - a.price);
      }
    }

    setFilterProducts(productCopy);
  }

  useEffect(() => {
    // console.log('nnbvnvcg');
    applyFilter();
  }, [category, subCategory, sortFilter, searchQuerry, products]);

  return (
    <div
      className={`flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ${
        showSearchBar ? "" : "border-t"
      }`}
    >
      {/* Filter Option  */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                id="Men"
                value={"Men"}
                onChange={toggleCategory}
              />
              <label htmlFor="Men">Men</label>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                id="Women"
                value={"Women"}
                onChange={toggleCategory}
              />
              <label htmlFor="Women">Women</label>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                id="Kids"
                value={"Kids"}
                onChange={toggleCategory}
              />
              <label htmlFor="Kids">Kids</label>
            </p>
          </div>
        </div>

        {/* subCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                id="Topwear"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              <label htmlFor="Topwear">Topwear</label>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                id="Bottomwear"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              <label htmlFor="Bottomwear">Bottomwear</label>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                id="Winterwear"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              <label htmlFor="Winterwear">Winterwear</label>
            </p>
          </div>
        </div>
      </div>

      {/* RighSidet */}
      <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
              <Title text1={"ALL"} text2={"COLLECTION"} />
              {/* Product Sort */}
              <select
                className="border-2 border-gray-300 text-sm px-2"
                onChange={(e) => setSortFilter(e.target.value)}
                name=""
                id=""
              >
                <option value="relavent">Sort by: Relavent</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {/* Map Products */}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                {[...Array(20)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                {(Array.isArray(filterProducts) ? filterProducts : []).map((item, idx) => (
                  <ProductItem
                    key={idx}
                    image={item.image}
                    name={item.name}
                    price={item.price}
                    id={item._id}
                  />
                ))}
              </div>
            )}
      </div>
    </div>
  );
};

export default Collection;
