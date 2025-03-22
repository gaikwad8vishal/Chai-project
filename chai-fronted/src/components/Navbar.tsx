import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, signOut } = useAuth(); // ✅ AuthContext se user & signOut lo
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar sticky  transition-all duration-300  z-50 ] ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* 🔹 Logo */}
        <div className="logo">
          <Link to="">☕️ Chai-Chai</Link>
        </div>

        {/* 🔹 Navigation Links (Role-Based) */}
        <ul className="nav-links gap-4">
        {!user && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/all-product">Products</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/showcase">Showcase</Link></li>
            </>
          )}
          {user?.role === "ADMIN" && (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/orders">Manage Orders</Link></li>
              <li><Link to="/admin/products">Manage Products</Link></li>
            </>
          )}

          {user?.role === "USER" && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/all-product">Products</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/showcase">Showcase</Link></li>
            </>
          )}

          {user?.role === "DELIVERY_PERSON" && (
            <>
              <li><Link to="/delivery/orders">Assigned Orders</Link></li>
            </>
          )}
        </ul>

        {/* 🔹 Auth Buttons */}
        <div className="auth-buttons">
          {user ? (
            <button onClick={() => { signOut(); navigate("/signin"); }} className="button1">
              Sign Out
            </button>
          ) : (
            <div className="auth-buttons">
              <button className="button1">
                <a href="/signin">Signin</a>
              </button>
              <button className="button1">
                <a href="/signup">Sign Up</a>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
