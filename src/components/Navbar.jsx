import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Library, PlusCircle } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path 
    ? "text-yellow-500 scale-110" 
    : "text-gray-400 hover:text-white";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-md border-t border-gray-800 py-4 px-8 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        
        <Link to="/archive" className={`flex flex-col items-center transition-all ${isActive('/archive')}`}>
          <Library size={24} />
          <span className="text-xs mt-1">Archive</span>
        </Link>

        <Link to="/" className="relative -top-5">
          <div className="bg-yellow-600 p-4 rounded-full shadow-lg shadow-yellow-600/20 border-4 border-black transform transition-transform hover:scale-105">
            <Camera size={32} color="white" />
          </div>
        </Link>

        <Link to="/contribute" className={`flex flex-col items-center transition-all ${isActive('/contribute')}`}>
          <PlusCircle size={24} />
          <span className="text-xs mt-1">Add</span>
        </Link>

      </div>
    </div>
  );
};

export default Navbar;