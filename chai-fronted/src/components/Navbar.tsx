import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication";
import { useEffect, useState } from "react";
import { ActivityIcon } from "lucide-react";
import { AcconuntInfo } from "./AccountInfo";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ✅ Function to check active page (Default Home is active)
  const isActive = (path: string) => {
    return location.pathname === path 
      ? "bg-white text-black font-bold px-3 py-2 rounded-md" 
      : "text-white px-3 py-2 ";
  };

  return (
    <nav className={`navbar hover:scale-[1.02]  ${scrolled ? "scrolled" : ""}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* 🔹 Logo */}
        <div className="logo">
          <Link to="/" className="text-xl font-bold">☕️ Chai-Chai</Link>
        </div>

        {/* 🔹 Navigation Links (Role-Based) */}
        <ul className="nav-links flex gap-4">
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
        </ul>

        {/* 🔹 Auth Buttons */}
        <div className="auth-buttons">
          {user ? (
            <div className="flex gap-10">
              <div>
                <AcconuntInfo/>
              </div>
            <button onClick={() => { signOut(); navigate("/signin"); }} className="button1">
              Sign Out
            </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="button1">
                <Link to="/signin">Signin</Link>
              </button>
              <button className="button1">
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
