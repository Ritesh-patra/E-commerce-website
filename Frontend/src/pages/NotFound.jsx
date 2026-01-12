import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

export default function NotFound() {
    const { navigate } = useContext(ShopContext);
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
      <p className="text-lg mt-2 text-gray-500">The page you are looking for does not exist.</p>
      <button onClick={() => navigate('/')} className="px-6 py-2 bg-blue-500 text-white rounded-full mt-4 text-lg   prata-regular">Go To Home</button>
    </div>
  );
}
