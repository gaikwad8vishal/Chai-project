import Dashboard from "../pages/admin/Dashboard";
import AdminOrders from "../pages/admin/Orders";
import { AddProduct } from "../pages/admin/products/add";
import { AdminAllProducts } from "../pages/admin/products/allpro";
import LandingPage from "../pages/LandingPage";
import { AllProductsU } from "../pages/Products";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import UserDashboard from "../pages/userDashboard";
import { Users } from "lucide-react";
import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";



function Layout() {
  const location = useLocation();

  // ✅ Background gradients based on routes
  useEffect(() => {
    const backgroundGradients: Record<string, string> = {
      "/": "linear-gradient(to bottom,rgb(61, 93, 99),rgb(58, 183, 199))", // Peach to pink
      "/admin/dashboard": "linear-gradient(to bottom, #232526, #414345)", // Dark steel
      "/admin/all-orders": "linear-gradient(to bottom,rgb(110, 132, 154),rgb(132, 114, 84))", // Blue teal
      "/admin/products/all": "linear-gradient(to bottom, #6a11cb, #2575fc)", // Purple blue
      "/admin/products/add": "linear-gradient(to bottom, #ff758c, #ff7eb3)", // Pinkish
      "/admin/users": "linear-gradient(to bottom, #ff9966, #ff5e62)", // Orange red
      "/user/dashboard": "linear-gradient(to bottom,rgb(110, 99, 72), #f8b500)", // Yellow sunrise
      "/all-product": "linear-gradient(to bottom,rgb(177, 112, 66),rgb(136, 81, 56))", // Sky blue
      "/signin": "linear-gradient(to bottom, #ff7e5f, #feb47b)", // Coral
      "/signup": "linear-gradient(to bottom, #56ab2f, #a8e063)", // Green meadow
    };

    document.body.style.background = backgroundGradients[location.pathname] || "linear-gradient(to right, #ffffff, #dddddd)";

    return () => {
      document.body.style.background = ""; // Cleanup
    };
  }, [location.pathname]);

  const userRoutes = ["/user/dashboard", "/all-product", "/"];

  return (
    <div className="min-h-screen w-full">
      {/* ✅ Show Navbar only for user pages */}
      {userRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      
        <Route path="/user/dashboard" element={<UserDashboard/>} />
        <Route path="/all-product" element={<AllProductsU />} />


        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/all-orders" element={<AdminOrders />} />
        <Route path="/admin/products/all" element={<AdminAllProducts />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </div>
  );
}


export default Layout;