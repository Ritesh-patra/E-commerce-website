import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Order from "./pages/Order.jsx";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const baseUrl = import.meta.env.VITE_SERVER_URL;
export const currency = '₹'; 



function App() {
  let [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");


  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("token",token);
  },[token]);

  return (
    <>
      {token ? (
        <div className="min-h-screen flex flex-col">
          <Navbar setToken={setToken}/>

          <div className="flex flex-1">
            {/* Sidebar full height */}
            <Sidebar />

            {/* Page content area */}
            <div className="flex-1 px-2 sm:px-8 sm:py-4 bg-slate-50">
              <Routes>
                <Route path="/" element = {<Navigate to='/list' />} />
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/order" element={<Order token={token}/>} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login setToken={setToken}/>
      )}
    </>
  );
}

export default App;
