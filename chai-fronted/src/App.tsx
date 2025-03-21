import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Admin pages
import Dashboard from "./pages/admin/Dashboard";
import Orders from "./pages/admin/Orders";
// import AdminProducts from "./pages/admin/admin-products.ts";
import Users from "./pages/admin/Users";
// If you have a sidebar
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import UserDashboard from "./pages/userDashboard";
import { AllProductsU } from "./pages/Products";
import { AdminAllProducts } from "./pages/admin/products/allpro";
import LandingPage from "./pages/LandingPage";
import { AddProduct } from "./pages/admin/products/add";
import Navbar, { Navbar2 } from "./components/Navbar";

function Layout() {
  const location = useLocation(); // ✅ Get current route

  // ✅ Define user routes
  const userRoutes = ["/user/dashboard", "/all-product", "/"];

  return (
    <>
      {/* ✅ Show Navbar2 only for user pages */}
      {userRoutes.includes(location.pathname) && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* User Routes */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/all-product" element={<AllProductsU />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/all-orders" element={<Orders />} />
        <Route path="/admin/products/all" element={<AdminAllProducts />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
