import React from 'react'
import { Routes,Route } from "react-router-dom"
import Home from './pages/Home'
import Cart from './pages/Cart'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import About from './pages/About'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import Register from './pages/Register'
import TrackOrder from './pages/TrackOrder'
import NotFound from './pages/NotFound'
import Verify from './pages/Verify'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/cart' element={ <Cart /> } />
        <Route path='/collection' element={ <Collection />} /> 
        <Route path='/contact' element={ <Contact /> } />
        <Route path='/login' element={ <Login /> } />
        <Route path='/orders' element={ <Orders /> } />
        <Route path='/placeorder' element={ <PlaceOrder /> } />
        <Route path='/product/:productId' element={ <Product /> } />
        <Route path='/about' element={ <About /> } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/trackorder/:orderId/:productId/:size' element={<TrackOrder />} />
        <Route path='/verify' element={ <Verify /> } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
