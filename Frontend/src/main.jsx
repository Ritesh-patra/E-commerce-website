import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import ShopContextProvider from './context/ShopContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>,
    <ToastContainer
      position="top-right" // ya "bottom-right", "top-left" etc.
      autoClose={2000}      // milliseconds
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
  </>
)
