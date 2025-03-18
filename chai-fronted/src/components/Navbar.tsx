import { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import TeaCategoryDropdown from "./TeaCategoryDropdown";
import LocationDisplay from "./LocationDetector";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  let timeoutId: NodeJS.Timeout;

  const handleMouseEnter = () => {
    clearTimeout(timeoutId); // Agar pehle se band hone wala ho toh rok do
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutId = setTimeout(() => {
      setShowDropdown(false);
    }, 200); // 2 sec tak dikhai de
  };


  

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* 🔹 Logo */}
      <Link to="/" className="text-2xl font-bold">☕️ Chai-Chai</Link>

      {/* Location */}
      <LocationDisplay  />
      <div className="flex items-center ">
      {/* 🔹 Tea Options Section */}
        <div>
          <TeaCategoryDropdown />
        </div>
      {/* 🔹 Search Bar */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search tea..."
          className="w-72 py-2  p-2 rounded-r-md bg-gray-800 text-white"
        />
      </div>
    </div>
      {/* 🔹 Icons Section */}
      <div className="flex items-center gap-6 mr-4">
      {/* 🔸 User Dropdown */}
      <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FaUser size={24} className="cursor-pointer" />

          {/* 🔽 Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow-lg rounded-lg">
              <Link to="/signin" className="block px-4 py-2 hover:bg-gray-200">
                Sign In
              </Link>
              <Link to="/register" className="block px-4 py-2 hover:bg-gray-200">
                Register
              </Link>
            </div>
          )}
        </div>
      <div className="flex items-center gap-6">
        {/* 🔸 Cart */}
        <Link to="/cart" className="relative">
          <FaShoppingCart size={24} />
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
            3 {/* Replace with dynamic count */}
          </span>
        </Link>

        
      </div>
      </div>
    </nav>
  );
};

export default Navbar;

