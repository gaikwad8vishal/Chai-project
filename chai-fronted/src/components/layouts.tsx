import Dashboard from "../pages/admin/Dashboard";
import AdminOrders from "../pages/admin/Orders";
import { AddProduct } from "../pages/admin/products/add";
import { AdminAllProducts } from "../pages/admin/products/allpro";
import { AllProductsU } from "../pages/Products";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import UserDashboard from "../pages/userDashboard";
import { Users } from "lucide-react";
import { JSX, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { LocalBlog } from "./LocalBlog";
import { LocalShowcase } from "./LocalShowcase";
import { LandingPageHome } from "./LangingHome";
import Footer from "./Footer";
import PremiumPage from "./Primium";
import ProtectedAdminRoute from "./ProtectedAdminRoute";




function Layout() {
  const location = useLocation();

  useEffect(() => {
    const backgroundGradients: Record<string, string> = {
      "/": "linear-gradient(to bottom,rgb(61, 93, 99),rgb(58, 183, 199))",
      "/admin/dashboard": "linear-gradient(to bottom, #232526, #414345)", 
      "/admin/all-orders": "linear-gradient(to bottom,rgb(110, 132, 154),rgb(132, 114, 84))",
      "/admin/products/all": "linear-gradient(to bottom, #6a11cb, #2575fc)", 
      "/admin/products/add": "linear-gradient(to bottom, #ff758c, #ff7eb3)", 
      "/admin/users": "linear-gradient(to bottom, #ff9966, #ff5e62)", 
      "/user/dashboard": "linear-gradient(to bottom,rgb(110, 99, 72), #f8b500)", 
      "/all-product": "linear-gradient(to bottom,rgb(61, 93, 99),rgb(58, 183, 199))", 
      "/blog": "linear-gradient(to bottom,rgb(61, 93, 99),rgb(58, 183, 199))",
      "/showcase": "linear-gradient(to bottom,rgb(61, 93, 99),rgb(58, 183, 199))",
      "/subscription": "linear-gradient(to bottom,rgb(61, 93, 99),rgb(58, 183, 199))"
    };
    
    document.body.style.background =
      backgroundGradients[location.pathname] ||
      "linear-gradient(to right, #2c3e50, #4ca1af)"; 

    return () => {
      document.body.style.background = ""; 
    };
  }, [location.pathname]);

  const adminRoutes = ["/admin/dashboard", "/admin/all-orders", "/admin/products/all", "/admin/products/add", "/admin/users"];

  return (
    <div className="min-h-screen w-full flex flex-col justify-between">
      {/* ✅ Show Navbar only for user routes */}
      {!adminRoutes.includes(location.pathname) && <Navbar />}  

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPageHome />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/blog" element={<LocalBlog />} />
          <Route path="/showcase" element={<LocalShowcase />} />
          <Route path="/subscription" element={<PremiumPage />} />

          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/all-product" element={<AllProductsU />} />

          <Route
                path="/admin/dashboard"
                element={
                  <ProtectedAdminRoute>
                    <Dashboard />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/all-orders"
                element={
                  <ProtectedAdminRoute>
                    <AdminOrders />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/products/all"
                element={
                  <ProtectedAdminRoute>
                    <AdminAllProducts />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/products/add"
                element={
                  <ProtectedAdminRoute>
                    <AddProduct />
                  </ProtectedAdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedAdminRoute>
                    <Users />
                  </ProtectedAdminRoute>
                }
              />
          </Routes>
      </div>

      {/*  Footer will always be rendered */}
      <Footer />
    </div>
  );
}

export default Layout;

