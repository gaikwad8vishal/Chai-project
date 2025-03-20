
import { useNavigate } from "react-router-dom";
import LocationDisplay from "./LocationDetector";



export const Navbar1 = () => {

  return (
    <div className="navbar">
      <div className="logo">
        <a className="" href="/">☕️ Chai-Chai</a>
      </div>
      <div>
        <LocationDisplay/>
      </div>
      
      <div className="nav-links absoulte">
        <a href="/" className="active">Home</a>
        <a href="/product">Shop</a>
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




export const Navbar2 = () => {

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
        <a className="" href="/">☕️ Chai-Chai</a>
      </div>
      
      <div className="nav-links absoulte">
        <a href="/" className="active">Home</a>
        <a href="/product">Shop</a>
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




