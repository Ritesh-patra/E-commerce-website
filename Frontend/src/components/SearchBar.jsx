import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

function SearchBar() {
    let { showSearchBar, setShowSearchBar, setSearchQuerry, searchQuerry } = useContext(ShopContext);

    let location= useLocation();

    let isCollectionPage = location.pathname.includes('collection');

  return showSearchBar && isCollectionPage ?  (
    <div className="text-center">
        <div className="bg-gray-100 inline-flex items-center justify-center border-2 border-gray-600 sm:w-[40%] w-3/4 py-2 px-5 rounded-full my-4 mx-4">
            <input type="text" className="flex-1 outline-none text-gray-800 bg-inherit font-medium" onChange={ (e) => setSearchQuerry(e.target.value)} placeholder="Search" value={ searchQuerry }/>
            <img src={assets.search_icon} alt="" className="w-5" />
        </div>
        <img onClick={ () => setShowSearchBar(false)} src={assets.cross_icon} alt=""  className="inline-block w-4 cursor-pointer"/>
    </div>
  ) : ""
}


// w-[40%] outline-none border-2 border-gray-900 rounded-full h-11 px-4 text-lg

export default SearchBar
