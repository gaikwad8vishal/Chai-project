
import { useNavigate } from "react-router-dom";
import LocationDisplay from "./LocationDetector";
import UserLocation from "./LocationDetector";
import { clsx } from "clsx"; 



export const Navbar1 = () => {

  return (
    <div className="navbar">
      <div className="logo">
        <a className="" href="/">☕️ Chai-Chai</a>
      </div>
      <div>
        <UserLocation/>
      </div>
      
      <div className="nav-links absoulte">
        <a href="/" className="active">Home</a>
        <a href="/all-product">Shop</a>
        <a href="/blog">Blog</a>
        <a href="/showcase">Showcase</a>
      </div>
  
      <div className="auth-buttons">
        <button className="button1">
          <a href="/signin">Sign In</a>
        </button>
        <button className="button1">
          <a href="/signup">Sign Up</a>
        </button>
      </div>
    </div>
  );
};








export const AdminNavbar = () => {

  const navigate = useNavigate();
  
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/signin");
      }, 2000); 
    };
  
  
    return (
  
      <div className="navbar">
        <div className="logo">
          <a className="" href="/">Admin </a>
        </div>
        
        <div className="nav-links ">
          <a href="/" className="active">Home</a>
          <a href="/blog">Blog</a>
          <a href="/showcase">Showcase</a>
        </div>
    
        <div className="auth-buttons">
          <button className="button1">
            <a href="/signin" onClick={handleLogout}>Sign out</a>
          </button>
        </div>
      </div>
    );
  };
  

// import { useLocation } from "react-router-dom";

// const Navbar = () => {
//   const location = useLocation(); // ✅ Get current path

//   // ✅ Define background colors for each page
//   const backgroundColors: { [key: string]: string } = {
//     "/": "bg-[#c4a27a]", // Landing Page
//     "/signin": "bg-[#d1dbc2]", // Sign-in Page
//     "/signup": "bg-[#d1dbc2]", // Sign-up Page
//     "/user/dashboard": "bg-gradient-to-b from-blue-500 to-yellow-400", // User Dashboard
//     "/all-product": "bg-gradient-to-b from-blue-500 to-yellow-400", // Products Page
//     "/admin/dashboard": "bg-gradient-to-b from-gray-600 to-gray-400", // Admin Dashboard
//     "/admin/all-orders": "bg-gradient-to-b from-gray-600 to-gray-400", // Admin Orders
//     "/admin/products/all": "bg-gradient-to-b from-gray-600 to-gray-400", // Admin Products
//   };

//   // ✅ Get background class based on current route
//   const navbarBackground = backgroundColors[location.pathname] || ""; // Default to white

//   return (
//     <nav className={` navbar ${navbarBackground}`}>
//       <div className="container mx-auto flex justify-between items-center">
//       <div className="logo">
//         <a className="" href="/">☕️ Chai-Chai</a>
//       </div>
//         <ul className="flex nav-links gap-4">
//           <li><a href="/" className="text-white">Home</a></li>
//           <li><a href="/all-product" className="text-white">Products</a></li>
//           <li><a href="/blog">Blog</a></li>
//           <li><a href="/showcase">Showcase</a></li>
//         </ul>
//         <div className="auth-buttons">
//         <button className="button1">
//           <a href="/signin">Sign In</a>
//         </button>
//         <button className="button1">
//           <a href="/signup">Sign Up</a>
//         </button>
//       </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Import useAuth

const Navbar = () => {
  const location = useLocation(); // ✅ Get current path
  const { user, signOut } = useAuth(); // Get user & signOut function
  return (
    <nav className={clsx(
      "navbar text-white p-4 fixed w-full z-50",
      location.pathname === "/" && "bg-[#c4a27a]",
      location.pathname === "/signin" && "bg-[#d1dbc2]",
      location.pathname === "/signup" && "bg-[#d1dbc2]",
      location.pathname === "/user/dashboard" && "bg-gradient-to-b from-blue-500 to-yellow-400",
      location.pathname === "/all-product" && "bg-gradient-to-b from-blue-500 to-yellow-400",
      location.pathname === "/admin/dashboard" && "bg-gradient-to-b from-gray-600 to-gray-400",
      location.pathname === "/admin/all-orders" && "bg-gradient-to-b from-gray-600 to-gray-400",
      location.pathname === "/admin/products/all" && "bg-gradient-to-b from-gray-600 to-gray-400"
    )}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          <a href="/">☕️ Chai-Chai</a>
        </div>
        <ul className="flex nav-links gap-4">
          <li><a href="/" className="text-white">Home</a></li>
          <li><a href="/all-product" className="text-white">Products</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/showcase">Showcase</a></li>
        </ul>
        <div className="auth-buttons">
        {user ? (
          // Show "Sign Out" when user is logged in
          <button onClick={signOut} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
            Sign Out
          </button>
        ) : (
          // Show "Sign In" & "Sign Up" when user is not logged in
          <>
            <Link to="/signin" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
              Sign In
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">
              Sign Up
            </Link>
          </>
        )}
      </div>
      </div>
    </nav>
  );
};

export default Navbar;



import {  Link } from "react-router-dom";






export const Navbar2 = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin"); // ✅ Immediate redirect
  };

  return (
    <div className="navbar z-10 flex">
      <div className="flex items-center gap-4">
        <div className="logo  text-lg font-bold">
          <Link to="/">☕️ Chai-Chai</Link>
        </div>
        <div className="">
          <UserLocation/>
        </div>
      </div>
      <div className="nav-links flex space-x-3">
        <Link to="/" className="hover:text-yellow-300">Home</Link>
        <Link to="/all-product" className="hover:text-yellow-300">Shop</Link>
        <Link to="/blog" className="hover:text-yellow-300">Blog</Link>
        <Link to="/showcase" className="hover:text-yellow-300">Showcase</Link>
      </div>

      <div className="auth-buttons">
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700">
          Sign out
        </button>
      </div>
    </div>
  );
};
