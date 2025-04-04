import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AcconuntInfo } from "./AccountInfo";
import UserLocation from "./LocationDetector";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path 
      ? "bg-white text-black font-bold px-3 py-2 rounded-md" 
      : "text-white px-3 py-2 ";
  };

  return (<div className=" flex justify-center mt-6  " >
    <nav className={`navbar w-full hover:scale-[1.02] ${scrolled ? "scrolled" : ""}`}>
      <div className="container  flex justify-between items-center p-4">
        {/* 🔹 Logo */}
        <div className="flex gap-3">
        <div className="logo">
          <Link to="/" className="text-xl font-bold">☕️ Chai-Chai</Link>
        </div>
        <div>
        </div>
        {user?.role === "DELIVERY_PERSON" && (
           <div>
           <UserLocation/>
         </div>
        )}
        {user?.role === "USER" && (
          <div>
            <UserLocation/>
          </div>
        )}
        {!user  && (
          <div>
            <UserLocation/>
          </div>
        )}
        </div>

        {/* 🔹 Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 🔹 Desktop Navigation - (Hidden in Mobile) */}
        <ul className={`hidden md:flex  gap-4`}>
          {!user && (
            <>
              <li><Link to="/" className={isActive("/")}>Home</Link></li>
              <li><Link to="/all-product" className={isActive("/all-product")}>Products</Link></li>
              <li><Link to="/blog" className={isActive("/blog")}>Blog</Link></li>
              <li><Link to="/showcase" className={isActive("/showcase")}>Showcase</Link></li>
            </>
          )}
          {user?.role === "ADMIN" && (
            <>
              <li><Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>Dashboard</Link></li>
              <li><Link to="/admin/orders" className={isActive("/admin/orders")}>Manage Orders</Link></li>
              <li><Link to="/admin/products" className={isActive("/admin/products")}>Manage Products</Link></li>
            </>
          )}
          {user?.role === "USER" && (
            <>
              <li>
                <Link to={user ? "/user/dashboard" : "/"} className={isActive(user ? "/user/dashboard" : "/")}>
                  Home
                </Link>
              </li>
              <li>
                <Link to={user ? "/all-product" : "/all-product"} className={isActive(user ? "/user/all-product" : "/all-product")}>
                  Products
                </Link>
              </li>
              <li>
                <Link to={user ? "/blog" : "/blog"} className={isActive(user ? "/blog" : "/blog")}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to={user ? "/showcase" : "/showcase"} className={isActive(user ? "/showcase" : "/showcase")}>
                  Showcase
                </Link>
              </li>
            </>
          )}
          {user?.role === "DELIVERY_PERSON" && (
            <>
              <li><Link to="/delivery/orders" className={isActive("/delivery/orders")}>Assigned Orders</Link></li>
            </>
          )}
        </ul>

        {/* 🔹 Mobile Navigation - (Visible Only in Mobile) */}
        {menuOpen && (
          <ul className="absolute top-full left-0 w-full bg-black text-white flex flex-col gap-4 p-5 transition-all duration-300 md:hidden">
            {!user && (
              <>
                <li><Link to="/" className={isActive("/")}>Home</Link></li>
                <li><Link to="/all-product" className={isActive("/all-product")}>Products</Link></li>
                <li><Link to="/blog" className={isActive("/blog")}>Blog</Link></li>
                <li><Link to="/showcase" className={isActive("/showcase")}>Showcase</Link></li>
              </>
            )}

            {user?.role === "ADMIN" && (
              <>
                <li><Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>Dashboard</Link></li>
                <li><Link to="/admin/orders" className={isActive("/admin/orders")}>Manage Orders</Link></li>
                <li><Link to="/admin/products" className={isActive("/admin/products")}>Manage Products</Link></li>
              </>
            )}
            {user?.role === "USER" && (
              <>
                <li><Link to="/" className={isActive("/")}>Home</Link></li>
                <li><Link to="/all-product" className={isActive("/all-product")}>Products</Link></li>
                <li><Link to="/blog" className={isActive("/blog")}>Blog</Link></li>
                <li><Link to="/showcase" className={isActive("/showcase")}>Showcase</Link></li>
              </>
            )}

            {user?.role === "DELIVERY_PERSON" && (
              <>
                <li><Link to="/delivery/orders" className={isActive("/delivery/orders")}>Assigned Orders</Link></li>
              </>
            )}

            {/* 🔹 Mobile Auth Buttons */}
            <div className="auth-buttons flex flex-col gap-2 mt-4">
              {user ? (
                <>
                  <AcconuntInfo />
                  <button 
                    onClick={() => { signOut(); navigate("/signin"); }} 
                    className="button1 w-full"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button className="button1 w-full">
                    <Link to="/signin">Signin</Link>
                  </button>
                  <button className="button1 w-full">
                    <Link to="/signup">Sign Up</Link>
                  </button>
                </>
              )}
            </div>
          </ul>
        )}

        {/* 🔹 Desktop Auth Buttons (Hidden in Mobile) */}
        <div className="auth-buttons hidden md:flex">
          {user ? (
            <div className="flex gap-10">
              <AcconuntInfo />
              <button 
                onClick={() => { signOut(); navigate("/"); }} 
                className="button1"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <button className="button1">
                <Link to="/signin">Signin</Link>
              </button>
              <button className="button1">
                <Link to="/signup">Sign Up</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;
